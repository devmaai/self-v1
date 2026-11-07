// Copy for the "[type] storage by city and brand" pages.
// City data comes from facilities with drive-up units, the same filter the type pages use.

export type TypeCitiesConfig = {
  slug: string; // parent page slug, e.g. "car-storage"
  name: string; // "Car storage"
  lower: string; // "car storage"
  heroClass: string;
  title: string;
  description: string;
  intro: string;
  cardLine: string; // "{n} facilities with drive-up units for cars"
  compareHeading: string;
  compareIntro: string;
  checks: [string, string][];
  image: string;
  imageAlt: string;
  faqs: [string, string][];
};

export const TYPE_CITIES: Record<string, TypeCitiesConfig> = {
  "car-storage": {
    slug: "car-storage",
    name: "Car storage",
    lower: "car storage",
    heroClass: "hero-photo-car",
    title: "Car Storage by City and Brand | SelfStorage.help",
    description: "Browse every city with car storage on SelfStorage.help. Compare facilities with drive-up units, starting prices and the storage brands near you.",
    intro: "Browse every city where you can compare drive-up units for your car, see starting prices, and find the storage brands near you.",
    cardLine: "with drive-up units for cars",
    compareHeading: "How to compare car storage facilities near you",
    compareIntro: "Before you book a space for your car, check these things side by side.",
    checks: [
      ["Indoor, covered or outdoor", "Decide how much protection your car needs from sun, snow and dust."],
      ["Unit length and door width", "Measure your car and confirm the unit or space fits with room to open the doors."],
      ["Drive-up access", "A drive-up unit lets you park and leave without moving anything around."],
      ["Insurance and registration", "Ask what proof the facility needs before you store your car."],
      ["Access hours", "Check gate hours if you plan to take the car out often."],
    ],
    image: "/images/storage-guide/car.jpg",
    imageAlt: "Car parked in a drive-up storage unit",
    faqs: [
      ["What size unit do I need for a car?", "Most cars fit a 10x20 unit. Larger SUVs and trucks may need a 10x25 or 10x30. Measure your car first and leave room to open a door."],
      ["Do I need insurance to store a car?", "Most facilities ask for current registration and proof of insurance. Check with your insurer about coverage while the car is in storage."],
      ["Is indoor car storage worth it?", "Indoor storage protects paint, seals and the interior from sun, snow and dust. It costs more than outdoor parking, so it suits classic cars and long stays."],
      ["How do I find car storage near me?", "Pick your city above to compare facilities with drive-up units, or search by ZIP code below."],
    ],
  },
  "rv-storage": {
    slug: "rv-storage",
    name: "RV storage",
    lower: "RV storage",
    heroClass: "hero-photo-rv",
    title: "RV Storage by City and Brand | SelfStorage.help",
    description: "Browse every city with RV storage options on SelfStorage.help. Compare facilities with drive-up access, starting prices and storage brands near you.",
    intro: "Browse every city where you can compare facilities with drive-up access for your RV, camper or trailer, and find the storage brands near you.",
    cardLine: "with drive-up access",
    compareHeading: "How to compare RV storage facilities near you",
    compareIntro: "RVs need more room than most vehicles. Check these things before you book.",
    checks: [
      ["Maximum length", "Spaces run from about 20 to 45 feet. Confirm your RV fits, hitch included."],
      ["Covered or uncovered", "Covered parking protects the roof, seals and paint from sun and snow."],
      ["Turning room", "Wide drive aisles make it easier to back in and pull out."],
      ["Power and dump stations", "Ask whether the facility offers electricity or a dump station."],
      ["Access hours", "Early gate hours help on trip days."],
    ],
    image: "/images/storage-guide/vehiclestorage.jpg",
    imageAlt: "RV and boat storage spaces",
    faqs: [
      ["How much space do I need to store an RV?", "Measure your RV from bumper to hitch and add a few feet. Most facilities list spaces from 20 to 45 feet long."],
      ["Is covered RV storage worth it?", "Covered storage protects the roof, seals and tires from sun and snow, which helps avoid costly repairs. It suits long stays and newer RVs."],
      ["Do I need to winterize my RV before storing it?", "In cold climates, yes. Drain the water lines, add antifreeze where needed and remove anything that can freeze."],
      ["How do I find RV storage near me?", "Pick your city above to compare facilities with drive-up access, or search by ZIP code below. Call ahead to confirm the maximum length."],
    ],
  },
  "boat-storage": {
    slug: "boat-storage",
    name: "Boat storage",
    lower: "boat storage",
    heroClass: "hero-photo-boat",
    title: "Boat Storage by City and Brand | SelfStorage.help",
    description: "Browse every city with boat storage options on SelfStorage.help. Compare facilities with drive-up access, starting prices and storage brands near you.",
    intro: "Browse every city where you can compare facilities with drive-up access for your boat and trailer, and find the storage brands near you.",
    cardLine: "with drive-up access",
    compareHeading: "How to compare boat storage facilities near you",
    compareIntro: "Boats and trailers need the right space and access. Check these things before you book.",
    checks: [
      ["Length with trailer", "Measure the boat on its trailer, tongue included, and confirm the space fits."],
      ["Indoor, covered or outdoor", "Decide how much protection your boat needs through the off season."],
      ["Trailer access", "Wide aisles and drive-up access make it easier to drop off and pick up."],
      ["Insurance and registration", "Ask what proof the facility needs before you store your boat."],
      ["Seasonal access", "Check gate hours for early starts in boating season."],
    ],
    image: "/images/storage-guide/vehiclestorage.jpg",
    imageAlt: "Boat and RV storage spaces",
    faqs: [
      ["What size space do I need for a boat?", "Measure the boat on its trailer from the tongue to the stern and add a little room. Small boats fit a 10x20 unit, larger ones need outdoor or covered spaces."],
      ["Should I store my boat indoors or outdoors?", "Indoor storage gives the most protection from sun and weather. Covered or outdoor storage costs less and works with a good boat cover."],
      ["How do I prepare a boat for storage?", "Clean and dry it, drain the water, stabilize or top up the fuel, remove the battery in cold weather, and use a breathable cover."],
      ["How do I find boat storage near me?", "Pick your city above to compare facilities with drive-up access, or search by ZIP code below."],
    ],
  },
  "business-storage": {
    slug: "business-storage",
    name: "Business storage",
    lower: "business storage",
    heroClass: "hero-photo-business",
    title: "Business Storage by City and Brand | SelfStorage.help",
    description: "Browse every city with business storage on SelfStorage.help. Compare facilities with drive-up units for inventory and equipment, starting prices and brands.",
    intro: "Browse every city where you can compare drive-up units for inventory, tools and equipment, and find the storage brands near you.",
    cardLine: "with drive-up units for business use",
    compareHeading: "How to compare business storage facilities near you",
    compareIntro: "Business storage works best when it fits how often you load and unload. Check these things before you book.",
    checks: [
      ["Drive-up loading", "Back a van or truck up to the door and load without carrying stock down hallways."],
      ["Unit size", "A 10x10 or 10x15 suits inventory, while tools and equipment may need a 10x20."],
      ["Climate control", "Protect paper records, electronics and stock that is sensitive to heat or damp."],
      ["Access hours", "Make sure the gate opens when your team needs to get in."],
      ["Deliveries and billing", "Ask whether the facility accepts deliveries and offers online payment and invoices."],
    ],
    image: "/images/state%20pages/proff%20and%20small%20business.jpg",
    imageAlt: "Business owner organizing inventory in a storage unit",
    faqs: [
      ["What can a business store in a storage unit?", "Inventory, tools, equipment, files, marketing materials and seasonal stock are all common. Hazardous materials and perishable goods are not allowed."],
      ["What size unit does a small business need?", "A 5x10 holds files and small stock. A 10x10 or 10x15 holds inventory for an online shop, and a 10x20 holds tools and equipment."],
      ["Can a storage unit accept deliveries?", "Some facilities accept deliveries for business tenants. Ask before you book if you need it."],
      ["How do I find business storage near me?", "Pick your city above to compare facilities with drive-up units, or search by ZIP code below."],
    ],
  },
};
