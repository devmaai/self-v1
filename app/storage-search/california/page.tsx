import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In California Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in California near your location. Compare 3,098 facilities and 41,949 available units across Los Angeles, San Diego, San Jose, Sacramento and San Francisco, with current monthly prices.",
};

const CITY_LINKS = [
  "Los Angeles", "San Diego", "San Jose", "San Francisco", "Sacramento", "Fresno", "Long Beach", "Oakland", "Bakersfield", "Anaheim", "Stockton", "Riverside", "Santa Ana", "Irvine", "Chula Vista", "Santa Clarita", "Fremont", "San Bernardino", "Modesto", "Fontana",
];

const PRICE_ROWS = [
  ["5' x 5'", "$50 to $121", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$75 to $160", "A single room, bikes, tools"],
  ["10' x 10'", "$138 to $359", "A one bedroom apartment"],
  ["10' x 15'", "$200 to $450", "A two bedroom home with appliances"],
  ["10' x 20'", "$297 to $500", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$506 to $1,500", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in California?",
    answer: "A 5x5 typically runs $50 to $121 a month. A 10x10 typically runs $138 to $359. A 10x20 typically runs $297 to $500. Inland and valley markets sit at the lower end, coastal and urban markets at the higher end.",
  },
  {
    question: "How much does it cost to rent a small storage unit?",
    answer: "A 5x5 averages around $64 a month in Sacramento and around $108 in San Diego, which gives you the range across the state. A 5x10 typically runs $75 to $160.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours, and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding, and seasonal gear. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in California?",
    answer: "It depends on your region. Coastal humidity and salt air, valley and desert heat, and Sierra freeze cycles all affect stored goods differently. Choose climate control for furniture, electronics, documents, photographs, instruments, and anything staying in the unit beyond a season.",
  },
  {
    question: "Which California facilities offer 24 hour access?",
    answer: "Availability varies by city and by site, and urban multi storey facilities are less likely to offer it than drive up yards. Filter your search for 24 hour access and check the listed gate hours, shown in Pacific Time, before you reserve.",
  },
  {
    question: "What time do storage facilities close?",
    answer: "Gate hours commonly run from six or seven in the morning until nine or ten at night, with shorter hours at staffed offices and on public holidays. Confirm both gate hours and office hours, since they often differ.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most California facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Are there first month free storage deals in California?",
    answer: "Many California operators run a first month free offer or a discount across the first three months, and some offer student, military, and senior rates. Current promotions appear on individual listings.",
  },
  {
    question: "Can I store an RV, boat, or car in California?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking, and enclosed units. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, since stored goods are often already covered, then ask what the facility accepts.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across California prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks, and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "california",
  "name": "California",
  "key": "ca",
  "heroImage": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
  "heroText": "Compare 3,098 facilities and 41,949 available units across California, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find cheap storage units in your favorite Californian cities",
  "citiesIntro": "Rates in California change by neighbourhood, not just by city. A unit ten minutes inland can cost half what you pay near the coast. Start with your city and narrow by radius from there.",
  "pricingHeading": "How much will a storage unit cost you in California each month?",
  "pricingIntro": "California has the widest price spread of any state. Small units start under $20 a month in Oakland, Rancho Cucamonga, Santa Rosa, and Huntington Beach. The same unit can run five times that in San Francisco, coastal Orange County, or Santa Barbara. A standard 5x5 averages around $64 a month in Sacramento and around $108 in San Diego.",
  "needsHeading": "Pick California storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for California families",
      "body": "Square footage at home costs more here than almost anywhere in the country, which makes a storage unit the cheaper way to hold what you are not using. Families rent while they remodel, while they wait on a closing date, or to clear a garage back into a garage. Add the gear that comes with the state: surfboards, camping kit for the Sierras, and skis for Tahoe and Mammoth.",
      "bullets": [
        "A 5x10 holds seasonal gear, holiday decorations, and sports equipment.",
        "A 10x15 holds a two bedroom home with appliances, while a 10x20 holds a three bedroom home.",
        "Look for ground floor or drive-up access, wide aisles, and gate hours that suit a weekend load out."
      ],
      "links": [
        {
          "label": "Find family storage in California",
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
      "heading": "Storage for professionals and small businesses",
      "body": "You need square footage without a commercial lease at California rates. Contractors store tools and materials between jobs. Online sellers hold inventory, packaging, and returns. Studios and production crews store props and equipment between shoots, agents store staging furniture, and practices archive files.",
      "bullets": [
        "A 10x10 or 10x15 with ground-floor access works for inventory and stock.",
        "A drive-up unit lets you back a truck or van into the space.",
        "A climate-controlled 5x10 protects paper and hardware through valley summers."
      ],
      "links": [
        {
          "label": "Explore business storage",
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
      "body": "California campuses empty on a schedule. If you are at a UC, a Cal State, or a community college, you have a gap between spring quarter and autumn move-in, and hauling a room across the state twice a year rarely makes sense.",
      "bullets": [
        "A 5x5 takes boxes, bedding, and a bike. A 5x10 takes a full room including a mattress and desk.",
        "A 10x10 can cover two rooms when split with housemates.",
        "Look for student rates near Los Angeles, San Diego, Berkeley, Davis, Irvine, Santa Barbara or San Luis Obispo, plus month-to-month terms."
      ],
      "links": [
        {
          "label": "Explore student storage",
          "href": "/student-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/state%20pages/military%20storage.jpg",
        "alt": "Military family packing a storage unit during a move",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for military households and frequent movers",
      "body": "California hosts major installations in San Diego, Oceanside, Ventura County, Monterey, and the Inland Empire, and orders rarely line up neatly with lease dates. Storage covers the gap between a move-out and a move-in, or holds household goods through a deployment.",
      "bullets": [
        "A 10x20 holds a three bedroom home during a posting.",
        "A 10x10 covers furniture you will not need at the next duty station.",
        "Look for military rates, month-to-month terms, and autopay so billing runs while you are away."
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
        "src": "/images/climate-storage/indoor-corridor.png",
        "alt": "Indoor climate controlled storage corridor",
        "width": 1200,
        "height": 800
      },
      "heading": "Climate controlled storage",
      "body": "California is several climates at once. Salt air and humidity hit coastal units, summer heat bakes the Central Valley and inland markets, desert heat cracks leather and wood, and Sierra freeze cycles affect liquids and batteries.",
      "bullets": [
        "Choose climate control for wood and leather furniture, electronics, documents, photographs and instruments.",
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
      "body": "Many California cities restrict oversized vehicle parking on residential streets, and HOA rules often go further. Facilities across the state offer uncovered parking, covered parking, and enclosed drive-up units.",
      "bullets": [
        "Spaces range from 20 to 45 feet, so confirm the maximum length.",
        "Covered parking protects paint, seals, and tyres from sustained summer sun.",
        "Ask whether current registration and insurance are required."
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
  "sizeHeading": "Size your California unit around what you actually own.",
  "checklistHeading": "Your checklist for picking a California storage unit.",
  "checklist": [
    "Size by your largest item. A sectional sofa or chest freezer decides your unit more than the number of boxes.",
    "Decide on climate control. Base it on your region, what you are storing, and how long it stays.",
    "Set your radius deliberately. In California the drive inland is usually the single biggest saving available to you.",
    "Check access hours against your routine. Urban sites often close earlier than you expect.",
    "Check how you will actually load. Elevator, trolley distance, and loading bay access decide how long each visit takes.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs.",
    "Confirm insurance. Check your renters or homeowners policy first.",
    "Ask about the lock. Many operators specify a type.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to California.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
    "alt": "California coastline"
  },
  "reasons": [
    {
      "heading": "The coast and the climate",
      "body": "More than 800 miles of coastline and mild weather across much of the state draw people from everywhere. Smaller coastal homes often mean less closet space."
    },
    {
      "heading": "Career opportunities",
      "body": "Tech in the Bay Area, entertainment in Los Angeles and agriculture in the Central Valley keep people moving into and around the state."
    },
    {
      "heading": "Every landscape in one state",
      "body": "Beaches, deserts, redwood forests and the Sierra Nevada are all within driving distance. Surfboards, ski gear and camping kit add up quickly."
    },
    {
      "heading": "World class universities",
      "body": "The UC campuses, Stanford and USC bring students in each fall and send them home each summer. Short term storage bridges the gap."
    },
    {
      "heading": "Food and culture from around the world",
      "body": "Neighborhoods from San Diego to Sacramento each have their own character, so many people move between cities before they find their fit."
    },
    {
      "heading": "Smaller homes, bigger lives",
      "body": "High housing costs mean many Californians live in apartments and condos. A storage unit gives you room for everything that does not fit at home."
    }
  ],
  "faqHeading": "Your California self storage questions, answered.",
  "closingHeading": "Compare California storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function CaliforniaStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
