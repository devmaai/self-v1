// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // From your Tina Cloud project (see BLOG-CMS-SETUP.md).
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        ui: {
          // URL shown in the editor's "view post" button.
          router: ({ document }) => `/blog/${document._sys.filename}`,
          filename: {
            // Slug is derived from the title, kebab-cased.
            slugify: (values) => `${(values?.title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "Publish date",
            required: true,
            ui: { dateFormat: "YYYY-MM-DD" }
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt (shown on the blog list)",
            required: true,
            ui: { component: "textarea" }
          },
          {
            type: "image",
            name: "coverImage",
            label: "Cover image (optional)"
          },
          {
            type: "boolean",
            name: "published",
            label: "Published (uncheck to hide from the site)"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
