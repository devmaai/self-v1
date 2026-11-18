import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In Kansas Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Kansas near your location. Compare 251 facilities and 2,258 available units across Wichita, Overland Park, Olathe, Topeka, Lawrence and Manhattan, with current monthly prices.",
};

const CITY_LINKS = ["Wichita", "Overland Park", "Olathe", "Topeka", "Lawrence", "Manhattan", "Kansas City", "Lenexa", "Shawnee", "Salina", "Leavenworth", "Hutchinson", "Merriam", "Gardner", "Mission", "Derby", "Spring Hill", "Newton", "Andover", "Lansing", "El Dorado", "Park City", "Haysville", "De Soto", "Eudora", "Bonner Springs", "Valley Center", "Maize", "Winfield"];

const PRICE_ROWS = [
  ["5' x 5'", "$15 to $60", "Boxes, bedding, a bike"],
  ["5' x 10'", "$32 to $85", "A single room, tools, garden equipment"],
  ["10' x 10'", "$59 to $160", "A one bedroom apartment"],
  ["10' x 15'", "$95 to $130", "A two bedroom home with appliances"],
  ["10' x 20'", "$86 to $340", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$364 to $902", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much is a storage unit in Kansas?",
    answer: "A 5x5 typically runs $15 to $60 a month. A 10x10 typically runs $59 to $160. A 10x20 typically runs $86 to $340. The average unit runs around $148 a month in Wichita and Kansas City, and around $205 in Overland Park.",
  },
  {
    question: "How much is a small storage unit in Kansas?",
    answer: "A 5x5 averages around $41 a month in both Wichita and Overland Park, with listings from around $15 in Olathe. A 5x10 typically runs $32 to $85.",
  },
  {
    question: "How much is climate controlled storage in Kansas?",
    answer: "In Wichita, climate controlled units start at around $43 a month for a 5x5 and run to around $504 for a 20x30. In Overland Park they range from around $37 for a 5x5 to around $902 for a 20x30.",
  },
  {
    question: "Where do I find climate control storage units near me?",
    answer: "Filter your search for climate control and set your radius. In Wichita alone, 31 of 63 facilities offer climate controlled units, and availability is strong across Johnson County, Topeka and Lawrence.",
  },
  {
    question: "Do I need climate controlled storage in Kansas?",
    answer: "Humid summers and hard winter freezes make it worthwhile for furniture, electronics, documents, photographs, instruments, mattresses and clothing. Tools, bins, lawn equipment and vehicles are usually fine in a standard drive up unit.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding and a bike. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Where can I find a 24 hour storage unit near me?",
    answer: "Filter your search for 24 hour access. Availability varies by site, and office hours are almost always shorter than gate hours, so confirm both before you reserve.",
  },
  {
    question: "What should I look for in long term storage?",
    answer: "Climate control, autopay, a clear rate increase policy, and a discount for a six or twelve month commitment. Pack for time rather than for the move, using pallets, breathable covers and sealed plastic bins.",
  },
  {
    question: "How do I find cheap storage units in Kansas?",
    answer: "Compare the twelve month cost rather than the first month, compare by neighborhood rather than by city, check the next suburb out, ask about waived administration fees, ask for military, student and senior rates, and reserve online.",
  },
  {
    question: "Can I store an RV, boat or car in Kansas?",
    answer: "Yes. As a benchmark, vehicle storage in Wichita averages around $144 a month, RV storage around $112 and boat storage around $190. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Kansas facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, since stored goods are often already covered, then confirm what the facility accepts before buying a separate plan.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across Kansas prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odor. Drain fuel from mowers, blowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "kansas",
  "name": "Kansas",
  "key": "ks",
  "heroImage": "https://images.unsplash.com/photo-1590433136906-733e707e7f25",
  "heroText": "Compare 251 facilities and 2,258 available units across Kansas, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find cheap storage units in your Kansas city",
  "citiesIntro": "Kansas rates vary sharply between metros, and again between neighborhoods inside them. The average unit in Overland Park runs around $205 a month against around $148 in Wichita, so where you search matters as much as what you rent. Start with your city and narrow by radius.",
  "pricingHeading": "How much are storage units in Kansas per month?",
  "pricingIntro": "Kansas carries one of the widest metro gaps in the Midwest. The average unit runs around $148 a month in Wichita and Kansas City, and around $205 in Overland Park. Rural and smaller markets sit well below both. Within a city the spread is just as wide: in Wichita, the McAdams neighborhood carries the lowest average rent in the city at around $77 a month, well below the citywide figure.",
  "needsHeading": "Pick Kansas storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for Kansas families",
      "body": "Most homes here fill the garage and basement before they run out of things to keep. Storage takes the overflow: lawn equipment and patio furniture through winter, holiday decorations, hunting and fishing gear, sports equipment, tools, and furniture you are holding between houses.",
      "bullets": [
        "Clearing the garage: a 5x10 holds seasonal items, tools and sports gear.",
        "Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.",
        "Storm season: many families move documents, photographs and irreplaceable items into a secure unit ahead of severe weather.",
        "Look for drive-up access, ground floor units, cleared drives through winter, and gate hours that suit a weekend load."
      ],
      "links": [
        {
          "label": "Find family storage near you",
          "href": "/find-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/state%20pages/military%20storage.jpg",
        "alt": "Military family with a service member packing a storage unit during a move",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for military households",
      "body": "Fort Riley, Fort Leavenworth and McConnell Air Force Base bring households through Kansas on orders that rarely line up with lease dates. Storage covers the gap between a move out and a move in, or holds household goods through a deployment.",
      "bullets": [
        "Full household during a posting: a 10x20 holds a three bedroom home.",
        "Partial storage: a 10x10 covers furniture you will not need at the next duty station.",
        "Vehicles: enclosed or covered parking keeps a car protected while you are away.",
        "Look for military rates, month-to-month terms with no penalty for an early move-out, autopay so billing runs while you are away, and climate control for anything staying more than a season."
      ],
      "links": [
        {
          "label": "Find storage near your base",
          "href": "/find-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/state%20pages/proff%20and%20small%20business.jpg",
        "alt": "Business owner organizing inventory in a storage unit",
        "width": 640,
        "height": 640
      },
      "heading": "Professionals and small businesses",
      "body": "You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging and returns. Agricultural and field service operators store equipment between seasons. Practices and firms archive files.",
      "bullets": [
        "Inventory and stock: a 10x10 or 10x15 with drive-up access and room to load a van.",
        "Tools and equipment: a drive-up unit you can back into directly, with 24 hour gate access for early starts.",
        "Records, samples and electronics: a climate-controlled 5x10 protects paper and hardware through the summer.",
        "Look for month-to-month terms, online payment and invoicing, and autopay."
      ],
      "links": [
        {
          "label": "Find business storage near you",
          "href": "/business-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20students.jpg",
        "alt": "Student moving belongings into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for students",
      "body": "Campuses in Lawrence, Manhattan, Wichita, Topeka, Emporia and Pittsburg empty every summer, and moving a full room home twice a year rarely makes sense. A small unit over the break usually costs less than replacing your furniture in August.",
      "bullets": [
        "Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.",
        "Splitting with housemates: a 10x10 covers two rooms and divides the cost.",
        "Look for student rates, a facility close to campus, climate control for anything that would not survive a Kansas summer in a metal unit, and month-to-month terms so you stop paying the week you return."
      ],
      "links": [
        {
          "label": "Find student storage near you",
          "href": "/student-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/climate-storage/indoor-corridor.png",
        "alt": "Indoor climate controlled storage corridor",
        "width": 1200,
        "height": 800
      },
      "heading": "Climate controlled storage",
      "body": "Kansas puts stored belongings through a full annual cycle: humid summers with sustained high heat, hard winter freezes, and sharp swings between them in spring and fall. Humidity is the part people underestimate, since it causes mold, mildew and rust long before the cold does any damage. Availability and pricing are strong across the state. In Wichita, 31 of the 63 facilities offer climate controlled units, priced from around $43 a month for a 5x5. In Overland Park, climate controlled units range from around $37 for a 5x5 to around $902 for a 20x30.",
      "bullets": [
        "Choose climate control for wooden and leather furniture, mattresses, electronics, documents, photographs and instruments.",
        "Lift boxes off the floor on pallets or shelving.",
        "Leave a gap between your belongings and the walls."
      ],
      "links": [
        {
          "label": "Explore climate controlled storage",
          "href": "/climate-controlled-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/storage-guide/vehiclestorage.jpg",
        "alt": "Boat and RV storage spaces",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for RVs, boats and cars",
      "body": "Most Kansas subdivisions restrict keeping trailers, boats and RVs at home, and winter takes them off the water for half the year.",
      "bullets": [
        "Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.",
        "Covered parking. Shade from sustained summer sun and cover from hail and ice.",
        "Enclosed drive-up units. Full protection for classic cars, motorcycles and smaller boats."
      ],
      "links": [
        {
          "label": "Explore RV storage",
          "href": "/rv-storage"
        },
        {
          "label": "Explore boat storage",
          "href": "/boat-storage"
        },
        {
          "label": "Explore car storage",
          "href": "/car-storage"
        }
      ]
    }
  ],
  "sizeHeading": "Size your Kansas unit around what you actually own.",
  "checklistHeading": "Your checklist for picking a Kansas storage unit.",
  "checklist": [
    "Size by your largest item. A sectional sofa, a chest freezer or a mower decides your unit more than the number of boxes.",
    "Decide on climate control. Humidity, not cold, is what damages most stored goods here.",
    "Compare by neighborhood. Within a metro this is usually the biggest saving available.",
    "Check access hours against your routine. Gate hours and office hours are rarely the same.",
    "Check winter access. Ask how the drive and the doors are cleared after snow and ice.",
    "Ask about severe weather. Construction, roof type and drainage matter in this state.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.",
    "Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.",
    "Set up autopay and online access. It removes the most common cause of an unexpected fee.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to Kansas.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1590433136906-733e707e7f25",
    "alt": "Konza Prairie near Manhattan, Kansas"
  },
  "reasons": [
    {
      "heading": "Affordable living",
      "body": "Kansas housing costs sit below the national average, so many families move here for more space for their money."
    },
    {
      "heading": "Kansas City suburbs",
      "body": "Overland Park, Olathe, Lenexa and Shawnee are some of the fastest growing suburbs in the region, with constant movement between homes."
    },
    {
      "heading": "Strong local economy",
      "body": "Aviation in Wichita, healthcare, agriculture and logistics keep people moving into the state and between its cities."
    },
    {
      "heading": "College towns",
      "body": "KU in Lawrence, K-State in Manhattan and Wichita State bring students in each fall and send them home each summer."
    },
    {
      "heading": "Military communities",
      "body": "Fort Riley and McConnell Air Force Base bring frequent moves, and storage covers the gap between postings."
    },
    {
      "heading": "Four real seasons",
      "body": "Hot summers and cold winters mean seasonal gear, holiday decorations and outdoor equipment that need somewhere to go."
    }
  ],
  "faqHeading": "Your Kansas self storage questions, answered.",
  "closingHeading": "Compare Kansas storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function KansasStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
