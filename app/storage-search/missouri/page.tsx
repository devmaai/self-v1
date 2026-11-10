import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In Missouri Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Missouri near your location. Compare 617 facilities and 6,545 available units across Kansas City, St. Louis, Springfield, St. Charles and Independence, with current monthly prices.",
};

const CITY_LINKS = [
  "Kansas City", "St. Louis", "Springfield", "St. Charles", "Independence", "O'Fallon", "Lee's Summit", "St. Peters", "Blue Springs", "Florissant", "Chesterfield", "Wentzville", "Ballwin", "Liberty", "Lake St. Louis", "Kirkwood", "Fenton", "Raytown", "Maryland Heights", "Gladstone",
];

const PRICE_ROWS = [
  ["Locker", "$23 to $49", "A few boxes, files, seasonal clothing"],
  ["5' x 5'", "$23 to $67", "Boxes, bedding, a bike"],
  ["5' x 10'", "$45 to $90", "A single room, tools, garden equipment"],
  ["10' x 10'", "$59 to $135", "A one bedroom apartment"],
  ["10' x 15'", "$93 to $172", "A two bedroom home with appliances"],
  ["10' x 20'", "$90 to $293", "A three bedroom home or a vehicle"],
  ["10' x 30' and larger", "$259 to $472", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much does a storage unit cost in Missouri?",
    answer: "A 5x5 typically runs $23 to $67 a month. A 10x10 typically runs $59 to $135. A 10x20 typically runs $90 to $293. The average unit of any size runs around $123 a month in Independence, $127 in Springfield, $135 in Kansas City, and $153 in St. Louis.",
  },
  {
    question: "How much is a small storage unit in Missouri?",
    answer: "Locker units start at around $23 a month. A 5x5 typically runs $23 to $67, and a 5x10 typically runs $45 to $90, depending on city, climate control, and access.",
  },
  {
    question: "How do I find storage units near my location?",
    answer: "Enter your ZIP code or allow location access, then set a search radius. You will see every available unit within that radius with size, monthly rate, access hours, and features, so you can compare before visiting.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A locker holds a few boxes and files. A 5x5 holds bedding, boxes, and a bike. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Missouri?",
    answer: "Humid summers and freezing winters make climate control worthwhile for furniture, electronics, documents, photographs, instruments, mattresses, and clothing. Tools, bins, lawn equipment, and vehicles are usually fine in a standard drive-up unit.",
  },
  {
    question: "Can I go to my storage unit anytime?",
    answer: "Some Missouri facilities offer 24 hour gate access, others run limited gate hours, and office hours are almost always shorter than gate hours. Filter for 24 hour access and confirm both sets of hours before you reserve.",
  },
  {
    question: "Can I pay my storage rent online?",
    answer: "Most Missouri facilities accept online payment and offer autopay, and many allow you to reserve and sign online before your first visit. Filter for online payment if you would rather not handle billing in person.",
  },
  {
    question: "How do I find cheap storage units in Missouri?",
    answer: "Compare the twelve month cost rather than the first month, check the next suburb out, ask about waived administration fees and deposits, ask for student, military, and senior rates, and reserve online rather than at the counter.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Missouri facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Can I store a boat, RV, or car in Missouri?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking, and enclosed units, with heavy demand around the lake regions through winter. Confirm the maximum permitted length and whether registration and insurance are required.",
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
    answer: "Facilities across Missouri prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks, and anything that generates odour. Drain fuel from mowers, blowers, and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "missouri",
  "name": "Missouri",
  "key": "mo",
  "heroImage": "https://images.unsplash.com/photo-1675906798386-a9ed241c7ed2",
  "heroText": "Compare 617 facilities and 6,545 available units across Missouri, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find cheap storage units in your favorite Missouri cities",
  "citiesIntro": "Missouri rates vary by suburb as much as by city, and the difference between two facilities ten minutes apart is often significant. Start with your city and narrow by radius from there.",
  "pricingHeading": "How much will a storage unit cost you in Missouri each month?",
  "pricingIntro": "Missouri sits below the national average across most unit sizes. Small units start at around $8 to $12 a month on promotional rates in St. Louis, St. Peters, and Lake St. Louis. The average unit of any size runs around $123 a month in Independence, $127 in Springfield, $135 in Kansas City, and $153 in St. Louis.",
  "needsHeading": "Pick Missouri storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for Missouri families",
      "body": "Missouri households run four distinct seasons of equipment, and most homes fill the basement and garage long before they run out of things to keep. Storage takes the overflow: patio furniture and mowers through winter, snow blowers and holiday decorations through summer, sports equipment, tools, and furniture held between houses.",
      "bullets": [
        "A 5x10 holds seasonal items, tools, and sports gear.",
        "A 10x15 holds a two bedroom home with appliances, while a 10x20 holds a three bedroom home.",
        "Look for drive-up access, ground floor units, and drives cleared through winter."
      ],
      "links": [
        {
          "label": "Find family storage in Missouri",
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
      "body": "You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging, and returns. Landscaping and seasonal services store equipment out of season, while practices and firms archive files.",
      "bullets": [
        "A 10x10 or 10x15 with drive-up access works for inventory and stock.",
        "A drive-up unit with 24 hour gate access suits early starts.",
        "A climate-controlled 5x10 protects paper and hardware through humid summers."
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
      "body": "Missouri campuses empty every summer, and moving a full room home twice a year rarely makes sense. If you are in Columbia, Springfield, St. Louis, Kansas City, Rolla, or Warrensburg, a small unit over the break usually costs less than replacing your furniture in August.",
      "bullets": [
        "A locker or 5x5 takes boxes, bedding, and a bike. A 5x10 takes a full room including a mattress and desk.",
        "A 10x10 can cover two rooms when split with housemates.",
        "Look for student rates near campus and month-to-month terms."
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
        "src": "/images/climate-storage/indoor-corridor.png",
        "alt": "Indoor climate controlled storage corridor",
        "width": 1200,
        "height": 800
      },
      "heading": "Climate controlled storage",
      "body": "Missouri puts stored belongings through a full annual cycle. Summers run hot and humid, winters drop well below freezing, and humidity causes mould, mildew, and rust in a standard unit long before the cold does any damage.",
      "bullets": [
        "Choose climate control for wood and leather furniture, mattresses, electronics, documents and instruments.",
        "Use breathable covers rather than sealed plastic.",
        "Lift boxes off the floor and leave a gap at the walls so air can move."
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
      "heading": "Storage for boats, RVs and cars",
      "body": "Between the Lake of the Ozarks, Table Rock, Truman Lake, and the rivers, Missouri has a high rate of boat and trailer ownership, and most subdivisions restrict keeping them at home. Winter takes them off the water for roughly half the year.",
      "bullets": [
        "Book covered or enclosed parking for boats and trailers from October through April.",
        "Choose outdoor parking sized to length for RVs and campers.",
        "Check gate width and turning space, and confirm the maximum length."
      ],
      "links": [
        {
          "label": "Explore boat storage",
          "href": "/boat-storage"
        },
        {
          "label": "Explore RV storage",
          "href": "/rv-storage"
        },
        {
          "label": "Explore car storage",
          "href": "/car-storage"
        }
      ]
    }
  ],
  "sizeHeading": "Pick a Missouri unit size that fits your load.",
  "checklistHeading": "Your checklist for picking a Missouri storage unit.",
  "checklist": [
    "Size by your largest item. A sectional sofa, a chest freezer, or a mower decides your unit more than the number of boxes.",
    "Price the small end properly. Compare the locker against the 5x5 before you default to the larger unit.",
    "Decide on climate control. Humidity, not cold, is what damages most stored goods here.",
    "Check the next suburb out. It is usually the biggest saving on the table.",
    "Check access hours against your routine. Gate hours and office hours are rarely the same.",
    "Check winter access. Ask how the drive and the doors are cleared after snow.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs.",
    "Confirm insurance. Check your renters or homeowners policy first.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to Missouri.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1675906798386-a9ed241c7ed2",
    "alt": "Missouri landscape"
  },
  "reasons": [
    {
      "heading": "Two great cities",
      "body": "Kansas City is known for barbecue and jazz, and St. Louis for the Gateway Arch and its historic neighborhoods. Both give you big city amenities at a lower cost of living."
    },
    {
      "heading": "Affordable living",
      "body": "Housing in Missouri often costs less than the national average, so you get more home for the money, and storage prices tend to follow."
    },
    {
      "heading": "The Ozarks and the lakes",
      "body": "Lake of the Ozarks and Table Rock Lake draw boaters and anglers every summer. Covered boat and RV storage protects your gear in the off season."
    },
    {
      "heading": "Right in the middle",
      "body": "A central location makes Missouri a natural base for road trips and for small businesses that ship across the country."
    },
    {
      "heading": "Universities and colleges",
      "body": "Mizzou in Columbia, Washington University and Saint Louis University fill up each fall, and students need a place for their things over the summer."
    },
    {
      "heading": "Four distinct seasons",
      "body": "Humid summers and cold winters mean seasonal gear rotates through the year. Climate controlled storage protects furniture and electronics from the swings."
    }
  ],
  "faqHeading": "Your Missouri self storage questions, answered.",
  "closingHeading": "Compare Missouri storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function MissouriStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
