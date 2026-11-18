// Short, city-specific lines for the "Moving to {City}?" section on city
// pages. Each city gets one line on living costs, one on colleges and one on
// family life; the rest of the copy is shared (see buildCityPageContent).

export type CityMovingFacts = { cost: string; students: string; families: string };

export const CITY_MOVING_FACTS: Record<string, CityMovingFacts> = {
  // Utah
  "west-valley-city": {
    cost: "West Valley City is one of the more affordable places to rent in Salt Lake County, with easy access to I-215 and the TRAX Green Line.",
    students: "Yes. You are a short drive or TRAX ride from the University of Utah and Salt Lake Community College's Taylorsville Redwood campus.",
    families: "Families like West Valley City for its parks, the Maverik Center and the Utah Cultural Celebration Center.",
  },
  provo: {
    cost: "Provo has a large rental market built around its universities, and many apartments near campus are small and shared.",
    students: "Yes. Brigham Young University is in Provo, and Utah Valley University is next door in Orem.",
    families: "Families like Provo for its canyons, trails and parks, with Provo Canyon and Utah Lake close by.",
  },
  "west-jordan": {
    cost: "West Jordan has newer subdivisions and townhomes, and rents usually sit below what you pay closer to downtown Salt Lake City.",
    students: "Yes. Salt Lake Community College has a campus in West Jordan, and the University of Utah is a short drive north.",
    families: "Families like West Jordan for its newer neighborhoods, parks and the Mountain View Corridor.",
  },
  orem: {
    cost: "Orem rents often run a little below Provo, and many households share apartments or townhomes near campus.",
    students: "Yes. Utah Valley University is in Orem, and Brigham Young University is just south in Provo.",
    families: "Families like Orem for its parks, schools and easy access to Provo Canyon.",
  },
  sandy: {
    cost: "Sandy has more single-family homes than much of the valley, and prices reflect its location near the canyons.",
    students: "Yes. Salt Lake Community College has a nearby campus, and the University of Utah is a TRAX ride away.",
    families: "Families like Sandy for its parks, the Shops at South Town and quick access to Little and Big Cottonwood Canyons.",
  },
  "st-george": {
    cost: "St. George has grown fast, and many newcomers rent while they build or buy, which keeps short-term storage busy.",
    students: "Yes. Utah Tech University is in St. George.",
    families: "Families like St. George for its warm winters, trails and nearby Snow Canyon State Park and Zion National Park.",
  },
  ogden: {
    cost: "Ogden is one of the more affordable cities on the Wasatch Front, with older homes close to downtown.",
    students: "Yes. Weber State University is in Ogden.",
    families: "Families like Ogden for Historic 25th Street, the Ogden River Parkway and the ski areas in Ogden Valley.",
  },
  layton: {
    cost: "Layton has a mix of family homes and apartments, and prices usually sit below Salt Lake City.",
    students: "Yes. Weber State University's Davis campus is in Layton.",
    families: "Families like Layton for its parks, Layton Commons and quick access to Hill Air Force Base.",
  },
  "south-jordan": {
    cost: "South Jordan has larger, newer homes, including planned communities such as Daybreak, and prices run above the valley average.",
    students: "Yes. Salt Lake Community College and the University of Utah are both within driving distance.",
    families: "Families like South Jordan for Daybreak's lake and trails, its parks and its newer schools.",
  },
  lehi: {
    cost: "Lehi has grown quickly with the Silicon Slopes tech corridor, and many newcomers rent before they buy.",
    students: "Yes. Brigham Young University and Utah Valley University are a short drive south.",
    families: "Families like Lehi for Thanksgiving Point, its newer neighborhoods and trails along the Jordan River.",
  },
  millcreek: {
    cost: "Millcreek sits between Salt Lake City and the canyons, with established neighborhoods and homes priced close to the valley average.",
    students: "Yes. The University of Utah and Westminster University are a short drive north.",
    families: "Families like Millcreek for its parks, Millcreek Canyon trails and easy access to downtown Salt Lake City.",
  },
  // California
  "los-angeles": {
    cost: "Los Angeles has some of the highest rents in the country, and many apartments are small for what they cost.",
    students: "Yes. UCLA, USC, Cal State LA and dozens of colleges bring students from around the world.",
    families: "Families like Los Angeles for its beaches, Griffith Park and the variety of neighborhoods across the county.",
  },
  "san-diego": {
    cost: "San Diego rents run well above the national average, especially near the coast.",
    students: "Yes. UC San Diego, San Diego State University and the University of San Diego are all in the city.",
    families: "Families like San Diego for Balboa Park, the San Diego Zoo, its beaches and its mild weather.",
  },
  "san-jose": {
    cost: "San Jose sits in Silicon Valley, where housing is among the most expensive in the country.",
    students: "Yes. San José State University is downtown, and Santa Clara University is next door.",
    families: "Families like San Jose for its parks, museums such as The Tech Interactive and its suburban neighborhoods.",
  },
  "san-francisco": {
    cost: "San Francisco has some of the highest rents in the country, and many apartments have little closet space.",
    students: "Yes. San Francisco State University, the University of San Francisco and UCSF are in the city.",
    families: "Families like San Francisco for Golden Gate Park, its museums and its neighborhood parks.",
  },
  fresno: {
    cost: "Fresno is one of the more affordable large cities in California, with more single-family homes than the coast.",
    students: "Yes. California State University, Fresno and Fresno City College are both in the city.",
    families: "Families like Fresno for its parks, the Fresno Chaffee Zoo and its short drive to Yosemite, Kings Canyon and Sequoia.",
  },
  sacramento: {
    cost: "Sacramento costs less than the Bay Area, and many people move here for more space at a lower price.",
    students: "Yes. Sacramento State is in the city, and UC Davis is a short drive west.",
    families: "Families like Sacramento for its parks, the American River Parkway and Old Sacramento.",
  },
  "long-beach": {
    cost: "Long Beach rents are high by national standards, though usually below coastal Los Angeles and Orange County.",
    students: "Yes. California State University, Long Beach and Long Beach City College are in the city.",
    families: "Families like Long Beach for its beaches, the Aquarium of the Pacific and its waterfront parks.",
  },
  oakland: {
    cost: "Oakland costs less than San Francisco, though rents are still high by national standards.",
    students: "Yes. Mills College at Northeastern University is in Oakland, and UC Berkeley is next door.",
    families: "Families like Oakland for Lake Merritt, the Oakland Zoo and its hillside parks.",
  },
  bakersfield: {
    cost: "Bakersfield is one of the more affordable cities in California, with more room for the money than the coast.",
    students: "Yes. California State University, Bakersfield and Bakersfield College are both in the city.",
    families: "Families like Bakersfield for its parks, the Kern River and its lower cost of living.",
  },
  anaheim: {
    cost: "Anaheim rents are high by national standards, in line with much of Orange County.",
    students: "Yes. Cal State Fullerton is next door, and several community colleges are close by.",
    families: "Families like Anaheim for Disneyland Resort, Angel Stadium and its parks.",
  },
  "santa-ana": {
    cost: "Santa Ana is one of the more affordable cities in Orange County, though rents are still high by national standards.",
    students: "Yes. Santa Ana College is in the city, and UC Irvine and Cal State Fullerton are a short drive away.",
    families: "Families like Santa Ana for the Santa Ana Zoo, Discovery Cube Orange County and its historic downtown.",
  },
  riverside: {
    cost: "Riverside costs less than coastal Southern California, and many people move here for more space.",
    students: "Yes. UC Riverside, California Baptist University and Riverside City College are in the city.",
    families: "Families like Riverside for Mount Rubidoux, its parks and its historic downtown.",
  },
  stockton: {
    cost: "Stockton is one of the more affordable cities in Northern California, with lower rents than the Bay Area.",
    students: "Yes. The University of the Pacific and San Joaquin Delta College are in Stockton.",
    families: "Families like Stockton for its waterfront, parks and access to the Delta.",
  },
  irvine: {
    cost: "Irvine rents are among the higher ones in Orange County, with many newer apartments and planned communities.",
    students: "Yes. UC Irvine and Concordia University Irvine are in the city.",
    families: "Families like Irvine for its parks, trails, schools and the Great Park.",
  },
  "redwood-city": {
    cost: "Redwood City sits between San Francisco and San Jose, and rents reflect its Peninsula location and short commute to Silicon Valley employers.",
    students: "Yes. Cañada College is in Redwood City, and Stanford University is a short drive south in Palo Alto.",
    families: "Families like Redwood City for its downtown, its parks and its easy access to the bay and the Peninsula hills.",
  },
  "daly-city": {
    cost: "Daly City borders San Francisco, and many households choose it for rents that usually sit below the city's.",
    students: "Yes. San Francisco State University is just across the city line, and Skyline College is next door in San Bruno.",
    families: "Families like Daly City for its parks, its coastal trails and its BART access into San Francisco.",
  },
  "culver-city": {
    cost: "Culver City is a compact Westside city, and rents run above the Los Angeles County average.",
    students: "Yes. West Los Angeles College is in Culver City, and UCLA and Loyola Marymount University are a short drive away.",
    families: "Families like Culver City for its walkable downtown, its parks and the Baldwin Hills Scenic Overlook.",
  },
  "national-city": {
    cost: "National City is one of the more affordable places to rent in the San Diego area, a few miles south of downtown.",
    students: "Yes. Southwestern College has a campus in National City, and San Diego State University is a short drive north.",
    families: "Families like National City for its parks, Pepper Park on the bay and its easy access to downtown San Diego.",
  },
  // New York
  "new-york-city": {
    cost: "New York City has some of the highest rents in the country, and most apartments have very little storage space.",
    students: "Yes. NYU, Columbia, the City University of New York campuses and many more colleges are in the city.",
    families: "Families like New York City for its parks, museums and neighborhoods across all five boroughs.",
  },
  brooklyn: {
    cost: "Brooklyn rents are high, especially near Manhattan, and many apartments are walk-ups with little closet space.",
    students: "Yes. Brooklyn College, Pratt Institute and NYU Tandon School of Engineering are in Brooklyn.",
    families: "Families like Brooklyn for Prospect Park, Brooklyn Bridge Park and its brownstone neighborhoods.",
  },
  queens: {
    cost: "Queens rents usually run below Manhattan and much of Brooklyn, though space is still tight in most apartments.",
    students: "Yes. Queens College, St. John's University and LaGuardia Community College are in Queens.",
    families: "Families like Queens for Flushing Meadows Corona Park, its beaches in the Rockaways and its diverse neighborhoods.",
  },
  manhattan: {
    cost: "Manhattan has the highest rents in New York City, and apartments rarely have room for seasonal items.",
    students: "Yes. Columbia, NYU, The New School and several CUNY colleges are in Manhattan.",
    families: "Families like Manhattan for Central Park, its museums and its schools.",
  },
  bronx: {
    cost: "The Bronx is one of the more affordable boroughs in New York City.",
    students: "Yes. Fordham University, Lehman College and Manhattan University are in the Bronx.",
    families: "Families like the Bronx for the Bronx Zoo, the New York Botanical Garden and Pelham Bay Park.",
  },
  "staten-island": {
    cost: "Staten Island has more houses and driveways than the other boroughs, and rents usually run below Manhattan and Brooklyn.",
    students: "Yes. The College of Staten Island and Wagner College are on the island.",
    families: "Families like Staten Island for its larger homes, parks and the Staten Island Greenbelt.",
  },
  buffalo: {
    cost: "Buffalo is one of the more affordable cities in New York State, with more house for the money than downstate.",
    students: "Yes. The University at Buffalo, Buffalo State University and Canisius University are in the area.",
    families: "Families like Buffalo for its parks, its waterfront at Canalside and its short drive to Niagara Falls.",
  },
  rochester: {
    cost: "Rochester is one of the more affordable cities in New York State.",
    students: "Yes. The University of Rochester and Rochester Institute of Technology are both in the area.",
    families: "Families like Rochester for the Strong National Museum of Play, Highland Park and Lake Ontario beaches.",
  },
  yonkers: {
    cost: "Yonkers rents usually run below New York City, with easy train access to Manhattan.",
    students: "Yes. Sarah Lawrence College is next door, and the colleges of Manhattan and the Bronx are a short ride away.",
    families: "Families like Yonkers for its waterfront, Tibbetts Brook Park and its quick commute to the city.",
  },
  syracuse: {
    cost: "Syracuse is one of the more affordable cities in New York State.",
    students: "Yes. Syracuse University, SUNY Upstate Medical University and Le Moyne College are in Syracuse.",
    families: "Families like Syracuse for the Rosamond Gifford Zoo, the Museum of Science and Technology and nearby lakes.",
  },
  albany: {
    cost: "Albany costs less than downstate New York, with many rentals in older row houses near downtown.",
    students: "Yes. The University at Albany and Albany College of Pharmacy and Health Sciences are in the city, and Siena University is close by.",
    families: "Families like Albany for Washington Park, its museums and easy trips to the Adirondacks.",
  },
  "white-plains": {
    cost: "White Plains rents are high by national standards, in line with much of Westchester County.",
    students: "Yes. Pace University has a campus in White Plains, and Westchester Community College is in nearby Valhalla.",
    families: "Families like White Plains for its parks, shopping and quick train ride to Manhattan.",
  },
  // Missouri
  "kansas-city": {
    cost: "Kansas City costs less than most large US cities, so you get more space for your money.",
    students: "Yes. The University of Missouri–Kansas City, Rockhurst University and Metropolitan Community College are in the city.",
    families: "Families like Kansas City for the Kansas City Zoo, Union Station, its parks and its fountains.",
  },
  "st-louis": {
    cost: "St. Louis costs less than most large US cities, with many older homes and apartments near downtown.",
    students: "Yes. Washington University in St. Louis, Saint Louis University and the University of Missouri–St. Louis are here.",
    families: "Families like St. Louis for Forest Park, the Saint Louis Zoo, the City Museum and the Gateway Arch.",
  },
  springfield: {
    cost: "Springfield is one of the more affordable cities in Missouri.",
    students: "Yes. Missouri State University, Drury University and Evangel University are in Springfield.",
    families: "Families like Springfield for its parks, Wonders of Wildlife and its short drive to the Ozarks lakes.",
  },
  independence: {
    cost: "Independence usually costs less than central Kansas City, with many single-family homes.",
    students: "Yes. The University of Missouri–Kansas City and Metropolitan Community College are a short drive away.",
    families: "Families like Independence for its historic sites, its parks and its quick drive into Kansas City.",
  },
  "lees-summit": {
    cost: "Lee's Summit has larger homes than much of the metro, with prices a little above the Kansas City average.",
    students: "Yes. The University of Central Missouri has a campus in Lee's Summit, and Kansas City colleges are a short drive away.",
    families: "Families like Lee's Summit for its schools, Longview Lake and Lake Jacomo.",
  },
  ofallon: {
    cost: "O'Fallon has newer neighborhoods west of St. Louis, with home prices close to the St. Charles County average.",
    students: "Yes. Lindenwood University in St. Charles and St. Charles Community College are close by.",
    families: "Families like O'Fallon for its parks, its newer schools and its quick drive into St. Louis.",
  },
  "st-charles": {
    cost: "St. Charles costs less than many St. Louis suburbs, with a mix of historic homes and newer neighborhoods.",
    students: "Yes. Lindenwood University is in St. Charles.",
    families: "Families like St. Charles for its historic Main Street, the Katy Trail and its riverfront.",
  },
  "st-peters": {
    cost: "St. Peters has many single-family homes and prices close to the St. Charles County average.",
    students: "Yes. St. Charles Community College is nearby, and Lindenwood University is a short drive away.",
    families: "Families like St. Peters for its parks, the Rec-Plex and its quick access to I-70.",
  },
  "blue-springs": {
    cost: "Blue Springs has many single-family homes, and prices usually sit below the Kansas City metro average.",
    students: "Yes. Metropolitan Community College has a campus in Blue Springs.",
    families: "Families like Blue Springs for its schools and Lake Jacomo in nearby Fleming Park.",
  },
  florissant: {
    cost: "Florissant is one of the more affordable suburbs in north St. Louis County.",
    students: "Yes. St. Louis Community College's Florissant Valley campus is in the city.",
    families: "Families like Florissant for its historic Old Town, its parks and its quick drive into St. Louis.",
  },
  chesterfield: {
    cost: "Chesterfield has larger homes than much of St. Louis County, with prices above the county average.",
    students: "Yes. Logan University is in Chesterfield, and St. Louis colleges are a short drive away.",
    families: "Families like Chesterfield for its parks, the Chesterfield Valley and its schools.",
  },
  "jefferson-city": {
    cost: "Jefferson City is an affordable state capital with many older homes near downtown.",
    students: "Yes. Lincoln University is in Jefferson City, and the University of Missouri is a short drive away in Columbia.",
    families: "Families like Jefferson City for the Katy Trail, its riverfront and the Missouri State Capitol.",
  },
  // New Jersey
  "jersey-city": {
    cost: "Jersey City rents run among the highest in New Jersey, especially in the waterfront high-rises facing Manhattan.",
    students: "Yes. New Jersey City University and Saint Peter's University are in Jersey City, and Stevens Institute of Technology is next door in Hoboken.",
    families: "Families like Jersey City for Liberty State Park, its waterfront walkway and PATH access into Manhattan.",
  },
  // Florida
  pensacola: {
    cost: "Pensacola rents usually sit below what you pay in South Florida, with higher prices closer to the beaches.",
    students: "Yes. The University of West Florida and Pensacola State College are both in the Pensacola area.",
    families: "Families like Pensacola for its Gulf beaches, the National Naval Aviation Museum and its historic downtown.",
  },
  // Texas
  texarkana: {
    cost: "Texarkana is one of the more affordable places to rent in Texas, with plenty of single-family homes.",
    students: "Yes. Texas A&M University-Texarkana and Texarkana College are both in the city.",
    families: "Families like Texarkana for its parks, nearby lakes and small-city pace on the Texas and Arkansas line.",
  },
  // Kansas
  wichita: {
    cost: "Wichita has one of the lower costs of living among large Midwest cities, with rents below the national average.",
    students: "Yes. Wichita State University and Friends University are in Wichita.",
    families: "Families like Wichita for the Sedgwick County Zoo, Botanica and the riverfront trails along the Arkansas River.",
  },
  "overland-park": {
    cost: "Overland Park is one of the pricier places to rent in the Kansas City area, with newer homes and apartments.",
    students: "Yes. Johnson County Community College is in Overland Park, and the University of Kansas Edwards Campus is nearby.",
    families: "Families like Overland Park for its schools, its parks and the Overland Park Arboretum.",
  },
  olathe: {
    cost: "Olathe has many newer subdivisions, and rents usually sit a little below Overland Park.",
    students: "Yes. MidAmerica Nazarene University is in Olathe, and Johnson County Community College is a short drive north.",
    families: "Families like Olathe for its schools, Lake Olathe and its many neighborhood parks.",
  },
  lenexa: {
    cost: "Lenexa sits in the middle of Johnson County, with rents close to the county average.",
    students: "Yes. Johnson County Community College and the University of Kansas Edwards Campus are both a short drive away.",
    families: "Families like Lenexa for Lenexa City Center, Shawnee Mission Park and its trail network.",
  },
  "kansas-city-ks": {
    cost: "Kansas City, Kansas is one of the more affordable places to rent in the metro, especially compared with Johnson County.",
    students: "Yes. Kansas City Kansas Community College and the University of Kansas Medical Center are in the city.",
    families: "Families like Kansas City, Kansas for the Legends shopping area, Wyandotte County Lake Park and its quick access to Missouri.",
  },
  shawnee: {
    cost: "Shawnee rents usually sit a little below Overland Park and Lenexa, with plenty of single-family homes.",
    students: "Yes. Johnson County Community College is a short drive south, and the University of Kansas is within an hour.",
    families: "Families like Shawnee for Shawnee Mission Park, its downtown and its quieter neighborhoods.",
  },
};
