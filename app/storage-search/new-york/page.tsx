import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In New York Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in New York near your location. Compare 878 facilities and 14,766 available units across Manhattan, Brooklyn, Queens, the Bronx, Buffalo and Rochester, with current monthly prices.",
};

const CITY_LINKS = [
  "New York City", "Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island", "Yonkers", "Mount Vernon", "New Rochelle", "White Plains", "Buffalo", "Rochester", "Syracuse", "Albany", "Schenectady", "Troy", "Niagara Falls", "West Seneca", "Penfield", "Henrietta",
];

const PRICE_ROWS = [
  ["Locker or 4' x 4'", "$24 to $119", "A few boxes, files, seasonal clothing"],
  ["5' x 5'", "$56 to $216", "Boxes, bedding, a bike"],
  ["5' x 10'", "$75 to $250", "A studio or a single room"],
  ["10' x 10'", "$115 to $387", "A one bedroom apartment"],
  ["10' x 15'", "$200 to $500", "A two bedroom home with appliances"],
  ["10' x 20'", "$199 to $837", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$622 to $1,805", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much is a storage unit per month in New York?",
    answer: "A 5x5 typically runs $56 to $216 a month. A 10x10 typically runs $115 to $387. A 10x20 typically runs $199 to $837. Upstate and outer borough markets sit at the lower end, Manhattan and inner Brooklyn at the higher end.",
  },
  {
    question: "How much is storage in NYC?",
    answer: "Across New York City, a 5x5 averages around $97 a month and a climate controlled 10x10 averages around $359. Manhattan runs higher, with 5x5 units averaging around $216, while Queens and Staten Island sit well below the city average.",
  },
  {
    question: "What is the smallest storage unit you can rent?",
    answer: "Locker units are the smallest option, often around 4x4 or smaller, reached from an internal corridor. They hold files, boxes, seasonal clothing and sports equipment, and start at around $24 a month in parts of the state.",
  },
  {
    question: "What is mini storage?",
    answer: "Mini storage refers to the smaller unit sizes, typically locker units through to 5x10. It is the most common category in New York, since most renters are storing apartment overflow rather than the contents of a house.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes. A 5x5 holds bedding, boxes and a bike. A 5x10 holds a studio or single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in New York?",
    answer: "Humid summers, freezing winters and coastal salt air all affect stored goods. Choose climate control for furniture, electronics, documents, photographs, instruments and anything staying in the unit beyond a season. Most city facilities are temperature controlled as standard.",
  },
  {
    question: "Do storage units accept deliveries?",
    answer: "Some New York facilities accept packages for tenants and a number offer an on site parcel drop point. Confirm whether deliveries are accepted in your name, whether someone signs for them during office hours, and whether a fee applies.",
  },
  {
    question: "Which New York facilities offer 24 hour access?",
    answer: "Availability varies by site, and multi storey city buildings are less likely to offer it than drive up yards. Filter your search for 24 hour access and check the listed hours, shown in Eastern Time, before you reserve.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most New York facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Do I need insurance on a storage unit in New York?",
    answer: "Most facilities require proof of coverage as a condition of the lease. Check your renters or homeowners policy first, since stored goods are often already covered, then confirm what the facility accepts before buying a separate plan.",
  },
  {
    question: "Are there first month free storage deals in New York?",
    answer: "Many New York operators run a first month free or a discount across the first three months, and some offer student, military and senior rates. Current promotions appear on individual listings.",
  },
  {
    question: "What do I need to bring on move in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across New York prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "new-york",
  "name": "New York",
  "key": "ny",
  "heroImage": "https://images.unsplash.com/photo-1536622638768-9403a9d35a1a",
  "heroText": "Compare 878 facilities and 14,766 available units across New York, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find affordable storage units across New York's boroughs and cities",
  "citiesIntro": "In New York the right unit is usually the one you can reach without a car. Rates shift block by block, and a facility one subway stop further out can cost noticeably less. Start with your city or borough and narrow by radius.",
  "pricingHeading": "How much will a storage unit cost you in New York each month?",
  "pricingIntro": "New York holds the widest price gap in the country between a city unit and an upstate one. The same 5x5 that averages around $56 a month on Staten Island averages around $216 in Manhattan. Across New York City a 5x5 averages around $97, against around $76 in Rochester and $67 in Syracuse.",
  "needsHeading": "Pick New York storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for apartment renters and city households",
      "body": "You are paying some of the highest rent per square foot in the country, which makes storage the cheaper way to hold what you are not using this season. Winter coats and boots, air conditioning units, bikes, strollers, luggage, holiday decorations, and furniture from a previous apartment.",
      "bullets": [
        "A locker or 5x5 handles clothing, sports gear and appliances you swap twice a year.",
        "A 5x10 or 10x10 holds a studio or one bedroom while you move between leases.",
        "Look for a facility within walking distance, lift access, trolleys at the door, and a loading bay."
      ],
      "links": [
        {
          "label": "Find apartment storage in New York",
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
      "body": "You need square footage without signing a commercial lease at New York rates. Online sellers hold inventory, packaging and returns. Contractors store tools between jobs, studios store props and equipment, practices archive files, and market traders store stock between weekends.",
      "bullets": [
        "A 10x10 or 10x15 with lift or ground floor access works for inventory and stock.",
        "A drive-up unit in the outer boroughs or Westchester is usually cheaper than the city core.",
        "Ask whether the facility accepts deliveries in your name if you sell online."
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
      "body": "New York campuses empty on a schedule, and few students want to move a full room twice a year. If you are at a university in the city, at a SUNY campus, or at a college upstate, a small unit over the summer usually costs less than replacing your furniture in September.",
      "bullets": [
        "A locker or 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.",
        "A 10x10 can cover two rooms when split with housemates.",
        "Look for student rates near campus or a subway line, plus month-to-month terms."
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
        "src": "/images/state%20pages/long%20island.jpg",
        "alt": "Garage storage unit packed with seasonal gear and furniture",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for Long Island, Westchester and upstate households",
      "body": "Outside the city the use case changes. You have a garage, a driveway and a basement, and you are storing seasonal equipment rather than everyday overflow: snow blowers, patio furniture, lawn equipment, camping and lake gear, and furniture held between houses.",
      "bullets": [
        "A 10x10 or 10x15 with drive-up access lets you load straight from the truck.",
        "A 10x20 holds a three bedroom home between moves.",
        "Look for ploughed and gritted drives through winter."
      ],
      "links": [
        {
          "label": "Find drive-up storage in New York",
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
      "body": "New York runs humid summers and long freezing winters, and coastal areas add salt air. The combination is harder on stored belongings than either extreme alone, which is why most city facilities are indoor and temperature controlled as standard.",
      "bullets": [
        "Choose climate control for wood and leather furniture, electronics, documents, photographs and instruments.",
        "Protect anything metal near the coast, where salt air speeds up corrosion.",
        "Lift boxes off the floor and leave a gap at the walls."
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
      "heading": "Storage for cars, boats and RVs",
      "body": "Street parking rules, alternate side regulations and winter weather push vehicles into storage in New York. Enclosed units and indoor parking suit cars and motorcycles in the city, while Long Island and upstate offer outdoor and covered spaces for trailers, boats and RVs.",
      "bullets": [
        "Spaces range from 20 to 45 feet, so confirm the maximum length.",
        "Covered parking protects against snow load through winter.",
        "Ask whether current registration and insurance are required."
      ],
      "links": [
        {
          "label": "Explore car storage",
          "href": "/car-storage"
        },
        {
          "label": "Explore boat storage",
          "href": "/boat-storage"
        },
        {
          "label": "Explore RV storage",
          "href": "/rv-storage"
        }
      ]
    }
  ],
  "sizeHeading": "Fit your New York apartment into the right unit size.",
  "checklistHeading": "Your checklist for picking a New York storage unit.",
  "checklist": [
    "Size by your largest item. A mattress, a sofa or a bike frame decides your unit more than the number of boxes.",
    "Price the small end properly. Compare the locker option against the 5x5 before you default to the larger unit.",
    "Set your radius deliberately. One stop further out is usually the biggest saving on the table.",
    "Check how you will get there. If you have no car, the walk from the subway with a load matters more than the monthly rate.",
    "Check the loading route. Lift capacity, trolleys and distance from the door decide how long every visit takes.",
    "Check access hours against your routine. City sites often close earlier than drive-up yards.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs.",
    "Confirm insurance. Check your renters or homeowners policy first.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to New York.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1536622638768-9403a9d35a1a",
    "alt": "New York City skyline"
  },
  "reasons": [
    {
      "heading": "The energy of the city",
      "body": "Broadway, world famous museums and restaurants on every block keep people coming to New York City. Apartments here are compact, so every square foot counts."
    },
    {
      "heading": "A career hub",
      "body": "Finance, media, fashion and tech draw talent to Manhattan and Brooklyn. Job changes and lease turnovers make flexible storage useful."
    },
    {
      "heading": "Weekends beyond the city",
      "body": "The Hudson Valley, the Finger Lakes, the Adirondacks and the Long Island beaches give you room to breathe. Kayaks, bikes and beach gear need somewhere to go in winter."
    },
    {
      "heading": "Colleges and universities",
      "body": "NYU, Columbia, Cornell, the SUNY campuses and many more fill up each fall. Summer storage saves you hauling a full room of furniture home."
    },
    {
      "heading": "More space upstate",
      "body": "Buffalo, Rochester, Syracuse and Albany offer more home for the money, and many people relocate there from downstate."
    },
    {
      "heading": "Four real seasons",
      "body": "Snowy winters and warm summers mean coats, air conditioners and patio furniture rotate in and out of storage every year."
    }
  ],
  "faqHeading": "Your New York self storage questions, answered.",
  "closingHeading": "Compare New York storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function NewYorkStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
