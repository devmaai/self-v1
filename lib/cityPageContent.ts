// Hand-written, chunked city page copy. A city listed here replaces the
// long-form CSV content (lib/citySeoContent.ts) on its city page.
//
// Paragraph text supports inline links written as [label](/path) and the
// {{from_price}} token, which is replaced with the live "From $X" price.

// How a section is displayed on the page:
// card      consecutive "card" sections sit side by side as a row of cards
// options   bullets become linked storage-type cards ("[Label](/path): text")
// sizes     bullets become a visual size table ("5x5: what fits")
// nearby    paragraphs plus the linked cities shown as buttons
// checklist bullets become a checklist ("Title: text")
export type CityContentLayout = "card" | "options" | "sizes" | "nearby" | "checklist";

export type CityContentSection = {
  heading: string;
  layout?: CityContentLayout;
  /** One image per bullet, in order (options layout). */
  images?: string[];
  /** Extra sub-section shown under the main content, with an H3. */
  extra?: { heading: string; paragraphs: string[] };
  /** Call to action button shown at the end of the section. */
  cta?: { label: string; href: string };
  paragraphs?: string[];
  bullets?: string[];
};

export type CityPageContent = {
  intro?: { heading: string; paragraphs: string[] };
  /** Heading and photo for the row of "card" sections. */
  cardsHeading?: string;
  cardsImage?: { src: string; alt: string };
  sections: CityContentSection[];
  faqHeading: string;
  faqs: { question: string; answer: string; bullets?: string[] }[];
};

export const CITY_PAGE_CONTENT: Record<string, CityPageContent> = {
  "salt-lake-city": {
    cardsHeading: "Moving to Salt Lake City?",
    cardsImage: { src: "https://images.unsplash.com/photo-1621603933126-6c216db10045?auto=format&fit=crop&w=1000&q=75", alt: "Salt Lake City skyline with the Wasatch Mountains" },
    sections: [
      {
        heading: "How much does it cost to live in Salt Lake City?",
        layout: "card",
        paragraphs: [
          "Housing is your biggest cost. Rent and home prices in Salt Lake City run higher than in many smaller Utah towns, and apartments near downtown and the University of Utah tend to be compact.",
          "Smaller homes are one of the main reasons renters look for storage. A small unit costs far less per month than renting a bigger apartment just to fit your belongings. Storage units on this page start from {{from_price}} a month.",
        ],
      },
      {
        heading: "Is Salt Lake City student friendly?",
        layout: "card",
        paragraphs: [
          "Yes. The University of Utah and Westminster University bring thousands of students to the city, and many neighborhoods near campus are built around student life, transit and part-time work.",
          "Student storage is busiest at the end of each semester. A 5x5 or 5x10 unit holds most dorm rooms, and booking a few weeks before move-out week gives you more choice. See our [student storage guide](/student-storage) for tips on summer storage.",
        ],
      },
      {
        heading: "Is Salt Lake City good for families with kids?",
        layout: "card",
        paragraphs: [
          "Families like Salt Lake City for its parks, outdoor activities and neighborhoods with more space in the surrounding valley, such as [Sandy](/storage-search/utah/sandy), [South Jordan](/storage-search/utah/south-jordan) and [Millcreek](/storage-search/utah/millcreek).",
          "Family homes collect baby gear, outgrown toys, holiday decorations and sports equipment. A 10x10 or 10x15 unit keeps these out of the garage until you need them again.",
        ],
      },
      {
        heading: "Storage solutions in Salt Lake City",
        layout: "options",
        images: [
          "/images/climate-storage/indoor-corridor.png",
          "https://images.unsplash.com/photo-1649313444539-a8900c5cdc54?auto=format&fit=crop&w=700&q=75",
          "/images/storage-guide/vehiclestorage.jpg",
          "/images/state pages/proff and small business.jpg",
          "/images/state pages/storage for students.jpg",
        ],
        paragraphs: ["Choose the type of storage that fits what you are storing and how often you need it."],
        bullets: [
          "[Climate controlled storage](/climate-controlled-storage): Salt Lake City has hot summers and cold winters. Climate control protects wood furniture, mattresses, electronics, documents and photos from heat, cold and wide temperature swings.",
          "Drive-up storage units: the most affordable choice for skis, bikes, camping gear, tools and plastic bins. You park at the door and load directly.",
          "[RV storage](/rv-storage), [boat storage](/boat-storage) and [car storage](/car-storage): outdoor, covered and enclosed spaces priced by length. Measure your vehicle, including the hitch, before you book.",
          "[Business storage](/business-storage): space for inventory, equipment, files and seasonal stock for Salt Lake City businesses that have outgrown their office or shop.",
          "[Student storage](/student-storage): short-term units near campus for the summer break or a semester away.",
        ],
      },
      {
        heading: "What size storage unit do you need?",
        layout: "sizes",
        bullets: [
          "5x5: boxes, ski gear, boots and seasonal clothing.",
          "5x10: a dorm room, a bedroom of furniture, or a household's bikes and outdoor gear.",
          "10x10: a one bedroom apartment with a sofa, bed and appliances.",
          "10x15: a two to three bedroom home if you take apart beds and tables.",
          "10x20: a larger home or a car.",
        ],
        paragraphs: [
          "Size your unit around your bulkiest items.",
        ],
        extra: {
          heading: "Storage unit sizes for different needs",
          paragraphs: [
            "Moving between homes usually needs a 10x10 to 10x20, depending on how many bedrooms you are packing up. A home renovation often fits in a 5x10 or 10x10 for furniture you need out of the way. Students rarely need more than a 5x5 or 5x10 for a dorm room. Businesses storing stock or equipment usually start with a 10x10 and add shelving. Cars, boats and RVs need a 10x20 or a parking space sized to their length.",
            "See the [storage unit size guide](/storage-size-guide) for photos of each size and what fits inside.",
          ],
        },
        cta: { label: "Not sure? Try our free storage size calculator", href: "/storage-unit-size-calculator" },
      },
      {
        heading: "Where to find cheap storage near Salt Lake City",
        layout: "nearby",
        paragraphs: [
          "Prices usually drop as you move away from downtown. Compare facilities along State Street, Redwood Road and the I-15 and I-80 corridors, then check nearby cities like [West Valley City](/storage-search/utah/west-valley-city), [West Jordan](/storage-search/utah/west-jordan) and [Sandy](/storage-search/utah/sandy).",
          "If you will visit your unit often, pick one on a route you already drive. For long-term storage you rarely open, the lowest monthly rate within a reasonable drive usually wins.",
        ],
        cta: { label: "Explore Utah", href: "/storage-search/utah" },
      },
    ],
    faqHeading: "Common questions about renting storage in Salt Lake City",
    faqs: [
      {
        question: "How much is a storage unit in Salt Lake City, UT?",
        answer: "Storage units on this page start from {{from_price}} a month. Prices are moderate by national standards and usually fall as you move from downtown toward the valley suburbs.",
      },
      {
        question: "Is there student storage near the University of Utah?",
        answer: "Yes. Facilities near campus and across the valley offer short-term rentals. A 5x5 or 5x10 fits most dorm rooms. Book a few weeks before move-out week, when units fill up.",
      },
      {
        question: "Do I need climate controlled storage in Salt Lake City?",
        answer: "The dry air limits mildew, but summer heat and winter cold can warp furniture, crack leather and damage electronics. Climate control is worth it for furniture, electronics and documents.",
      },
      {
        question: "What size unit fits ski and bike gear?",
        answer: "A 5x10 with shelving and wall hooks holds a household's skis, boards, boots, bikes and camping gear. A 5x5 works for boots, helmets and clothing only.",
      },
      {
        question: "Which parts of the valley have the cheapest storage?",
        answer: "Rates usually drop as you move away from downtown toward West Valley City, West Jordan and the outer suburbs. Comparing several facilities saves more than waiting for one promotion.",
      },
      {
        question: "Can I rent a storage unit month to month?",
        answer: "Most Salt Lake City facilities rent month to month with no long-term contract. Confirm the move-out notice period when you sign.",
      },
      {
        question: "What should I check before booking a storage unit in Salt Lake City?",
        answer: "Ask these questions before you sign:",
        bullets: [
          "Snow clearing: ask how quickly aisles and drive-up doors are cleared in winter.",
          "Climate control: confirm the unit is cooled in summer as well as heated in winter.",
          "Promotional rates: ask what the monthly price becomes after the first month.",
          "Insurance: check your renters or homeowners policy before buying extra cover.",
          "Move-out notice: many facilities ask for 10 to 14 days written notice.",
        ],
      },
    ],
  },
};
