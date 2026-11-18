import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In Texas Near Your Location | Cheap Storage, Prices And Sizes",
  description: "Find cheap storage units in Texas near your location. Compare 3,707 facilities and 44,477 available units across Houston, San Antonio, Dallas, Austin and Fort Worth, with current monthly prices.",
};

const CITY_LINKS = ["League City", "Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Plano", "Lubbock", "Corpus Christi", "Garland", "Cypress", "Waco", "Round Rock", "Carrollton", "Amarillo", "McKinney", "Irving", "McAllen", "Killeen", "Denton", "Mesquite", "Pasadena", "Midland", "Pearland", "Grand Prairie", "Lewisville", "Brownsville", "Laredo", "Frisco", "Texarkana"];

const PRICE_ROWS = [
  ["5' x 5'", "$14 to $61", "Boxes, bedding, a bike"],
  ["5' x 10'", "$17 to $100", "A single room, tools, garden equipment"],
  ["10' x 10'", "$20 to $155", "A one bedroom apartment"],
  ["10' x 15'", "$40 to $159", "A two bedroom home with appliances"],
  ["10' x 20'", "$44 to $180", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$410 to $803", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in Texas?",
    answer: "A 5x5 typically runs $14 to $61 a month. A 10x10 typically runs $20 to $155. A 10x20 typically runs $44 to $180. The average unit runs around $114 a month in Fort Worth, $130 in San Antonio, $159 in Dallas and $171 in Austin.",
  },
  {
    question: "Where do I find cheap storage units near me in Texas?",
    answer: "Compare by neighborhood rather than by city, since the cheapest area in Austin averages around $101 a month against a citywide $171. Then compare the twelve month cost, ask about waived fees, ask for military, student and senior rates, and reserve online.",
  },
  {
    question: "What are mini storage prices in Texas?",
    answer: "Locker and mini units start from around $14 a month. A 5x5 averages around $30 in Houston, $41 in Austin and $47 in Dallas.",
  },
  {
    question: "How much are storage room prices for a medium unit?",
    answer: "A 10x10 typically runs $20 to $155 a month depending on city and features, and a 10x15 typically runs $40 to $159. Rural markets sit at the bottom of that range and metro markets at the top.",
  },
  {
    question: "What is short term storage and how long is the minimum?",
    answer: "Short term storage covers a few weeks to a few months, usually during a move, a renovation or a summer between leases. Most Texas facilities rent by the month rather than the week, so one month is the usual minimum. Check the notice period, since it can add a month to your total.",
  },
  {
    question: "Do I need climate controlled storage in Texas?",
    answer: "For most belongings, yes. Long summers and Gulf Coast humidity cause warping, mold, mildew and rust in standard units. Tools, bins, lawn equipment and vehicles are usually fine without it.",
  },
  {
    question: "How much is RV storage in Texas?",
    answer: "RV storage averages around $263 a month in both Austin and Dallas, with uncovered parking available from around $23 a month in parts of the state. Boat storage averages around $279 in Dallas and $326 in Austin.",
  },
  {
    question: "Where can I find 24 hour storage in Houston?",
    answer: "Filter your search for 24 hour access. Availability varies by site, and office hours are almost always shorter than gate hours, so confirm both before you reserve.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes and files. A 5x5 holds bedding, boxes and a bike. A 5x10 holds a studio or single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Texas facilities rent month to month with no long term commitment. Weekly rentals are rare.",
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
    answer: "Facilities across Texas prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odor. Drain fuel from mowers, blowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "texas",
  "name": "Texas",
  "key": "tx",
  "heroImage": "https://images.unsplash.com/photo-1588993608283-7f0eda4438be",
  "heroText": "Compare 3,707 facilities and 44,477 available units across Texas, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find cheap storage units in your Texas city",
  "citiesIntro": "Texas has the deepest storage supply in the country, which means the price you pay depends heavily on how carefully you compare. Rates shift between metros, between suburbs and between neighborhoods inside a single city. Start with your city and narrow by radius.",
  "pricingHeading": "How much is a storage unit per month in Texas?",
  "pricingIntro": "The average unit runs around $114 a month in Fort Worth, $130 in San Antonio and Waco, $159 in Dallas and $171 in Austin. Houston prices below all of them on small units. A 5x5 averages around $30 a month in Houston, $41 in Austin and $47 in Dallas. Climate controlled pricing runs from around $41 for a 5x5 in Houston, $56 in Dallas and $61 in Austin.",
  "needsHeading": "Pick Texas storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for Texas families",
      "body": "Texas homes rarely have basements, which puts the whole overflow into the garage. Storage takes it back: holiday decorations, sports equipment, lawn and pool gear, tools, hunting and fishing kit, and furniture you are holding between houses.",
      "bullets": [
        "Clearing the garage: a 5x10 holds seasonal items, tools and sports gear.",
        "Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.",
        "Storm season on the coast: many families move documents, photographs and irreplaceable items inland and above ground level ahead of a storm.",
        "Look for drive up access, ground floor units, and gate hours that suit a weekend load."
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
      "body": "Fort Cavazos, Fort Bliss, Lackland, Fort Sam Houston, Dyess and Sheppard bring households through Texas on orders that rarely line up with lease dates. Storage covers the gap between a move out and a move in, or holds household goods through a deployment.",
      "bullets": [
        "Full household during a posting: a 10x20 holds a three bedroom home.",
        "Partial storage: a 10x10 covers furniture you will not need at the next duty station.",
        "Vehicles: enclosed or covered parking keeps a car protected while you are away.",
        "Look for military rates, month-to-month terms with no penalty for an early move out, autopay so billing runs while you are away, and climate control for anything staying through a Texas summer."
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
      "body": "You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging and returns. Energy and field service crews store equipment between rotations. Event and market traders store stock between weekends. Practices and firms archive files.",
      "bullets": [
        "Inventory and stock: a 10x10 or 10x15 with drive up access and room to load a van.",
        "Tools and equipment: a drive up unit you can back into directly, with 24 hour gate access for early starts.",
        "Records, samples and electronics: a climate controlled 5x10 protects paper and hardware through the summer.",
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
      "body": "Campuses in Austin, College Station, Houston, Lubbock, Denton, Waco and San Marcos empty every summer, and moving a full room across the state twice a year rarely makes sense. A small unit over the break usually costs less than replacing your furniture in August.",
      "bullets": [
        "Dorm or shared apartment: a locker or 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.",
        "Splitting with housemates: a 10x10 covers two rooms and divides the cost.",
        "Look for student rates, a facility close to campus, climate control for anything that would not survive a Texas summer in a metal unit, and month-to-month terms so you stop paying the week you return."
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
      "body": "For most of what you own, yes. Texas summers run long and hot, and the inside of a standard metal unit climbs well above the outside temperature through the afternoon. On the Gulf Coast, humidity adds mold, mildew and rust to the list. Houston alone has 209 facilities offering climate controlled units.",
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
      "body": "Texas carries one of the highest rates of RV and boat ownership in the country, and most HOAs and municipalities restrict keeping them at home.",
      "bullets": [
        "Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs, from around $23 a month in parts of the state.",
        "Covered parking. Shade from sustained Texas sun, which matters for paint, seals, tires and upholstery.",
        "Enclosed drive up units and bays. Full protection for classic cars, motorcycles and larger rigs, with high bay doors available at some sites."
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
  "sizeHeading": "Size your Texas unit around what you actually own.",
  "checklistHeading": "Your checklist for picking a Texas storage unit.",
  "checklist": [
    "Size by your largest item. A sectional sofa, a chest freezer or a mattress decides your unit more than the number of boxes.",
    "Compare by neighborhood. Inside Austin and Dallas this is the single biggest saving available.",
    "Decide on climate control. Texas heat is the deciding factor for anything soft, wooden or electronic.",
    "Check access hours against your routine. Gate hours and office hours are rarely the same.",
    "Check how you will load. Drive up access saves real time on every visit.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.",
    "Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.",
    "Ask about storm preparation on the coast. Elevation, drainage and door construction matter in Houston, Galveston and Corpus Christi.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to Texas.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1588993608283-7f0eda4438be",
    "alt": "Austin, Texas skyline"
  },
  "reasons": [
    {
      "heading": "Jobs across every industry",
      "body": "Energy, tech, healthcare and logistics keep people moving into Texas and between its metros, often before they have found a permanent home."
    },
    {
      "heading": "No state income tax",
      "body": "Texas has no state income tax, which draws families and businesses from across the country."
    },
    {
      "heading": "Room to grow",
      "body": "Newer suburbs around Houston, Dallas, Austin and San Antonio keep expanding, and people often store belongings while they wait on a new build."
    },
    {
      "heading": "Big universities",
      "body": "UT Austin, Texas A&M, Texas Tech and the University of Houston bring students in each fall and send them home each summer."
    },
    {
      "heading": "Outdoor life",
      "body": "Lakes, the Gulf Coast and the Hill Country mean boats, RVs and camping gear, and most HOAs will not let you keep them at home."
    },
    {
      "heading": "Military communities",
      "body": "Fort Hood, Fort Bliss and the San Antonio bases bring frequent moves, and storage covers the gap between postings."
    }
  ],
  "faqHeading": "Your Texas self storage questions, answered.",
  "closingHeading": "Compare Texas storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function TexasStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
