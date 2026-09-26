
const SPREADSHEET_ID = "1IOvK3qKnMKzJA3v5qC_OJaXoJWEiwdgGFMYqbTyxghM";
const SHEET_GID = 1211808464;


/**
 * ============================================================
 * MAIN BLOG PUBLISHER
 * ============================================================
 */
function publishNextBlog() {

  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  let sheet;
  let rowNumber;
  let statusColumn;

  try {

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Find sheet by GID
    sheet = spreadsheet.getSheets().find(function(item) {
      return item.getSheetId() === SHEET_GID;
    });

    if (!sheet) {
      throw new Error("Could not find the blog sheet.");
    }

    // Get spreadsheet data
    const values = sheet.getDataRange().getValues();

    if (!values || values.length < 2) {
      console.log("No blog rows found.");
      return;
    }

    // Normalize headers
    const headers = values[0].map(function(value) {
      return String(value).trim().toLowerCase();
    });

    // Required column helper
    function column(name) {
      const index = headers.indexOf(name);

      if (index === -1) {
        throw new Error('Missing "' + name + '" column.');
      }

      return index;
    }

    // Optional column helper
    function optionalColumn(name) {
      const index = headers.indexOf(name);
      return index === -1 ? null : index;
    }

    // Required columns
    const dateColumn = column("date");
    const contentColumn = column("content");
    const titleColumn = column("title");
    const urlColumn = column("url");
    statusColumn = column("status");

    /*
     * Optional Sheet columns.
     *
     * These are fallback values only.
     * Google Doc metadata takes priority.
     */
    const seoTitleColumn = optionalColumn("seotitle");
    const keywordsColumn = optionalColumn("keywords");
    const coverImageColumn = optionalColumn("coverimage");
    const authorColumn = optionalColumn("author");
    const categoryColumn = optionalColumn("category");
    const titleTagColumn = optionalColumn("titletag");
    const metaDescriptionColumn = optionalColumn("metadescription");

    // Today's date
    const today = new Date();

    today.setHours(
      23,
      59,
      59,
      999
    );

    // Find first ready blog whose date has arrived
    let targetIndex = -1;

    for (let i = 1; i < values.length; i++) {

      const row = values[i];

      const status = String(
        row[statusColumn]
      )
        .trim()
        .toLowerCase();

      const publishDate = parseSheetDate(
        row[dateColumn]
      );

      if (
        status === "ready" &&
        publishDate &&
        publishDate <= today
      ) {
        targetIndex = i;
        break;
      }
    }

    // Nothing ready
    if (targetIndex === -1) {
      console.log(
        "No blog with Status = ready and a due Date was found."
      );
      return;
    }

    // Spreadsheet row number
    rowNumber = targetIndex + 1;

    const row = values[targetIndex];

    // Title from Sheet
    const sheetTitle = String(
      row[titleColumn]
    ).trim();

    if (!sheetTitle) {
      throw new Error(
        "The selected row has no TITLE."
      );
    }

    // Get Google Doc URL
    const contentCell = sheet.getRange(
      rowNumber,
      contentColumn + 1
    );

    const docUrl = getGoogleDocUrl(
      contentCell
    );

    if (!docUrl) {
      throw new Error(
        "The selected row has no valid Google Doc link in Content."
      );
    }

    // Mark as publishing
    sheet
      .getRange(
        rowNumber,
        statusColumn + 1
      )
      .setValue("publishing");

    // Parse date
    const publishDate = parseSheetDate(
      row[dateColumn]
    );

    if (!publishDate) {
      throw new Error(
        "The Date cell is invalid."
      );
    }

    // Fallback slug generated from Sheet title
    const fallbackSlug = slugify(
      sheetTitle
    );

    if (!fallbackSlug) {
      throw new Error(
        "Could not create a valid slug from the title."
      );
    }

    /*
     * Convert Google Doc into:
     *
     * {
     *   body: "...",
     *   coverImage: "...",
     *   metadata: {...}
     * }
     */
    const result = googleDocToMarkdown(
      docUrl,
      fallbackSlug
    );

    if (!result.body) {
      throw new Error(
        "Google Doc produced empty content."
      );
    }

    const body = result.body;
    const metadata = result.metadata || {};
    const extractedCoverImage = result.coverImage || null;

    /*
     * ========================================================
     * METADATA PRIORITY
     *
     * Google Doc metadata wins.
     *
     * Sheet values are fallback values.
     * ========================================================
     */

    // Title
    const title = metadata.title
      ? metadata.title
      : sheetTitle;

    // Slug
    const slug = metadata.slug
      ? slugify(metadata.slug)
      : fallbackSlug;

    if (!slug) {
      throw new Error(
        "Could not create a valid slug."
      );
    }

    // Title Tag
    const titleTag = metadata.titleTag
      ? metadata.titleTag
      : (
          titleTagColumn !== null
            ? String(
                row[titleTagColumn] || ""
              ).trim()
            : ""
        );

    // SEO Title
    const seoTitle = metadata.seoTitle
      ? metadata.seoTitle
      : (
          seoTitleColumn !== null
            ? String(
                row[seoTitleColumn] || ""
              ).trim()
            : ""
        );

    // Meta Title
    const metaTitle = metadata.metaTitle || "";

    // Meta Description
    const metaDescription = metadata.metaDescription
      ? metadata.metaDescription
      : (
          metaDescriptionColumn !== null
            ? String(
                row[metaDescriptionColumn] || ""
              ).trim()
            : ""
        );

    // SEO Description
    const seoDescription =
      metadata.seoDescription || "";

    // Category
    const category = metadata.category
      ? metadata.category
      : (
          categoryColumn !== null
            ? String(
                row[categoryColumn] || ""
              ).trim()
            : ""
        );

    // Author
    const author = metadata.author
      ? metadata.author
      : (
          authorColumn !== null
            ? String(
                row[authorColumn] || ""
              ).trim()
            : ""
        );

    // Keywords
    const keywords = metadata.keywords
      ? metadata.keywords
      : (
          keywordsColumn !== null
            ? String(
                row[keywordsColumn] || ""
              ).trim()
            : ""
        );

    // Cover image
    let finalCoverImage = "";

    if (extractedCoverImage) {
      finalCoverImage = extractedCoverImage;
    } else if (metadata.coverImage) {
      finalCoverImage = metadata.coverImage;
    } else if (coverImageColumn !== null) {
      finalCoverImage = String(
        row[coverImageColumn] || ""
      ).trim();
    }

    // Excerpt
    const excerpt = metadata.excerpt
      ? metadata.excerpt
      : createExcerpt(body);

    /*
     * ========================================================
     * BUILD MARKDOWN FRONTMATTER
     * ========================================================
     */

    let markdown = "---\n";

    // Title
    markdown +=
      'title: "' +
      escapeYaml(title) +
      '"\n';

    // Slug
    markdown +=
      'slug: "' +
      escapeYaml(slug) +
      '"\n';

    // Title Tag
    if (titleTag) {
      markdown +=
        'titleTag: "' +
        escapeYaml(titleTag) +
        '"\n';
    }

    // SEO Title
    if (seoTitle) {
      markdown +=
        'seoTitle: "' +
        escapeYaml(seoTitle) +
        '"\n';
    }

    // Meta Title
    if (metaTitle) {
      markdown +=
        'metaTitle: "' +
        escapeYaml(metaTitle) +
        '"\n';
    }

    // Meta Description
    if (metaDescription) {
      markdown +=
        'metaDescription: "' +
        escapeYaml(metaDescription) +
        '"\n';
    }

    // SEO Description
    if (seoDescription) {
      markdown +=
        'seoDescription: "' +
        escapeYaml(seoDescription) +
        '"\n';
    }

    // Date
    markdown +=
      'date: "' +
      Utilities.formatDate(
        publishDate,
        Session.getScriptTimeZone(),
        "yyyy-MM-dd"
      ) +
      '"\n';

    // Excerpt
    if (excerpt) {
      markdown +=
        'excerpt: "' +
        escapeYaml(excerpt) +
        '"\n';
    }

    // Keywords
    if (keywords) {

      const keywordList = keywords
        .split(/[,;]/)
        .map(function(keyword) {
          return keyword.trim();
        })
        .filter(Boolean);

      if (keywordList.length > 0) {

        markdown += "keywords:\n";

        keywordList.forEach(function(keyword) {

          markdown +=
            '  - "' +
            escapeYaml(keyword) +
            '"\n';

        });
      }
    }

    // Cover image
    if (finalCoverImage) {
      markdown +=
        'coverImage: "' +
        escapeYaml(finalCoverImage) +
        '"\n';
    }

    // Author
    if (author) {
      markdown +=
        'author: "' +
        escapeYaml(author) +
        '"\n';
    }

    // Category
    if (category) {
      markdown +=
        'category: "' +
        escapeYaml(category) +
        '"\n';
    }

    // URL from Google Doc
    if (metadata.url) {
      markdown +=
        'url: "' +
        escapeYaml(metadata.url) +
        '"\n';
    }

    // Published
    markdown +=
      "published: true\n";

    // End frontmatter
    markdown +=
      "---\n\n";

    /*
     * ========================================================
     * ARTICLE BODY
     *
     * IMPORTANT:
     * Only actual article content goes here.
     *
     * Google Doc metadata is NOT included.
     * ========================================================
     */

    markdown += body + "\n";

    /*
     * ========================================================
     * GITHUB
     * ========================================================
     */

    const githubPath =
      "content/posts/" +
      slug +
      ".md";

    const githubFileUrl =
      createGitHubFile(
        githubPath,
        markdown
      );

    /*
     * ========================================================
     * WEBSITE URL
     * ========================================================
     */

    const siteUrlProperty =
      PropertiesService
        .getScriptProperties()
        .getProperty("SITE_URL");

    if (!siteUrlProperty) {
      throw new Error(
        "SITE_URL is missing from Script Properties."
      );
    }

    const siteUrl =
      siteUrlProperty.replace(
        /\/$/,
        ""
      );

    const blogUrl =
      siteUrl +
      "/blog/" +
      slug;

    // Store generated URL in Sheet
    sheet
      .getRange(
        rowNumber,
        urlColumn + 1
      )
      .setValue(blogUrl);

    // Mark published
    sheet
      .getRange(
        rowNumber,
        statusColumn + 1
      )
      .setValue("published");

    // Logs
    console.log(
      "======================================"
    );

    console.log(
      "BLOG PUBLISHED SUCCESSFULLY"
    );

    console.log(
      "Title: " +
      title
    );

    console.log(
      "Slug: " +
      slug
    );

    console.log(
      "Google Doc URL: " +
      docUrl
    );

    console.log(
      "GitHub file: " +
      githubFileUrl
    );

    console.log(
      "Website URL: " +
      blogUrl
    );

    console.log(
      "======================================"
    );

  } catch (error) {

    console.error(
      "PUBLISH FAILED: " +
      error.message
    );

    // Mark failed
    if (
      sheet &&
      rowNumber &&
      statusColumn !== undefined
    ) {

      sheet
        .getRange(
          rowNumber,
          statusColumn + 1
        )
        .setValue(
          "failed: " +
          error.message
        );
    }

    throw error;

  } finally {

    lock.releaseLock();
  }
}


/**
 * ============================================================
 * DATE PARSER
 * ============================================================
 */
function parseSheetDate(value) {

  if (
    value instanceof Date &&
    !Number.isNaN(
      value.getTime()
    )
  ) {
    return value;
  }

  // Support DD.MM.YYYY
  const match = String(value)
    .trim()
    .match(
      /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/
    );

  if (match) {

    return new Date(
      Number(match[3]),
      Number(match[2]) - 1,
      Number(match[1])
    );
  }

  const parsed =
    new Date(value);

  return Number.isNaN(
    parsed.getTime()
  )
    ? null
    : parsed;
}


/**
 * ============================================================
 * GET GOOGLE DOC URL
 * ============================================================
 */
function getGoogleDocUrl(cell) {

  // Rich text link
  const richText =
    cell.getRichTextValue();

  if (
    richText &&
    richText.getLinkUrl()
  ) {
    return richText.getLinkUrl();
  }

  // HYPERLINK formula
  const formula =
    cell.getFormula();

  if (formula) {

    const formulaMatch =
      formula.match(
        /HYPERLINK\("([^"]+)"/i
      );

    if (formulaMatch) {
      return formulaMatch[1];
    }
  }

  // Plain URL
  const text =
    cell.getDisplayValue();

  const textMatch =
    text.match(
      /https?:\/\/[^\s]+/
    );

  return textMatch
    ? textMatch[0]
    : "";
}


/**
 * ============================================================
 * GOOGLE DOC → MARKDOWN
 *
 * Separates:
 *
 * 1. Metadata
 * 2. Article body
 * 3. Cover image
 * ============================================================
 */
function googleDocToMarkdown(
  docUrl,
  fallbackSlug
) {

  // Extract Google Doc ID
  const match =
    docUrl.match(
      /\/d\/([a-zA-Z0-9_-]+)/
    );

  if (!match) {
    throw new Error(
      "The Content link is not a valid Google Doc URL."
    );
  }

  const document =
    DocumentApp.openById(
      match[1]
    );

  const documentBody =
    document.getBody();

  const lines = [];

  const imageCounter = {
    count: 0
  };

  let coverImage = null;
  let coverImageFound = false;

  const metadata = {};

  /*
   * ============================================================
   * METADATA BLOCK
   *
   * Metadata is expected near the beginning of the Google Doc.
   *
   * Supported:
   * Title:
   * Title Tag:
   * Meta Description:
   * Meta Title:
   * SEO Title:
   * SEO Description:
   * URL:
   * Slug:
   * Category:
   * Author:
   * Cover Image:
   * Keywords:
   * Excerpt:
   *
   * We also support a plain first-line title such as:
   *
   * 7 Decluttering Tips for Your Kitchen
   *
   * followed by metadata.
   * ============================================================
   */

  let metadataMode = true;
  let firstNonEmptyParagraphSeen = false;

  for (
    let i = 0;
    i < documentBody.getNumChildren();
    i++
  ) {

    const element =
      documentBody.getChild(i);

    /*
     * --------------------------------------------------------
     * PARAGRAPH
     * --------------------------------------------------------
     */
    if (
      element.getType() ===
      DocumentApp.ElementType.PARAGRAPH
    ) {

      const paragraph =
        element.asParagraph();

      const rawText =
        paragraph.getText();

      const text =
        rawText.trim();

      /*
       * Ignore completely empty paragraphs
       * while we are still inside the metadata block.
       */
      if (
        metadataMode &&
        !text
      ) {
        continue;
      }

      /*
       * --------------------------------------------------------
       * TRY TO PARSE METADATA
       * --------------------------------------------------------
       */
      if (
        metadataMode &&
        text
      ) {

        const meta =
          parseMetadataLine(text);

        if (meta) {

          metadata[meta.key] =
            meta.value;

          firstNonEmptyParagraphSeen = true;

          continue;
        }

        /*
         * ------------------------------------------------------
         * PLAIN FIRST-LINE TITLE
         *
         * If the first meaningful line does not contain a colon,
         * treat it as the article title.
         *
         * Example:
         *
         * 7 Decluttering Tips for Your Kitchen
         *
         * Title Tag: ...
         * Meta Description: ...
         * ------------------------------------------------------
         */
        if (
          !firstNonEmptyParagraphSeen &&
          !text.includes(":")
        ) {

          metadata.title =
            text;

          firstNonEmptyParagraphSeen =
            true;

          continue;
        }

        /*
         * A non-metadata paragraph after the initial
         * metadata/title block means actual article
         * content has started.
         */
        metadataMode = false;

      } else if (text) {

        /*
         * Metadata section has already ended.
         */
        metadataMode = false;
      }

      /*
       * --------------------------------------------------------
       * CONVERT ARTICLE PARAGRAPH TO MARKDOWN
       * --------------------------------------------------------
       */
      const markdown =
        paragraphToMarkdown(
          paragraph,
          fallbackSlug,
          imageCounter
        );

      if (markdown) {

        /*
         * First image becomes cover image.
         */
        if (
          !coverImageFound &&
          markdown.indexOf("![") !== -1
        ) {

          const imgMatch =
            markdown.match(
              /!\[([^\]]*)\]\(([^)]+)\)/
            );

          if (imgMatch) {

            coverImage =
              imgMatch[2];

            coverImageFound =
              true;

            /*
             * Do not include cover image
             * again inside article body.
             */
            continue;
          }
        }

        lines.push(markdown);
      }

    /*
     * --------------------------------------------------------
     * LIST ITEM
     * --------------------------------------------------------
     */
    } else if (
      element.getType() ===
      DocumentApp.ElementType.LIST_ITEM
    ) {

      /*
       * A list item means article content has started.
       */
      metadataMode = false;

      const markdown =
        listItemToMarkdown(
          element.asListItem(),
          fallbackSlug,
          imageCounter
        );

      if (markdown) {
        lines.push(markdown);
      }

    /*
     * --------------------------------------------------------
     * TABLE
     * --------------------------------------------------------
     */
    } else if (
      element.getType() ===
      DocumentApp.ElementType.TABLE
    ) {

      /*
       * A table means article content has started.
       */
      metadataMode = false;

      const markdown =
        tableToMarkdown(
          element.asTable()
        );

      if (markdown) {
        lines.push(markdown);
      }
    }
  }

  if (!lines.length) {
    throw new Error(
      "The Google Doc appears to contain metadata but no article content."
    );
  }

  return {
    body: lines.join("\n\n"),
    coverImage: coverImage,
    metadata: metadata
  };
}


/**
 * ============================================================
 * PARSE METADATA LINE
 *
 * Supported Google Doc lines:
 *
 * Title: ...
 * Title Tag: ...
 * Meta Description: ...
 * Meta Title: ...
 * SEO Title: ...
 * SEO Description: ...
 * URL: ...
 * Slug: ...
 * Category: ...
 * Author: ...
 * Cover Image: ...
 * Keywords: ...
 * Excerpt: ...
 * ============================================================
 */
function parseMetadataLine(text) {

  if (!text) {
    return null;
  }

  /*
   * Remove Markdown formatting characters
   * from beginning of line.
   */
  const cleaned =
    text
            .replace(
        /^[\s*_~#-]+/,
        ""
      )
      .trim();

  /*
   * Find first colon.
   *
   * This allows values such as:
   *
   * URL: https://example.com/blog/test
   */
  const match =
    cleaned.match(
      /^([^:]+):\s*(.*)$/
    );

  if (!match) {
    return null;
  }

  const label =
    match[1]
      .trim()
      .toLowerCase();

  const value =
    match[2]
      .trim();

  if (!value) {
    return null;
  }

  /*
   * Map Google Doc labels
   * to frontmatter fields.
   */
  const metadataMap = {

    "title": "title",

    "title tag": "titleTag",

    "meta description": "metaDescription",

    "meta title": "metaTitle",

    "seo title": "seoTitle",

    "seo description": "seoDescription",

    "url": "url",

    "slug": "slug",

    "category": "category",

    "author": "author",

    "cover image": "coverImage",

    "keywords": "keywords",

    "excerpt": "excerpt"
  };

  /*
   * Ignore lines that are not recognized metadata.
   */
  if (
    !metadataMap[label]
  ) {
    return null;
  }

  return {
    key: metadataMap[label],
    value: value
  };
}


/**
 * ============================================================
 * PARAGRAPH → MARKDOWN
 * ============================================================
 */
function paragraphToMarkdown(
  paragraph,
  slug,
  imageCounter
) {

  const text =
    paragraph
      .getText()
      .trim();

  const heading =
    paragraph.getHeading();

  const numChildren =
    paragraph.getNumChildren();

  let hasImages = false;

  /*
   * Check for inline images.
   */
  for (
    let j = 0;
    j < numChildren;
    j++
  ) {

    if (
      paragraph
        .getChild(j)
        .getType() ===
      DocumentApp.ElementType.INLINE_IMAGE
    ) {

      hasImages = true;
      break;
    }
  }

  /*
   * Empty paragraph.
   */
  if (
    !text &&
    !hasImages
  ) {
    return null;
  }

  /*
   * Image-only paragraph.
   */
  if (
    !text &&
    hasImages
  ) {

    const images = [];

    for (
      let j = 0;
      j < numChildren;
      j++
    ) {

      const child =
        paragraph.getChild(j);

      if (
        child.getType() ===
        DocumentApp.ElementType.INLINE_IMAGE
      ) {

        images.push(
          extractAndUploadImage(
            child.asInlineImage(),
            slug,
            imageCounter
          )
        );
      }
    }

    return images.join("\n\n");
  }

  /*
   * Build formatted text.
   */
  let textContent = "";

  if (numChildren > 0) {

    for (
      let j = 0;
      j < numChildren;
      j++
    ) {

      const child =
        paragraph.getChild(j);

      if (
        child.getType() ===
        DocumentApp.ElementType.TEXT
      ) {

        textContent +=
          textWithFormatting(
            child.asText()
          );

      } else if (
        child.getType() ===
        DocumentApp.ElementType.INLINE_IMAGE
      ) {

        textContent +=
          "\n\n" +
          extractAndUploadImage(
            child.asInlineImage(),
            slug,
            imageCounter
          ) +
          "\n\n";
      }
    }

  } else {

    textContent = text;
  }

  textContent =
    textContent.trim();

  if (
    !textContent &&
    !hasImages
  ) {
    return null;
  }

  /*
   * Markdown heading.
   */
  let prefix = "";

  if (
    heading ===
    DocumentApp.ParagraphHeading.HEADING1
  ) {

    prefix = "# ";

  } else if (
    heading ===
    DocumentApp.ParagraphHeading.HEADING2
  ) {

    prefix = "## ";

  } else if (
    heading ===
    DocumentApp.ParagraphHeading.HEADING3
  ) {

    prefix = "### ";

  } else if (
    heading ===
    DocumentApp.ParagraphHeading.HEADING4
  ) {

    prefix = "#### ";
  }

  return (
    prefix +
    textContent
  );
}


/**
 * ============================================================
 * LIST ITEM → MARKDOWN
 * ============================================================
 */
function listItemToMarkdown(
  listItem,
  slug,
  imageCounter
) {

  const text =
    listItem
      .getText()
      .trim();

  const numChildren =
    listItem.getNumChildren();

  let hasImages = false;

  for (
    let j = 0;
    j < numChildren;
    j++
  ) {

    if (
      listItem
        .getChild(j)
        .getType() ===
      DocumentApp.ElementType.INLINE_IMAGE
    ) {

      hasImages = true;
      break;
    }
  }

  if (
    !text &&
    !hasImages
  ) {
    return null;
  }

  let textContent = "";

  if (numChildren > 0) {

    for (
      let j = 0;
      j < numChildren;
      j++
    ) {

      const child =
        listItem.getChild(j);

      if (
        child.getType() ===
        DocumentApp.ElementType.TEXT
      ) {

        textContent +=
          textWithFormatting(
            child.asText()
          );

      } else if (
        child.getType() ===
        DocumentApp.ElementType.INLINE_IMAGE
      ) {

        textContent +=
          "\n\n" +
          extractAndUploadImage(
            child.asInlineImage(),
            slug,
            imageCounter
          ) +
          "\n\n";
      }
    }

  } else {

    textContent = text;
  }

  textContent =
    textContent.trim();

  if (!textContent) {
    return null;
  }

  return "- " + textContent;
}


/**
 * ============================================================
 * TABLE → MARKDOWN
 * ============================================================
 */
function tableToMarkdown(table) {

  const numRows =
    table.getNumRows();

  if (numRows === 0) {
    return null;
  }

  const markdownRows = [];

  for (
    let r = 0;
    r < numRows;
    r++
  ) {

    const row =
      table.getRow(r);

    const numCells =
      row.getNumCells();

    const cells = [];

    for (
      let c = 0;
      c < numCells;
      c++
    ) {

      const cell =
        row.getCell(c);

      const cellText =
        cell
          .getText()
          .trim()
          .replace(
            /\|/g,
            "\\|"
          );

      cells.push(
        cellText || " "
      );
    }

    markdownRows.push(
      "| " +
      cells.join(" | ") +
      " |"
    );

    /*
     * Add Markdown separator
     * after first row.
     */
    if (r === 0) {

      markdownRows.push(
        "| " +
        cells
          .map(function() {
            return "---";
          })
          .join(" | ") +
        " |"
      );
    }
  }

  return markdownRows.join("\n");
}


/**
 * ============================================================
 * TEXT FORMATTING
 * ============================================================
 */
function textWithFormatting(
  textElement
) {

  const text =
    textElement.getText();

  if (!text) {
    return "";
  }

  const isBold =
    textElement.isBold();

  const isItalic =
    textElement.isItalic();

  if (
    isBold &&
    isItalic
  ) {

    return (
      "***" +
      text +
      "***"
    );
  }

  if (isBold) {

    return (
      "**" +
      text +
      "**"
    );
  }

  if (isItalic) {

    return (
      "*" +
      text +
      "*"
    );
  }

  return text;
}


/**
 * ============================================================
 * EXTRACT + UPLOAD IMAGE
 * ============================================================
 */
function extractAndUploadImage(
  image,
  slug,
  imageCounter
) {

  imageCounter.count++;

  const blob =
    image.getBlob();

  const altText =
    image.getAltTitle() ||
    image.getAltDescription() ||
    "Blog image";

  /*
   * Preserve original MIME type
   * where possible.
   */
  const contentType =
    blob.getContentType();

  let extension = "png";

  if (
    contentType === "image/jpeg"
  ) {
    extension = "jpg";
  } else if (
    contentType === "image/webp"
  ) {
    extension = "webp";
  } else if (
    contentType === "image/gif"
  ) {
    extension = "gif";
  }

  const filename =
    slug +
    "-img-" +
    imageCounter.count +
    "." +
    extension;

  const imagePath =
    "public/images/blog/" +
    filename;

  const uploaded =
    uploadImageToGitHub(
      imagePath,
      blob
    );

  if (uploaded) {

    return (
      "![" +
      altText +
      "](/images/blog/" +
      filename +
      ")"
    );
  }

  return (
    "*" +
    altText +
    " (image could not be uploaded)*"
  );
}


/**
 * ============================================================
 * UPLOAD IMAGE TO GITHUB
 * ============================================================
 */
function uploadImageToGitHub(
  path,
  blob
) {

  const properties =
    PropertiesService
      .getScriptProperties();

  const token =
    properties.getProperty(
      "GITHUB_TOKEN"
    );

  const owner =
    properties.getProperty(
      "GITHUB_OWNER"
    );

  const repo =
    properties.getProperty(
      "GITHUB_REPO"
    );

  const branch =
    properties.getProperty(
      "GITHUB_BRANCH"
    ) || "main";

  if (
    !token ||
    !owner ||
    !repo
  ) {

    console.log(
      "WARNING: GitHub properties missing, skipping image upload: " +
      path
    );

    return false;
  }

  const encodedPath =
    path
      .split("/")
      .map(function(part) {
        return encodeURIComponent(part);
      })
      .join("/");

  const endpoint =
    "https://api.github.com/repos/" +
    owner +
    "/" +
    repo +
    "/contents/" +
    encodedPath;

  /*
   * Check whether image already exists.
   */
  let sha = "";

  try {

    const existing =
      UrlFetchApp.fetch(
        endpoint,
        {
          method: "get",

          headers: {
            Authorization:
              "Bearer " +
              token,

            Accept:
              "application/vnd.github+json",

            "X-GitHub-Api-Version":
              "2022-11-28"
          },

          muteHttpExceptions:
            true
        }
      );

    if (
      existing.getResponseCode() ===
      200
    ) {

      const existingData =
        JSON.parse(
          existing.getContentText()
        );

      sha =
        existingData.sha ||
        "";
    }

  } catch (e) {
    // File does not exist yet.
  }

  const payload = {

    message:
      "Upload blog image: " +
      path,

    content:
      Utilities.base64Encode(
        blob.getBytes()
      ),

    branch:
      branch
  };

  if (sha) {
    payload.sha = sha;
  }

  const response =
    UrlFetchApp.fetch(
      endpoint,
      {
        method: "put",

        contentType:
          "application/json",

        headers: {
          Authorization:
            "Bearer " +
            token,

          Accept:
            "application/vnd.github+json",

          "X-GitHub-Api-Version":
            "2022-11-28"
        },

        payload:
          JSON.stringify(payload),

        muteHttpExceptions:
          true
      }
    );

  const statusCode =
    response.getResponseCode();

  if (
    statusCode !== 200 &&
    statusCode !== 201
  ) {

    console.log(
      "WARNING: Failed to upload image " +
      path +
      " (" +
      statusCode +
      ")"
    );

    console.log(
      response.getContentText()
    );

    return false;
  }

  console.log(
    "Image uploaded: " +
    path
  );

  return true;
}


/**
 * ============================================================
 * CREATE / UPDATE GITHUB MARKDOWN FILE
 * ============================================================
 */
function createGitHubFile(
  path,
  content
) {

  console.log(
    "createGitHubFile() called."
  );

  console.log(
    "Path: " +
    path
  );

  console.log(
    "Content length: " +
    (
      content
        ? content.length
        : "undefined"
    )
  );

  if (!path) {
    throw new Error(
      "GitHub file path is missing."
    );
  }

  if (!content) {
    throw new Error(
      "GitHub file content is missing."
    );
  }

  const properties =
    PropertiesService
      .getScriptProperties();

  const token =
    properties.getProperty(
      "GITHUB_TOKEN"
    );

  const owner =
    properties.getProperty(
      "GITHUB_OWNER"
    );

  const repo =
    properties.getProperty(
      "GITHUB_REPO"
    );

  const branch =
    properties.getProperty(
      "GITHUB_BRANCH"
    ) || "main";

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is missing from Script Properties."
    );
  }

  if (!owner) {
    throw new Error(
      "GITHUB_OWNER is missing from Script Properties."
    );
  }

  if (!repo) {
    throw new Error(
      "GITHUB_REPO is missing from Script Properties."
    );
  }

  const encodedPath =
    path
      .split("/")
      .map(function(part) {
        return encodeURIComponent(part);
      })
      .join("/");

  const endpoint =
    "https://api.github.com/repos/" +
    owner +
    "/" +
    repo +
    "/contents/" +
    encodedPath;

  console.log(
    "========== GITHUB PUBLISH =========="
  );

  console.log(
    "Owner: " +
    owner
  );

  console.log(
    "Repo: " +
    repo
  );

  console.log(
    "Branch: " +
    branch
  );

  console.log(
    "Path: " +
    path
  );

  console.log(
    "Endpoint: " +
    endpoint
  );

  /*
   * Check whether Markdown file already exists.
   */
  let sha = "";

  try {

    const existing =
      UrlFetchApp.fetch(
        endpoint,
        {
          method: "get",

          headers: {
            Authorization:
              "Bearer " +
              token,

            Accept:
              "application/vnd.github+json",

            "X-GitHub-Api-Version":
              "2022-11-28"
          },

          muteHttpExceptions:
            true
        }
      );

    if (
      existing.getResponseCode() ===
      200
    ) {

      const existingData =
        JSON.parse(
          existing.getContentText()
        );

      sha =
        existingData.sha ||
        "";

      console.log(
        "File already exists, SHA: " +
        sha
      );
    }

  } catch (e) {
    // File does not exist yet.
  }

  const payload = {

    message:
      "Publish blog: " +
      path,

    content:
      Utilities.base64Encode(
        Utilities.newBlob(
          content
        ).getBytes()
      ),

    branch:
      branch
  };

  if (sha) {
    payload.sha = sha;
  }

  const response =
    UrlFetchApp.fetch(
      endpoint,
      {
        method: "put",

        contentType:
          "application/json",

        headers: {
          Authorization:
            "Bearer " +
            token,

          Accept:
            "application/vnd.github+json",

          "X-GitHub-Api-Version":
            "2022-11-28"
        },

        payload:
          JSON.stringify(payload),

        muteHttpExceptions:
          true
      }
    );

  const statusCode =
    response.getResponseCode();

  const responseText =
    response.getContentText();

  console.log(
    "GitHub HTTP Status: " +
    statusCode
  );

  console.log(
    "GitHub Response:"
  );

  console.log(
    responseText
  );

  if (
    statusCode !== 201 &&
    statusCode !== 200
  ) {

    throw new Error(
      "GitHub API failed (" +
      statusCode +
      "): " +
      responseText
    );
  }

  let result;

  try {

    result =
      JSON.parse(
        responseText
      );

  } catch (error) {

    throw new Error(
      "GitHub returned invalid JSON: " +
      responseText
    );
  }

  const fileUrl =
    result.content &&
    result.content.html_url
      ? result.content.html_url
      : "";

  const commitUrl =
    result.commit &&
    result.commit.html_url
      ? result.commit.html_url
      : "";

  console.log(
    "Created/updated file: " +
    (
      fileUrl ||
      "No URL returned"
    )
  );

  console.log(
    "Commit: " +
    (
      commitUrl ||
      "No URL returned"
    )
  );

  console.log(
    "===================================="
  );

  return fileUrl;
}


/**
 * ============================================================
 * SLUGIFY
 * ============================================================
 */
function slugify(text) {

  return String(text)
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /(^-|-$)/g,
      "");
}


/**
 * ============================================================
 * CREATE EXCERPT
 * ============================================================
 */
function createExcerpt(markdown) {

  return markdown
    .replace(
      /^#+\s+/gm,
      ""
    )
    .replace(
      /!\[[^\]]*\]\([^)]+\)/g,
      ""
    )
    .replace(
      /[*_~]/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim()
    .slice(
      0,
      155
    );
}


/**
 * ============================================================
 * ESCAPE YAML
 * ============================================================
 */
function escapeYaml(text) {

  return String(text)
    .replace(
      /\\/g,
      "\\\\"
    )
    .replace(
      /"/g,
      '\\"'
    );
}


/**
 * ============================================================
 * TEST GITHUB CONNECTION
 * ============================================================
 */
function testGitHubConnection() {

  const testContent =
    "---\n" +
    'title: "GitHub Test Blog"\n' +
    'date: "2026-09-19"\n' +
    'excerpt: "Testing GitHub publishing."\n' +
    "published: true\n" +
    "---\n\n" +
    "# GitHub Test\n\n" +
    "This is a test file created from Google Apps Script.\n";

  const testPath =
    "content/posts/github-test-blog.md";

  console.log(
    "Starting GitHub test..."
  );

  const fileUrl =
    createGitHubFile(
      testPath,
      testContent
    );

  console.log(
    "===================================="
  );

  console.log(
    "GITHUB TEST SUCCESSFUL"
  );

  console.log(
    "File URL: " +
    fileUrl
  );

  console.log(
    "===================================="
  );
}


/**
 * ============================================================
 * VERIFY GITHUB CONNECTION
 * ============================================================
 */
function verifyGitHubConnection() {

  const properties =
    PropertiesService
      .getScriptProperties();

  const token =
    properties.getProperty(
      "GITHUB_TOKEN"
    );

  const owner =
    properties.getProperty(
      "GITHUB_OWNER"
    );

  const repo =
    properties.getProperty(
      "GITHUB_REPO"
    );

  const branch =
    properties.getProperty(
      "GITHUB_BRANCH"
    ) || "main";

  if (!token) {
    throw new Error(
      "GITHUB_TOKEN is missing."
    );
  }

  if (!owner) {
    throw new Error(
      "GITHUB_OWNER is missing."
    );
  }

  if (!repo) {
    throw new Error(
      "GITHUB_REPO is missing."
    );
  }

  const endpoint =
    "https://api.github.com/repos/" +
    owner +
    "/" +
    repo +
    "/contents/content/posts?ref=" +
    encodeURIComponent(branch);

  console.log(
    "Checking GitHub repository..."
  );

  console.log(
    "Repository: " +
    owner +
    "/" +
    repo
  );

  console.log(
    "Branch: " +
    branch
  );

  console.log(
    "Endpoint: " +
    endpoint
  );

  const response =
    UrlFetchApp.fetch(
      endpoint,
      {
        method: "get",

        headers: {
          Authorization:
            "Bearer " +
            token,

          Accept:
            "application/vnd.github+json",

          "X-GitHub-Api-Version":
            "2022-11-28"
        },

        muteHttpExceptions:
          true
      }
    );

  console.log(
    "HTTP Status: " +
    response.getResponseCode()
  );

  console.log(
    response.getContentText()
  );
}

