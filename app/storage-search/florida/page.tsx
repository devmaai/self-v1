import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Find Storage Units In Florida Near Your Location | Prices, Sizes And Availability",
  description: "Find storage units in Florida near your location. Compare 2,526 facilities and 41,123 available units across Miami, Jacksonville, Tampa, Orlando and Fort Lauderdale, with current monthly prices.",
};

const CITY_LINKS = ["Miami", "Jacksonville", "Tampa", "Orlando", "Fort Lauderdale", "St. Petersburg", "Cape Coral", "Pompano Beach", "Lakeland", "West Palm Beach", "Port St. Lucie", "Tallahassee", "Palm Bay", "Clearwater", "Lake Worth", "Brandon", "Hialeah", "Davie", "Boca Raton", "Pembroke Pines", "Spring Hill", "Hollywood", "Miami Gardens", "Riverview", "Miramar", "Palm Coast", "Coral Springs", "Plantation", "Saint Cloud", "Gainesville", "Pensacola"];

const PRICE_ROWS = [
  ["5' x 5'", "$22 to $95", "Boxes, bedding, seasonal gear"],
  ["5' x 10'", "$35 to $120", "A single room, bikes, tools"],
  ["10' x 10'", "$65 to $275", "A one bedroom apartment"],
  ["10' x 15'", "$120 to $300", "A two bedroom home with appliances"],
  ["10' x 20'", "$129 to $500", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$364 to $642", "A four bedroom home or commercial stock"],
];

const FAQS = [
  {
    question: "How much does it cost to rent a storage space in Florida?",
    answer: "A 5x5 typically runs $22 to $95 a month. A 10x10 typically runs $65 to $275. A 10x20 typically runs $129 to $500. Inland and central Florida markets sit at the lower end, coastal South Florida at the higher end.",
  },
  {
    question: "How much is a small storage unit in Florida?",
    answer: "A 5x5 averages around $22 a month in North Port, around $42 in Orlando and around $48 in Cape Coral. Coastal South Florida runs higher. A 5x10 typically runs $35 to $120.",
  },
  {
    question: "What storage has no deposit near me?",
    answer: "Many Florida facilities rent with no security deposit, and administration fees are frequently waived during promotions. Filter for no deposit listings, then confirm the administration fee, lock cost and insurance requirement before you reserve.",
  },
  {
    question: "How do I find cheap storage units in Florida?",
    answer: "Compare the twelve month cost rather than the first month, extend your search inland, book outside peak season, ask about waived administration fees, ask for student, military and senior rates, and reserve online rather than at the counter.",
  },
  {
    question: "Can I go to my storage unit anytime?",
    answer: "Some Florida facilities offer 24 hour gate access, others run limited gate hours, and office hours are almost always shorter. Filter for 24 hour access and confirm both sets of hours before you reserve.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding and seasonal gear. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Do I need climate controlled storage in Florida?",
    answer: "For most belongings, yes. Heat, humidity and coastal salt air cause mold, mildew, rust and warping in standard units. Climate control is the default across much of the Florida market rather than an upgrade.",
  },
  {
    question: "How do I choose self storage in Florida for seasonal use?",
    answer: "Choose climate control, set up autopay, keep the lease month to month, ask how the facility handles storm season, confirm your insurance covers an unoccupied unit, and photograph your contents before you leave.",
  },
  {
    question: "Why is storage insurance important in Florida?",
    answer: "Humidity and heat cause slow damage, storm season causes sudden damage, and an unattended unit is exposed to both. Check what your own policy covers, what is excluded, and how the facility plan compares before you buy either.",
  },
  {
    question: "Can I store a boat, RV or car in Florida?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking and enclosed units. In Orlando, car storage averages around $166 a month, boat storage around $223 and RV storage around $227. Confirm the maximum permitted length and whether registration and insurance are required.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Florida facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "What do I need to bring on move-in day?",
    answer: "A valid photo ID, a payment method, and a lock if the facility does not supply one. Bring proof of insurance if it is required.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across Florida prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odor. Drain fuel from mowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  ...{
  "slug": "florida",
  "name": "Florida",
  "key": "fl",
  "heroImage": "https://images.unsplash.com/photo-1512936702668-1ab037aced2a",
  "heroText": "Compare 2,526 facilities and 41,123 available units across Florida, with current prices, sizes, and amenities near your location.",
  "citiesHeading": "Find cheap storage units in your Florida city",
  "citiesIntro": "Florida rates move with the season and with the coast. A facility a few miles inland often costs noticeably less than one near the water. Start with your city and narrow by radius from there.",
  "pricingHeading": "How much does it cost to rent a storage space in Florida?",
  "pricingIntro": "Florida sits below the national average on most unit sizes, though coastal South Florida runs well above the rest of the state. Small units start under $10 a month on promotional rates in Pompano Beach, Boca Raton, Port St. Lucie and Cape Coral.",
  "needsHeading": "Pick Florida storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/seasonal%20residents.jpg",
        "alt": "Storage unit packed with beach gear, surfboard, bikes, and holiday decorations for a seasonal resident",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for seasonal residents and snowbirds",
      "body": "You are here for part of the year and away for the rest. Storage lets you keep a vehicle, golf clubs, bikes, beach gear and furniture in Florida rather than hauling them back and forth, and it lets you downsize the rental you take.",
      "bullets": [
        "Household goods between seasons: a 10x10 holds the contents of a one bedroom condo.",
        "Vehicle and gear: enclosed or covered parking plus a 5x10 covers a car and everything that goes with it.",
        "Look for climate control, autopay, month to month terms and a facility you can reach easily from the airport or the interstate."
      ],
      "links": [
        {
          "label": "Find seasonal storage near you",
          "href": "/find-storage"
        }
      ]
    },
    {
      "image": {
        "src": "/images/state%20pages/storage%20for%20family.jpg",
        "alt": "Family moving boxes into a storage unit",
        "width": 980,
        "height": 653
      },
      "heading": "Storage for Florida families",
      "body": "Florida homes often come without basements or attics, which leaves the garage doing the work. Storage takes the overflow: holiday decorations, sports equipment, outgrown furniture, tools and the boxes you have moved twice without opening.",
      "bullets": [
        "Clearing the garage: a 5x10 holds seasonal items and sports gear.",
        "Remodelling or between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.",
        "Storm season preparation: many families use a unit to move valuables and documents somewhere secure and inland ahead of a storm.",
        "Look for drive up access, climate control for anything soft or wooden, and gate hours that suit a weekend load."
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
        "src": "/images/state%20pages/proff%20and%20small%20business.jpg",
        "alt": "Business owner organizing inventory in a storage unit",
        "width": 640,
        "height": 640
      },
      "heading": "Professionals and small businesses",
      "body": "You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory and packaging. Boat and marine services store parts. Seasonal traders and event businesses store stock and equipment between runs.",
      "bullets": [
        "Inventory and stock: a 10x10 or 10x15 with ground floor access and room to load a van.",
        "Tools and equipment: a drive up unit you can back into directly.",
        "Records, samples and electronics: a climate controlled 5x10 protects paper and hardware through the summer.",
        "Look for month to month terms, online payment and invoicing, and access hours that cover early starts."
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
      "body": "Florida campuses empty every summer, and moving a full room home twice a year rarely makes sense. If you are in Gainesville, Tallahassee, Orlando, Tampa, Boca Raton or Miami, a small unit over the break usually costs less than replacing your furniture in August.",
      "bullets": [
        "Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.",
        "Splitting with housemates: a 10x10 covers two rooms and divides the cost.",
        "Look for student rates, a facility close to campus, climate control for anything you care about, and month to month terms so you stop paying the week you return."
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
      "body": "In most of Florida, yes, for most of what you own. Sustained heat, year round humidity and coastal salt air combine to produce mold, mildew, rust and warping in a standard unit far faster than in a drier state. This is why climate controlled units are the default across much of the market rather than an upgrade.",
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
      "body": "Florida has one of the highest rates of boat and RV ownership in the country, and HOA and municipal rules routinely prohibit keeping them at home.",
      "bullets": [
        "Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.",
        "Covered parking. Shade from sustained sun, which matters here for gelcoat, seals, upholstery and tires.",
        "Enclosed drive up units. Full protection for classic cars, motorcycles and smaller boats."
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
  "sizeHeading": "Size your Florida unit around what you actually own.",
  "checklistHeading": "Your checklist for picking a Florida storage unit.",
  "checklist": [
    "Size by your largest item. A sectional sofa or chest freezer decides your unit more than the number of boxes.",
    "Choose climate control without exception. Anything left through a Florida summer unconditioned is exposed to heat and humidity for months with nobody checking on it.",
    "Set up autopay. Missed payments while you are away carry late fees and, eventually, lien consequences.",
    "Confirm the lease runs month to month. You want the freedom to close the unit the season you stop coming down.",
    "Ask how the facility handles storm season. Roof and door construction, drainage, flood zone and elevation all matter for a unit standing unattended from June through November.",
    "Check your insurance covers an unoccupied unit. Ask specifically about wind and water damage, which are commonly excluded from standard policies.",
    "Pick ground floor or drive up. It saves you time at both ends of the season.",
    "Store smart. Lift everything off the floor on pallets, cover furniture with breathable sheeting rather than plastic, and leave a gap at the walls for airflow.",
    "Photograph everything before you leave. An inventory with photographs makes any future claim straightforward."
  ],
  "reasonsHeading": "Reasons to move to Florida.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1512936702668-1ab037aced2a",
    "alt": "South Beach in Miami Beach, Florida"
  },
  "reasons": [
    {
      "heading": "Beaches and warm weather",
      "body": "More than 1,300 miles of coastline and mild winters draw people from across the country. Beach gear, bikes and boats all need somewhere to go."
    },
    {
      "heading": "No state income tax",
      "body": "Florida has no state income tax, which brings retirees, remote workers and families into the state every year."
    },
    {
      "heading": "Seasonal living",
      "body": "Snowbirds split the year between Florida and somewhere colder, and storage holds what they leave behind between seasons."
    },
    {
      "heading": "Growing job market",
      "body": "Healthcare, tourism, logistics and aerospace keep people moving to and around the state, often before they have found a permanent home."
    },
    {
      "heading": "Big universities",
      "body": "The University of Florida, Florida State, UCF, USF and FIU bring students in each fall and send them home each summer."
    },
    {
      "heading": "Homes without basements",
      "body": "Most Florida homes have no basement or attic space, so the garage fills up fast. A storage unit takes the overflow."
    }
  ],
  "faqHeading": "Your Florida self storage questions, answered.",
  "closingHeading": "Compare Florida storage units near you now."
},
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function FloridaStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
