import type { Metadata } from "next";
import StatePageTemplate, { type StatePageData } from "@/components/sections/StatePageTemplate";

export const metadata: Metadata = {
  title: "Storage Units In Oklahoma Near You | Oklahoma City, Tulsa And Norman Prices",
  description: "Find self storage units in Oklahoma near your location. Compare 560 facilities and 4,912 available units, including climate controlled storage, across Oklahoma City, Tulsa, Norman, Edmond and Broken Arrow, with current monthly prices.",
};

const CITY_LINKS = [
  "Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond", "Lawton", "Moore", "Midwest City", "Stillwater", "Owasso", "Shawnee", "Bixby", "Mustang", "Bethany", "Yukon", "Sapulpa", "Del City", "Chickasha", "Glenpool", "Newcastle", "Sand Springs", "Jenks", "Claremore", "Bartlesville", "Guthrie", "Warr Acres", "El Reno", "Choctaw", "Coweta",
];

const PRICE_ROWS = [
  ["5' x 5'", "$19 to $89", "Boxes, bedding, a bike"],
  ["5' x 10'", "$41 to $86", "A single room, tools, garden equipment"],
  ["10' x 10'", "$40 to $183", "A one bedroom apartment"],
  ["10' x 15'", "$93 to $139", "A two bedroom home with appliances"],
  ["10' x 20'", "$88 to $308", "A three bedroom home or a vehicle"],
  ["20' x 30'", "$268 to $383", "A four bedroom home or commercial equipment"],
];

const FAQS = [
  {
    question: "How much is a storage unit near me in Oklahoma?",
    answer: "A 5x5 typically runs $19 to $89 a month. A 10x10 typically runs $40 to $183. A 10x20 typically runs $88 to $308. The average unit in Oklahoma City is around $113 a month.",
  },
  {
    question: "How much is a climate controlled storage unit in Oklahoma?",
    answer: "Average climate controlled rent runs around $106 a month in Oklahoma City, $108 in Norman, $109 in Del City, $124 in Stillwater, $127 in Edmond and $136 in Tulsa. In Oklahoma City, climate controlled units range from around $34 for a 5x5 to around $383 for a 20x30.",
  },
  {
    question: "How much more do climate controlled storage units cost?",
    answer: "Less than in most states. In Oklahoma City the climate controlled average of $106 sits just below the standard average of $107, and in Norman and Del City climate controlled units average lower than standard ones. Where a premium applies, it is typically ten to fifteen dollars a month.",
  },
  {
    question: "What are AC storage units?",
    answer: "Air conditioned units are cooled but do not always manage humidity. Full climate control holds both temperature and humidity within a set range. Ask the facility which one it offers, since humidity is what causes mould, mildew and rust.",
  },
  {
    question: "Do I need climate controlled storage in Oklahoma?",
    answer: "Sustained summer heat, real humidity and winter freezes make it worthwhile for furniture, electronics, documents, photographs, instruments, mattresses and clothing. Tools, bins, lawn equipment and vehicles are usually fine in a standard drive up unit.",
  },
  {
    question: "Are storage units safe during tornado season in Oklahoma?",
    answer: "Practice varies between sites. Ask whether there is a storm shelter, how the buildings are constructed and how the gate operates during a power outage. Store valuables on shelving rather than directly on the floor, and keep irreplaceable documents and photographs in a climate controlled unit.",
  },
  {
    question: "What size storage unit do I need?",
    answer: "A 5x5 holds boxes, bedding and a bike. A 5x10 holds a single room. A 10x10 holds a one bedroom apartment. A 10x15 holds a two bedroom home with appliances. A 10x20 holds a three bedroom home or a vehicle.",
  },
  {
    question: "Can I use RV storage, boat storage or car storage in Oklahoma?",
    answer: "Yes. Facilities across the state offer uncovered parking, covered parking and enclosed units. As a benchmark, vehicle storage in Chickasha averages around $173 a month, RV storage around $231 and boat storage around $258. Confirm the maximum permitted length before you reserve.",
  },
  {
    question: "Can I go to my storage unit anytime?",
    answer: "Some Oklahoma facilities offer 24 hour gate access, others run limited gate hours, and office hours are almost always shorter. Filter for 24 hour access and confirm both sets of hours before you reserve.",
  },
  {
    question: "Can I rent a storage unit for just one month?",
    answer: "Yes. Most Oklahoma facilities rent month to month with no long term commitment. Weekly rentals are rare, so a single month is usually the shortest term available.",
  },
  {
    question: "Do I need insurance on a storage unit?",
    answer: "Most facilities require proof of coverage. Check your renters or homeowners policy first, since stored goods are often already covered, then confirm what the facility accepts before buying a separate plan.",
  },
  {
    question: "Is there military storage near Tinker Air Force Base?",
    answer: "Yes. Facilities in Midwest City and Oklahoma City sit close to Tinker. Whichever base you are near, including Fort Sill, Altus and Vance, ask about military rates, month to month terms with no penalty for an early move out, and autopay so billing runs while you are away.",
  },
  {
    question: "What can I not store in a storage unit?",
    answer: "Facilities across Oklahoma prohibit perishable food, plants, live animals, flammable and hazardous materials, fuel, fireworks and anything that generates odour. Drain fuel from mowers, blowers and generators before storing them.",
  },
];

const DATA: StatePageData = {
  slug: "oklahoma",
  name: "Oklahoma",
  key: "ok",
  heroImage: "https://images.unsplash.com/photo-1785187300453-240b2404b2bb",
  heroText: "Compare 560 self storage facilities and 4,912 available units across Oklahoma, including Oklahoma City, Tulsa and Norman, with current prices, sizes, and amenities near your location.",
  citiesHeading: "Find cheap storage units in Oklahoma City, Tulsa and your Oklahoma city",
  citiesIntro: "Oklahoma self storage rates vary more by suburb than by metro, and the gap between two facilities on opposite sides of the same city is often larger than the gap between Oklahoma City and Tulsa. Start with your city and narrow by radius.",
  pricingHeading: "How much are storage units in Oklahoma per month?",
  pricingIntro: "Oklahoma is one of the more affordable storage markets in the country. The average unit in Oklahoma City now runs around $113 a month, and small units start as low as $8 to $12 on promotional rates in Oklahoma City, Edmond, Moore, Mustang and Yukon. In Oklahoma City, a 5x5 averages around $27 a month and a 20x30 averages around $383, while rural markets run lower again. In Chickasha, a 5x5 averages around $10.",
  needsHeading: "Pick Oklahoma storage near you that fits your need.",
  needs: [
    {
      image: { src: "/images/state%20pages/storage%20for%20family.jpg", alt: "Family moving boxes into a storage unit", width: 980, height: 653 },
      heading: "Storage for Oklahoma families",
      body: "Most homes here fill the garage before they run out of things to keep. Storage takes the overflow: lawn equipment and patio furniture through winter, holiday decorations, hunting and fishing gear, sports equipment, tools, and furniture you are holding between houses.",
      bullets: [
        "Clearing the garage: a 5x10 holds seasonal items, tools and sports gear.",
        "Between homes: a 10x15 holds a two bedroom home with appliances, a 10x20 holds a three bedroom home.",
        "Storm season: many families move documents, photographs and irreplaceable items into a secure unit ahead of severe weather.",
        "Look for drive up access, ground floor units, and gate hours that suit a weekend load.",
      ],
      links: [{ label: "Find family storage near you", href: "/find-storage" }],
    },
    {
      image: { src: "/images/state%20pages/military%20storage.jpg", alt: "Military family with a service member packing a storage unit during a move", width: 1536, height: 1024 },
      heading: "Storage for military households",
      body: "Tinker Air Force Base near Midwest City, Fort Sill in Lawton, Altus and Vance all bring households through Oklahoma on orders that rarely line up with lease dates. Military storage covers the gap between a move out and a move in, or holds household goods through a deployment.",
      bullets: [
        "Full household during a posting: a 10x20 holds a three bedroom home.",
        "Partial storage: a 10x10 covers furniture you will not need at the next duty station.",
        "Vehicles: enclosed or covered parking keeps a car protected while you are away.",
        "Look for military rates, month to month terms with no penalty for an early move out, autopay so billing runs while you are away, and climate control for anything staying more than a season.",
      ],
      links: [{ label: "Find storage near your base", href: "/find-storage" }],
    },
    {
      image: { src: "/images/state%20pages/proff%20and%20small%20business.jpg", alt: "Business owner organizing inventory in a storage unit", width: 640, height: 640 },
      heading: "Professionals and small businesses",
      body: "You need square footage without a commercial lease. Contractors and trades store tools and materials between jobs. Online sellers hold inventory, packaging and returns. Field service and energy crews store equipment between rotations. Practices and firms archive files.",
      bullets: [
        "Inventory and stock: a 10x10 or 10x15 with drive up access and room to load a van.",
        "Tools and equipment: a drive up unit you can back into directly, with 24 hour gate access for early starts.",
        "Records, samples and electronics: a climate controlled 5x10 protects paper and hardware through the summer.",
        "Look for month to month terms, online payment and invoicing, and autopay.",
      ],
      links: [{ label: "Find business storage near you", href: "/business-storage" }],
    },
    {
      image: { src: "/images/state%20pages/storage%20for%20students.jpg", alt: "Student moving belongings into a storage unit", width: 980, height: 653 },
      heading: "Storage for students",
      body: "Campuses in Norman, Stillwater, Edmond, Tulsa and Lawton empty every summer, and moving a full room home twice a year rarely makes sense. A small unit over the break usually costs less than replacing your furniture in August.",
      bullets: [
        "Dorm or shared apartment: a 5x5 takes boxes, bedding and a bike. A 5x10 takes a full room including a mattress and desk.",
        "Splitting with housemates: a 10x10 covers two rooms and divides the cost.",
        "Look for student rates, a facility close to campus, climate control for anything that would not survive a summer in a metal unit, and month to month terms so you stop paying the week you return.",
      ],
      links: [{ label: "Find student storage near you", href: "/student-storage" }],
    },
    {
      image: { src: "/images/climate-storage/indoor-corridor.png", alt: "Indoor climate controlled storage corridor", width: 1200, height: 800 },
      heading: "Climate controlled storage",
      body: "Oklahoma runs a wide annual swing, with sustained summer heat, real humidity and winter freezes, so climate controlled storage in Oklahoma City and Tulsa is worth pricing. It is also one of the few states where climate controlled units often cost the same as standard ones. In Oklahoma City the climate controlled average of $106 a month sits just below the standard average of $107.",
      bullets: [
        "Choose climate control for wooden and leather furniture, mattresses, electronics, documents, photographs and instruments.",
        "Ask whether the facility holds humidity as well as temperature, since air conditioned units do not always manage both.",
        "Lift boxes off the floor on pallets or shelving, and leave a gap between your belongings and the walls.",
      ],
      links: [{ label: "Explore climate controlled storage", href: "/climate-controlled-storage" }],
    },
    {
      image: { src: "/images/storage-guide/vehiclestorage.jpg", alt: "Boat and RV storage spaces", width: 1536, height: 1024 },
      heading: "Storage for RVs, boats and cars",
      body: "Between Grand Lake, Lake Eufaula, Keystone and Tenkiller, Oklahoma carries heavy boat and RV ownership, and most subdivisions restrict keeping them at home. Boat storage and RV storage in Oklahoma City, Tulsa and across the state runs from open parking to enclosed units.",
      bullets: [
        "Uncovered outdoor parking. The lowest cost option for trailers, boats and RVs.",
        "Covered parking. Shade from sustained summer sun and cover from hail and ice.",
        "Enclosed drive-up units. Full protection for classic cars, motorcycles and smaller boats.",
      ],
      links: [
        { label: "Explore RV storage", href: "/rv-storage" },
        { label: "Explore boat storage", href: "/boat-storage" },
        { label: "Explore car storage", href: "/car-storage" },
      ],
    },
  ],
  sizeHeading: "Size your Oklahoma unit around what you actually own.",
  checklistHeading: "Your checklist for picking an Oklahoma storage unit.",
  checklist: [
    "Size by your largest item. A sectional sofa, a chest freezer or a mower decides your unit more than the number of boxes.",
    "Price climate control before you assume it is a luxury. Across much of Oklahoma the gap is small or nothing.",
    "Ask what climate control means at that facility. Temperature only, or temperature and humidity.",
    "Check the other side of town. Suburb pricing varies more than metro pricing here.",
    "Check access hours against your routine. Gate hours and office hours are rarely the same.",
    "Ask about severe weather. Construction, roof type, and drainage matter in this state.",
    "Compare the ongoing rate, not the offer. Ask what month two onward costs and how increases are handled.",
    "Confirm insurance. Check your renters or homeowners policy first, then the facility requirement.",
    "Read the newest reviews. Management changes affect service more than the building does.",
  ],
  reasonsHeading: "Reasons to move to Oklahoma.",
  reasonsImage: {
    src: "https://images.unsplash.com/photo-1638821999942-2254698b0332",
    alt: "Route 66 neon signs in Tulsa, Oklahoma",
  },
  reasons: [
    {
      heading: "Affordable housing and cheap storage",
      body: "Oklahoma consistently ranks among the more affordable states for housing, so many families move to Oklahoma City, Tulsa and Norman for more space per dollar. Cheap storage units fill the gap while a move is in progress.",
    },
    {
      heading: "Growing Oklahoma City and Tulsa metros",
      body: "Edmond, Moore, Mustang, Yukon, Broken Arrow, Owasso and Bixby keep adding new homes and new residents. Short term storage helps when a closing date and a move out date do not line up.",
    },
    {
      heading: "Tinker, Fort Sill, Altus and Vance",
      body: "Tinker Air Force Base near Midwest City, Fort Sill in Lawton, Altus Air Force Base and Vance Air Force Base in Enid bring steady military moves. Military storage covers the gap between postings and deployments.",
    },
    {
      heading: "University of Oklahoma and Oklahoma State",
      body: "Norman and Stillwater fill each fall and empty each summer, and the University of Tulsa and Oklahoma City universities add more. Student storage near campus saves a full room of belongings from two trips home.",
    },
    {
      heading: "Energy, aerospace and agriculture jobs",
      body: "Oil and gas, aerospace work around Tinker and a large agricultural economy keep people relocating into the state and between its cities. Business and equipment storage is part of that churn.",
    },
    {
      heading: "Lakes, Route 66 and tornado season",
      body: "Grand Lake, Lake Eufaula, Keystone and Tenkiller mean boats and RVs that need boat and RV storage, and Route 66 road trips add more. Many families also keep documents and keepsakes in a secure unit during severe weather season.",
    },
  ],
  faqHeading: "Your Oklahoma self storage questions, answered.",
  closingHeading: "Compare Oklahoma storage units near you now.",
  cities: CITY_LINKS,
  priceRows: PRICE_ROWS,
  faqs: FAQS,
};

export default function OklahomaStoragePage() {
  return <StatePageTemplate data={DATA} />;
}
