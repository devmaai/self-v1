import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";
import { getStorageRows, priceNumber } from "@/lib/liveStorageData";

// Next.js requires a literal number here for its static route-segment-config
// analysis — it cannot be an imported constant. Keep in sync with
// STORAGE_DATA_REVALIDATE in lib/liveStorageData.ts.
export const revalidate = 604800;

export const metadata: Metadata = {
  title: "Cheap Self Storage in New Jersey | Compare Units & Prices by City",
  description: "Compare cheap self storage across New Jersey. See live unit sizes, move-in prices and availability by city, from Jersey City to the shore and South Jersey.",
};

const CITY_LINKS = [
  "Jersey City", "Union City", "Atlantic City", "Neptune City", "Gloucester City", "Ocean City",
];

const SIZE_TABLE = [
  { size: "5' x 5'", holds: "Boxes, bedding, seasonal gear" },
  { size: "5' x 10'", holds: "A studio or a single bedroom" },
  { size: "10' x 10'", holds: "A one bedroom apartment" },
  { size: "10' x 15'", holds: "A two or three bedroom home" },
  { size: "10' x 20'", holds: "A full household or a vehicle" },
];

const FAQS = [
  {
    question: "How much does a storage unit cost in New Jersey?",
    answer: "Live move-in prices across the state start from {{from_price}}. New Jersey prices above the national average, with Hudson County highest, the shore counties peaking seasonally, and South Jersey the most affordable part of the state.",
  },
  {
    question: "Which part of New Jersey has the cheapest storage?",
    answer: "South Jersey generally offers the lowest rates, particularly across Camden, Gloucester, Burlington and Salem counties. Inland sites away from the shore and away from the Hudson County waterfront are consistently cheaper than comparable units nearer either.",
  },
  {
    question: "Is storage cheaper in New Jersey than New York City?",
    answer: "Usually yes, which is why many New York residents store on this side of the river. Jersey City and Union City still carry New Jersey's highest rates, so looking further toward Bayonne, Secaucus or North Bergen lowers the figure again for the same unit size.",
  },
  {
    question: "Do I need climate controlled storage in New Jersey?",
    answer: "For furniture, clothing, mattresses, books, documents, electronics and anything upholstered, yes. Humid summers, cold winters and coastal salt air all cause mildew, warping and corrosion. Tools, plastic totes, garden equipment and sports gear are fine in a standard unit.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds a large closet worth of contents. A 5x10 fits a studio or a bedroom set. A 10x10 covers a one bedroom apartment. A 10x15 handles a two or three bedroom home. A 10x20 takes a full household or a vehicle.",
  },
  {
    question: "When are storage prices lowest in New Jersey?",
    answer: "Demand peaks from late May through August with the moving season and the shore season, and eases from November through February. A late autumn or winter booking usually secures a lower ongoing monthly rate for the same unit.",
  },
  {
    question: "Can I rent a storage unit month to month in New Jersey?",
    answer: "Most facilities across the state rent month to month with no long term contract. Confirm the move-out notice period before you sign, since many require ten to fourteen days written notice and late notice generally means paying for another month.",
  },
  {
    question: "Can I store a car, boat or RV in New Jersey?",
    answer: "Yes. Outdoor parking is easier to find away from the dense northern towns, particularly in South Jersey and the inland shore counties, and it is priced by length rather than unit size. Measure including the trailer tongue and outboard before booking.",
  },
];

function fillPrice(text: string, fromPrice: string) {
  return text.replace(/\{\{from_price\}\}/g, fromPrice);
}

function priceRange(prices: number[]): [number, number] | null {
  if (!prices.length) return null;
  const sorted = [...prices].sort((first, second) => first - second);
  const low = sorted[Math.floor(sorted.length * 0.1)] ?? sorted[0];
  const high = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.9))];
  return [Math.round(low), Math.round(high)];
}

const CONTENT: Omit<StatePageData, "heroText" | "pricingIntro" | "priceRows" | "faqs" | "cities"> = {
  "slug": "new-jersey",
  "name": "New Jersey",
  "key": "nj",
  "heroImage": "https://images.unsplash.com/photo-1619890725056-bf09c53854cb",
  "citiesHeading": "Find cheap storage units in your New Jersey city",
  "citiesIntro": "Start with your own town, then check one or two neighboring markets before booking. In a state this compact, a fifteen minute drive regularly changes the monthly rate for an identical unit.",
  "pricingHeading": "How much does self storage cost in New Jersey?",
  "needsHeading": "Pick New Jersey storage near you that fits your need.",
  "needs": [
    {
      "image": {
        "src": "/images/state%20pages/seasonal%20residents.jpg",
        "alt": "Storage unit packed with beach gear and seasonal furnishings for a Jersey Shore rental",
        "width": 1536,
        "height": 1024
      },
      "heading": "Storage for Jersey Shore residents and renters",
      "body": "Shore properties in Monmouth, Ocean, Atlantic and Cape May counties sit empty for half the year, and what you leave behind through the off season needs somewhere drier than a garage. Storage holds furniture, beach gear and seasonal rental furnishings between tenants.",
      "bullets": [
        "Between rental seasons: a 10x10 holds the furniture from a shore rental.",
        "Beach gear and bikes: a 5x10 covers boards, chairs, umbrellas and bikes for the whole household.",
        "Look for climate control against salt air, month to month terms, and a facility that stays open through the off season."
      ],
      "links": [
        {
          "label": "Find shore storage near you",
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
      "heading": "Storage for New Jersey families",
      "body": "Older homes without garages and walk-up apartments without basements leave New Jersey families short on space in a way newer housing stock elsewhere does not. Storage takes the overflow: seasonal clothing, holiday decorations, sports equipment, and the furniture you are holding between homes.",
      "bullets": [
        "Clearing a walk-up apartment: a 5x10 holds seasonal items and a bike.",
        "Between homes or mid-renovation: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.",
        "Look for ground floor or drive-up access, climate control for anything wooden or upholstered, and gate hours that suit a weekend load."
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
      "body": "You need square footage without a commercial lease, and Hudson and Essex County rents make that math attractive. Contractors store tools and materials between jobs, online sellers hold inventory, and firms archive files rather than pay office rates for paper.",
      "bullets": [
        "Inventory and stock: a 10x10 or 10x15 with ground floor access and room to load a van.",
        "Tools and equipment: a drive up unit you can back into directly.",
        "Records and electronics: a climate controlled 5x10 protects paper and hardware through humid summers.",
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
      "body": "New Jersey campuses empty every summer, and hauling a full room home twice a year rarely makes sense. If you are at Rutgers, Princeton, Montclair State, TCNJ or Seton Hall, a small unit over the break usually costs less than replacing your furniture in September.",
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
      "body": "New Jersey gives you humid summers, cold winters and a real freeze and thaw cycle, and the swing between the two is what damages stored belongings. Summer humidity encourages mildew in fabric, cardboard, upholstery, books and clothing. Winter cold cracks vinyl and plastics, ruins batteries and makes upholstery brittle, while repeated expansion and contraction loosens joints in wood furniture and cracks leather.",
      "bullets": [
        "Choose climate control for furniture, mattresses, clothing, electronics, documents, photographs, books, artwork and instruments.",
        "Near the shore or bay side, salt air adds corrosion to anything metal.",
        "Lift boxes off the floor and leave a gap between your belongings and the walls."
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
      "body": "Dense towns and HOA rules routinely rule out keeping a boat, RV or extra car at home in New Jersey. Outdoor parking is easier to find away from the dense northern towns, particularly in South Jersey and the inland shore counties.",
      "bullets": [
        "Uncovered outdoor parking is the lowest cost option for trailers, boats and RVs.",
        "Covered parking protects gelcoat, seals, upholstery and tires.",
        "Vehicle storage is priced by length. Measure including the trailer tongue and outboard, and confirm whether registration and insurance are required."
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
  "sizeHeading": "Size your New Jersey unit around what you actually own.",
  "checklistHeading": "Your checklist for picking a New Jersey storage unit.",
  "checklist": [
    "Size by your largest item. Beds, sofas and appliances decide your unit more than your box count.",
    "Compare a few towns rather than booking the first unit near you. A fifteen minute drive regularly changes the rate.",
    "Decide on climate control. Humidity, cold and, near the coast, salt air are what damage stored goods here.",
    "Check loading access. A loading bay or legal parking matters more in dense towns than the rate itself.",
    "Confirm the standing rate, not the promotional one. Ask what month three costs.",
    "Check insurance against your renters or homeowners policy before buying a facility add-on.",
    "Confirm the move-out notice period, commonly ten to fourteen days in New Jersey.",
    "Book shore season storage early. Coastal inventory fills first heading into summer.",
    "Read the newest reviews. Management changes affect service more than the building does."
  ],
  "reasonsHeading": "Reasons to move to New Jersey.",
  "reasonsImage": {
    "src": "https://images.unsplash.com/photo-1619890725056-bf09c53854cb",
    "alt": "Great Falls in Paterson, New Jersey"
  },
  "reasons": [
    {
      "heading": "Close to New York City",
      "body": "Jersey City, Hoboken and the Hudson County waterfront sit minutes from Manhattan by PATH train or ferry. Many people move here for the commute and smaller apartments come with it."
    },
    {
      "heading": "The Jersey Shore",
      "body": "More than 130 miles of Atlantic coastline run from Sandy Hook to Cape May. Beach gear, bikes and seasonal rental furniture all need somewhere to go in the off season."
    },
    {
      "heading": "Strong job market",
      "body": "Pharmaceuticals, finance, logistics and healthcare keep people moving into the state and between its towns, often before they have found a permanent home."
    },
    {
      "heading": "Respected universities",
      "body": "Rutgers, Princeton, Montclair State, TCNJ and Seton Hall bring students in each fall and send them home each summer. Short term storage bridges the gap."
    },
    {
      "heading": "Towns with their own character",
      "body": "From walkable river towns to quiet suburbs and South Jersey farmland, many people move within the state before they find their fit."
    },
    {
      "heading": "Older homes, less space",
      "body": "Much of the housing stock is older homes without garages and walk-up apartments without basements. A storage unit gives you room for what does not fit at home."
    }
  ],
  "faqHeading": "Your New Jersey self storage questions, answered.",
  "closingHeading": "Compare New Jersey storage units near you now."
};

export default async function NewJerseyStoragePage() {
  const rows = await getStorageRows();
  const njRows = rows.filter((row) => row.state === "NJ");
  const prices = njRows.map((row) => priceNumber(row.price)).filter((value) => Number.isFinite(value));
  const fromPrice = prices.length ? `$${Math.min(...prices)}` : "our listed rates";
  const facilityCount = new Set(njRows.map((row) => row.facility_id)).size;
  const listingCount = njRows.length;

  // Prefer New Jersey's own live prices per size; fall back to the nationwide
  // sample when the in-state sample for that size is too thin to trust.
  const priceRows = SIZE_TABLE.map(({ size, holds }) => {
    const njSizePrices = njRows.filter((row) => row.size.trim() === size).map((row) => priceNumber(row.price)).filter(Number.isFinite);
    const source = njSizePrices.length >= 15 ? njSizePrices : rows.filter((row) => row.size.trim() === size).map((row) => priceNumber(row.price)).filter(Number.isFinite);
    const range = priceRange(source);
    return [size, range ? `$${range[0]} to $${range[1]}` : "Contact facility", holds];
  });

  const heroText = facilityCount
    ? `Compare ${facilityCount.toLocaleString()} facilities and ${listingCount.toLocaleString()} available units across New Jersey, with current prices, sizes, and amenities near your location.`
    : "Compare storage facilities across New Jersey, with current prices, sizes, and amenities near your location.";

  const data: StatePageData = {
    ...CONTENT,
    heroText,
    pricingIntro: `New Jersey prices above the national average, though the spread within the state is wide enough that two identical units forty minutes apart can differ substantially. Hudson County and the towns facing Manhattan carry the highest rates, the shore counties tighten every summer, and South Jersey is the most affordable part of the state. Live move-in prices across the state start from ${fromPrice}.`,
    priceRows,
    cities: CITY_LINKS,
    faqs: FAQS.map((faq) => ({ question: faq.question, answer: fillPrice(faq.answer, fromPrice) })),
  };

  return <StatePageTemplate data={data} />;
}
