import type {
  HeroSlide,
  JournalArticle,
  MissionBannerConfig,
  NavItem,
  NewsletterBannerConfig,
  OrderRecord,
  Product,
  PromoBannerItem,
  ReviewItem,
  SpeciesCategory,
  TrustPillarItem,
  UtilityLinkItem,
} from "@/types/ecommerce";

export interface CollectionMeta {
  slug: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  filterType: "all" | "species" | "sale" | "new";
  filterValue: string;
}

export interface PartnerCharity {
  id: string;
  name: string;
  city: string;
  donated: string;
  focus: string;
}

export const SITE_BRAND = {
  nameFirst: "Everything",
  nameSecond: "Pet",
  tagline: "Your Pet's World, All in One Place",
  announcement: "Free & Fast Delivery on orders $49+ · Use code",
  promoCode: "PET15",
  freeShippingThreshold: 49,
  supportEmail: "support@everythingpet.org",
};

export const UTILITY_LINKS: UtilityLinkItem[] = [
  {
    id: "u-charity",
    label: "100% Surplus Profits for Animal Welfare",
    icon: "heart",
    action: { type: "modal", modal: "charity" },
    highlight: true,
  },
  {
    id: "u-track",
    label: "Track Order",
    icon: "truck",
    action: { type: "modal", modal: "tracker" },
  },
  {
    id: "u-guides",
    label: "Pet Care Guides",
    icon: "book",
    action: { type: "section", sectionId: "guides" },
    hideOnMobile: true,
  },
  {
    id: "u-support",
    label: "24/7 Support",
    icon: "help",
    action: { type: "modal", modal: "advisor" },
    hideOnMobile: true,
  },
];

export const CATEGORY_NAV_ITEMS: NavItem[] = [
  { id: "all", label: "All Pets" },
  { id: "dogs", label: "Dogs" },
  { id: "cats", label: "Cats" },
  { id: "reptiles", label: "Reptiles" },
  { id: "birds", label: "Birds" },
  { id: "fish", label: "Fish & Aquatic" },
  { id: "small-pets", label: "Small Pets" },
];

export const QUICK_NAV_LINKS = [
  {
    id: "q-sale",
    label: "On Sale Now",
    icon: "flame" as const,
    colorClass: "text-rose-600 hover:text-rose-700",
    href: "/collections/sale",
  },
  {
    id: "q-new",
    label: "New Arrivals",
    icon: "sparkles" as const,
    colorClass: "text-indigo-700 hover:text-indigo-900",
    href: "/collections/new",
  },
  {
    id: "q-mission",
    label: "Animal Welfare",
    icon: "heart" as const,
    colorClass: "text-teal-700 hover:text-teal-900",
    href: "/#mission",
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    badge: "EverythingPet · Purpose-Driven Store",
    titleTop: "Your Pet's World,",
    titleAccent: "All in One Place",
    subtitle:
      "Shop natural rubber chew toys, waterproof mats, cat puzzle feeders, reptile lamp stands, aquarium filters & small pet habitats — remaining profits support animal charities.",
    ctaLabel: "Shop All Products",
    ctaAction: { type: "collection", slug: "all" },
    secondaryCtaLabel: "On Sale Now",
    secondaryAction: { type: "collection", slug: "sale" },
    image: "/images/hero-pets.jpg",
    imageAlt: "Golden Retriever and ginger tabby relaxing beside pet essentials",
    highlightTag: "Profits Fund Animal Welfare",
  },
  {
    id: 1,
    badge: "Popular Dogs & Cats Essentials",
    titleTop: "Interactive Puzzles &",
    titleAccent: "Everyday Feeding Gear",
    subtitle:
      "Absorbent food & water mats, universal silicone can lids, cat strip feeders, and airtight food storage containers built for happy mealtimes.",
    ctaLabel: "Shop Cat Supplies",
    ctaAction: { type: "category", category: "cats" },
    secondaryCtaLabel: "Shop Dog Supplies",
    secondaryAction: { type: "category", category: "dogs" },
    image: "/images/species-cats.jpg",
    imageAlt: "Tabby cat playing with interactive puzzle feeder",
    highlightTag: "100% Authentic Products",
  },
  {
    id: 2,
    badge: "Reptiles, Fish, Birds & Small Pets",
    titleTop: "Habitats, Filters &",
    titleAccent: "Enrichment Gear",
    subtitle:
      "From stainless steel snake tongs and adjustable lamp stands to multi-stage aquarium filters, wave pumps, wooden hamster mazes & grass chew balls.",
    ctaLabel: "Explore Aquatic Gear",
    ctaAction: { type: "category", category: "fish" },
    secondaryCtaLabel: "Shop Small Pets",
    secondaryAction: { type: "category", category: "small-pets" },
    image: "/images/species-fish.jpg",
    imageAlt: "Planted freshwater aquarium with crystal clear filtration",
    highlightTag: "Fast & Reliable Delivery",
  },
];

export const HERO_PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: "promo-sale-now",
    badge: "ON SALE NOW",
    title: "Exclusive Deals · Up to 25% Off",
    subtitle: "Waterproof mats, heavy-duty chew toys & puzzles",
    ctaLabel: "Shop Sale Items",
    action: { type: "collection", slug: "sale" },
    image: "/images/species-dogs.jpg",
    imageAlt: "Natural rubber chew toy and dog feeding essentials",
    theme: "coral",
  },
  {
    id: "promo-small-reptile",
    badge: "NEW ARRIVALS",
    title: "Reptile & Small Pet Habitats",
    subtitle: "Wooden hamster mazes, lamp stands & grass balls",
    ctaLabel: "Explore New Arrivals",
    action: { type: "collection", slug: "new" },
    image: "/images/species-small.jpg",
    imageAlt: "Bunny beside wooden maze and natural grass chew balls",
    theme: "teal",
  },
];

export const TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: "tp-delivery",
    icon: "truck",
    title: "Fast & Reliable Delivery",
    desc: "Quick dispatch & live order tracking · Free $49+",
    action: { type: "modal", modal: "tracker" },
  },
  {
    id: "tp-authentic",
    icon: "shield",
    title: "100% Authentic Products",
    desc: "Safe, durable pet supplies across all 6 categories",
    action: { type: "collection", slug: "all" },
  },
  {
    id: "tp-welfare",
    icon: "heart",
    title: "Profits for Animal Welfare",
    desc: "Operating costs covered, surplus donated to rescues",
    action: { type: "modal", modal: "charity" },
  },
  {
    id: "tp-support",
    icon: "headset",
    title: "24/7 Pet Care Support",
    desc: "Always-on help for orders & product recommendations",
    action: { type: "modal", modal: "advisor" },
  },
];

export const SPECIES_LIST: SpeciesCategory[] = [
  {
    id: "dogs",
    name: "Dogs",
    count: "140+ Products",
    tagline: "Chew toys, waterproof mats & storage bins",
    image: "/images/species-dogs.jpg",
    accentRing: "from-rose-500 to-amber-400",
  },
  {
    id: "cats",
    name: "Cats",
    count: "125+ Products",
    tagline: "Puzzle toys, can lids & strip feeders",
    image: "/images/species-cats.jpg",
    accentRing: "from-indigo-500 to-violet-400",
  },
  {
    id: "reptiles",
    name: "Reptiles",
    count: "64+ Products",
    tagline: "Lamp stands, snake tongs & terrariums",
    image: "/images/species-reptiles.jpg",
    accentRing: "from-teal-500 to-emerald-400",
  },
  {
    id: "birds",
    name: "Birds",
    count: "58+ Products",
    tagline: "Natural perches & foraging toys",
    image: "/images/species-birds.jpg",
    accentRing: "from-sky-500 to-cyan-400",
  },
  {
    id: "fish",
    name: "Fish & Aquatic",
    count: "82+ Products",
    tagline: "Aquarium filters & oxygen wave pumps",
    image: "/images/species-fish.jpg",
    accentRing: "from-blue-600 to-teal-400",
  },
  {
    id: "small-pets",
    name: "Small Pets",
    count: "76+ Products",
    tagline: "Hamster mazes, cages & grass chew balls",
    image: "/images/species-small.jpg",
    accentRing: "from-amber-500 to-rose-400",
  },
];

export const COLLECTION_PAGES: Record<string, CollectionMeta> = {
  all: {
    slug: "all",
    title: "All EverythingPet Products",
    badge: "Full Catalog",
    description:
      "Your Pet's World, All in One Place — explore everyday essentials, toys, feeders, filters, and habitats across all six pet categories.",
    image: "/images/hero-pets.jpg",
    filterType: "all",
    filterValue: "all",
  },
  sale: {
    slug: "sale",
    title: "On Sale Now & Exclusive Deals",
    badge: "Limited Time Offers",
    description:
      "Save up to 25% on popular waterproof pet mats, heavy-duty natural rubber chew toys, basking lamp stands, and aquarium filters.",
    image: "/images/species-dogs.jpg",
    filterType: "sale",
    filterValue: "sale",
  },
  new: {
    slug: "new",
    title: "New Arrivals",
    badge: "Freshly Stocked",
    description:
      "Newly added merchandise across dogs, cats, reptiles, birds, fish & small animals — all backed by our animal welfare promise.",
    image: "/images/species-small.jpg",
    filterType: "new",
    filterValue: "new",
  },
  dogs: {
    slug: "dogs",
    title: "Dogs Collection",
    badge: "Pet Category",
    description:
      "Natural rubber chew toys, absorbent food & water mats, airtight food storage bins, and rescue-edition walk gear.",
    image: "/images/species-dogs.jpg",
    filterType: "species",
    filterValue: "dogs",
  },
  cats: {
    slug: "cats",
    title: "Cats Collection",
    badge: "Pet Category",
    description:
      "Interactive puzzle toys, universal silicone can lids, no-mess cat strip feeders, and whisker-friendly elevated ceramic bowls.",
    image: "/images/species-cats.jpg",
    filterType: "species",
    filterValue: "cats",
  },
  reptiles: {
    slug: "reptiles",
    title: "Reptiles Collection",
    badge: "Pet Category",
    description:
      "Adjustable terrarium lamp stands and stainless steel reptile & snake tongs built for safe, balanced enclosures.",
    image: "/images/species-reptiles.jpg",
    filterType: "species",
    filterValue: "reptiles",
  },
  birds: {
    slug: "birds",
    title: "Birds Collection",
    badge: "Pet Category",
    description:
      "Handcrafted natural wood perches and organic botanical foraging toys designed for happy, active birds.",
    image: "/images/species-birds.jpg",
    filterType: "species",
    filterValue: "birds",
  },
  fish: {
    slug: "fish",
    title: "Fish & Aquatic Collection",
    badge: "Pet Category",
    description:
      "Ultra-quiet multi-stage aquarium filters and submersible oxygen wave pumps for healthy freshwater & planted aquariums.",
    image: "/images/species-fish.jpg",
    filterType: "species",
    filterValue: "fish",
  },
  "small-pets": {
    slug: "small-pets",
    title: "Small Pets Collection",
    badge: "Pet Category",
    description:
      "Plastic chinchilla & guinea pig cages, wooden hamster mazes, and natural grass chew balls for rabbits and small rodents.",
    image: "/images/species-small.jpg",
    filterType: "species",
    filterValue: "small-pets",
  },
};

export const PARTNER_CHARITIES: PartnerCharity[] = [
  {
    id: "ch-1",
    name: "Second Chance Animal Rescue Network",
    city: "National Partner",
    donated: "$54,400",
    focus: "Emergency shelter food & puppy vaccinations",
  },
  {
    id: "ch-2",
    name: "Safe Paws Feline & Small Animal Sanctuary",
    city: "Regional Shelters",
    donated: "$46,800",
    focus: "Cat medical care, rabbit & rodent habitats",
  },
  {
    id: "ch-3",
    name: "Wings, Scales & Fins Welfare Initiative",
    city: "Exotic Rescue Hubs",
    donated: "$40,800",
    focus: "Rehabilitation for birds, reptiles & aquatic rescues",
  },
];

export const MISSION_BANNER: MissionBannerConfig = {
  badge: "Purpose-Driven Mission",
  titleStart: "Every order covers costs —",
  titleAccent: "remaining profits help animals.",
  description:
    "Unlike ordinary commercial pet stores, EverythingPet operates with a clear mission: after covering baseline product and operational costs, we donate remaining profits directly to animal welfare charities and rescue shelters.",
  image: "/images/mission-welfare.jpg",
  imageAlt: "Animal welfare volunteer holding a happy rescued puppy",
  primaryCtaLabel: "Shop for Animal Welfare",
  primaryAction: { type: "collection", slug: "all" },
  stats: [
    { value: "$142K", label: "Donated to Welfare" },
    { value: "38+", label: "Charity Partners" },
    { value: "100%", label: "Surplus Profit" },
  ],
};

export const NEWSLETTER_BANNER: NewsletterBannerConfig = {
  badge: "EverythingPet Club",
  title: "Get 15% off your first order + exclusive flash deals.",
  description:
    "Join thousands of pet owners getting new arrival alerts across all 6 species, personalized pet care guides, and quarterly charity donation updates.",
  ctaLabel: "Join & Save 15%",
  promoCode: "PET15",
  discountPercent: 15,
  perks: [
    "Instant PET15 code",
    "Early access to On Sale Now",
    "Monthly animal welfare reports",
  ],
};

export const PRODUCTS: Product[] = [
  {
    id: "ep-dog-01",
    name: "Heavy-Duty Natural Rubber Chew Toy",
    species: "dogs",
    speciesLabel: "Dogs",
    price: 18.5,
    oldPrice: 24.0,
    rating: 4.9,
    reviews: 214,
    badge: "sale",
    badgeText: "23% Off",
    collections: ["popular", "sale"],
    mealsFunded: 4,
    variants: ["Small (12cm)", "Medium (16cm)", "Large (20cm)"],
    image: "/images/species-dogs.jpg",
    description:
      "Durable 100% natural rubber chew toy with dental cleaning grooves built for aggressive chewers and daily jaw enrichment.",
  },
  {
    id: "ep-dog-02",
    name: "Waterproof Absorbent Food & Water Mat",
    species: "dogs",
    speciesLabel: "Dogs",
    price: 22.0,
    oldPrice: 29.5,
    rating: 4.8,
    reviews: 168,
    badge: "sale",
    badgeText: "On Sale",
    collections: ["popular", "sale"],
    mealsFunded: 5,
    variants: ["Slate Blue", "Pearl Grey", "Coral Trim"],
    image: "/images/hero-pets.jpg",
    description:
      "Fast-absorbing waterproof pet feeding mat with non-slip rubber base that protects floors from splashes and kibble spills.",
  },
  {
    id: "ep-dog-03",
    name: "Airtight Pet Food Storage Container (15 lb)",
    species: "dogs",
    speciesLabel: "Dogs",
    price: 38.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 97,
    badge: "new",
    badgeText: "New Arrival",
    collections: ["popular", "new"],
    mealsFunded: 8,
    variants: ["15 lb Standard", "25 lb Family Size"],
    image: "/images/species-dogs.jpg",
    description:
      "Airtight silicone-sealed food storage bin locks out humidity and pests while keeping dry kibble fresh. Includes measuring scoop.",
  },
  {
    id: "ep-cat-01",
    name: "Interactive Cat Puzzle Toy & Slow Feeder",
    species: "cats",
    speciesLabel: "Cats",
    price: 29.0,
    oldPrice: 36.0,
    rating: 4.9,
    reviews: 243,
    badge: "sale",
    badgeText: "19% Off",
    collections: ["popular", "sale"],
    mealsFunded: 6,
    variants: ["Natural Oak", "Midnight Slate"],
    image: "/images/species-cats.jpg",
    description:
      "Mental enrichment puzzle feeder that turns mealtime into a rewarding hunt, reducing boredom and fast eating in indoor cats.",
  },
  {
    id: "ep-cat-02",
    name: "Silicone Pet Can Lids & Cat Strip Feeder",
    species: "cats",
    speciesLabel: "Cats",
    price: 14.5,
    oldPrice: null,
    rating: 4.8,
    reviews: 189,
    badge: "popular",
    badgeText: "Popular",
    collections: ["popular"],
    mealsFunded: 3,
    variants: ["3-Pack Lids + Strip Spoon", "5-Pack Value Set"],
    image: "/images/species-cats.jpg",
    description:
      "Universal BPA-free silicone can covers fit 3oz, 5.5oz, and 12oz wet food cans, paired with an easy-squeeze cat treat strip feeder.",
  },
  {
    id: "ep-cat-03",
    name: "Elevated Whisker-Friendly Ceramic Cat Bowls",
    species: "cats",
    speciesLabel: "Cats",
    price: 32.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 131,
    badge: "new",
    badgeText: "New Arrival",
    collections: ["new", "popular"],
    mealsFunded: 7,
    variants: ["Pearl White", "Ocean Teal"],
    image: "/images/hero-pets.jpg",
    description:
      "Tilted 15-degree ceramic dish pair relieves neck strain and prevents whisker fatigue during daily meals.",
  },
  {
    id: "ep-rep-01",
    name: "Adjustable Reptile Terrarium Lamp Stand",
    species: "reptiles",
    speciesLabel: "Reptiles",
    price: 34.0,
    oldPrice: 44.0,
    rating: 4.9,
    reviews: 84,
    badge: "sale",
    badgeText: "23% Off",
    collections: ["sale", "popular"],
    mealsFunded: 7,
    variants: ["Standard (16–28 in)", "Pro Tall (22–38 in)"],
    image: "/images/species-reptiles.jpg",
    description:
      "Heavy-duty steel adjustable lamp stand lets you position heat and UVB domes safely above glass reptile terrariums.",
  },
  {
    id: "ep-rep-02",
    name: "Stainless Steel Reptile & Snake Tongs",
    species: "reptiles",
    speciesLabel: "Reptiles",
    price: 19.5,
    oldPrice: null,
    rating: 4.7,
    reviews: 62,
    badge: "new",
    badgeText: "New Arrival",
    collections: ["new"],
    mealsFunded: 4,
    variants: ["12 in Feeding Tongs", "24 in Handler Tongs"],
    image: "/images/species-reptiles.jpg",
    description:
      "Rust-resistant stainless steel tongs with smooth gentle tips and secure grip handle for safe reptile feeding and enclosure care.",
  },
  {
    id: "ep-bird-01",
    name: "Natural Wood Bird Perch & Foraging Stand",
    species: "birds",
    speciesLabel: "Birds",
    price: 26.5,
    oldPrice: null,
    rating: 4.9,
    reviews: 112,
    badge: "popular",
    badgeText: "Top Rated",
    collections: ["popular", "new"],
    mealsFunded: 5,
    variants: ["Parakeet / Lovebird", "Cockatiel / Conure"],
    image: "/images/species-birds.jpg",
    description:
      "Natural birch wood perch with varying branch widths for healthy bird feet and woven foraging cups for daily beak stimulation.",
  },
  {
    id: "ep-bird-02",
    name: "Natural Shredder & Foraging Bird Toy Pack",
    species: "birds",
    speciesLabel: "Birds",
    price: 17.0,
    oldPrice: 22.0,
    rating: 4.8,
    reviews: 76,
    badge: "sale",
    badgeText: "22% Off",
    collections: ["sale"],
    mealsFunded: 4,
    variants: ["6-Piece Enrichment Bundle"],
    image: "/images/species-birds.jpg",
    description:
      "Safe untreated loofah, sola wood, and organic rattan bird chew toys colored only with pet-safe botanical dyes.",
  },
  {
    id: "ep-fish-01",
    name: "Ultra-Quiet Multi-Stage Aquarium Filter",
    species: "fish",
    speciesLabel: "Fish & Aquatic",
    price: 46.0,
    oldPrice: 58.0,
    rating: 4.9,
    reviews: 158,
    badge: "sale",
    badgeText: "21% Off",
    collections: ["popular", "sale"],
    mealsFunded: 9,
    variants: ["10–20 Gal Tank", "20–45 Gal Tank"],
    image: "/images/species-fish.jpg",
    description:
      "Whisper-quiet 24dB canister & biological filter with ceramic rings and adjustable surface skimmer for clear, healthy tank water.",
  },
  {
    id: "ep-fish-02",
    name: "Submersible Oxygen & Wave Maker Pump",
    species: "fish",
    speciesLabel: "Fish & Aquatic",
    price: 28.5,
    oldPrice: null,
    rating: 4.8,
    reviews: 91,
    badge: "new",
    badgeText: "New Arrival",
    collections: ["new"],
    mealsFunded: 6,
    variants: ["Compact 400 L/H", "Pro 800 L/H"],
    image: "/images/species-fish.jpg",
    description:
      "Boosts dissolved oxygen and circulates natural gentle currents across planted freshwater and tropical fish aquariums.",
  },
  {
    id: "ep-small-01",
    name: "Wooden Hamster Exploration Maze House",
    species: "small-pets",
    speciesLabel: "Small Pets",
    price: 31.0,
    oldPrice: 39.0,
    rating: 4.9,
    reviews: 147,
    badge: "sale",
    badgeText: "20% Off",
    collections: ["popular", "sale"],
    mealsFunded: 6,
    variants: ["6-Chamber Classic", "8-Chamber Deluxe"],
    image: "/images/species-small.jpg",
    description:
      "Nail-free wooden hamster maze with lift-off peek roof that encourages natural burrowing and tunnel play for hamsters and gerbils.",
  },
  {
    id: "ep-small-02",
    name: "Natural Grass Chew Balls for Rabbits & Rodents",
    species: "small-pets",
    speciesLabel: "Small Pets",
    price: 13.5,
    oldPrice: null,
    rating: 4.9,
    reviews: 205,
    badge: "popular",
    badgeText: "Best Seller",
    collections: ["popular"],
    mealsFunded: 3,
    variants: ["6-Ball Pack", "12-Ball Value Pack"],
    image: "/images/species-small.jpg",
    description:
      "Hand-woven sun-cured timothy grass chew balls support healthy dental wear for rabbits, guinea pigs, hamsters, and chinchillas.",
  },
  {
    id: "ep-small-03",
    name: "Plastic Chinchilla & Guinea Pig Habitat Cage",
    species: "small-pets",
    speciesLabel: "Small Pets",
    price: 68.0,
    oldPrice: null,
    rating: 4.8,
    reviews: 73,
    badge: "new",
    badgeText: "New Arrival",
    collections: ["new"],
    mealsFunded: 14,
    variants: ["Standard 4x2 Enclosure", "Expanded 5x2 + Loft"],
    image: "/images/species-small.jpg",
    description:
      "Easy-clean waterproof plastic base with clear ventilated viewing walls gives guinea pigs, bunnies, and chinchillas safe space to explore.",
  },
  {
    id: "ep-dog-04",
    name: "Rescue Charity Edition Hemp Collar & Leash",
    species: "dogs",
    speciesLabel: "Dogs",
    price: 36.0,
    oldPrice: null,
    rating: 5.0,
    reviews: 129,
    badge: "popular",
    badgeText: "Charity Edition",
    collections: ["new", "popular"],
    mealsFunded: 10,
    variants: ["Small / Coral", "Medium / Indigo", "Large / Teal"],
    image: "/images/mission-welfare.jpg",
    description:
      "Soft organic hemp collar & leash set. Every purchase funds 10 hot shelter meals and donates a collar to a rescue animal in need.",
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "ep-guide-1",
    tag: "Dogs & Cats",
    readTime: "3 min read",
    author: "EverythingPet Care Team",
    title: "How Interactive Puzzle Feeders & Waterproof Mats Upgrade Mealtime",
    excerpt:
      "Simple feeding upgrades that slow down anxious eaters, keep floors dry, and keep canned food fresh longer.",
    image: "/images/species-cats.jpg",
    relatedSlug: "cats",
    relatedCtaLabel: "Shop Cat Supplies",
    keyTakeaways: [
      "Puzzle feeders add 10–15 minutes of healthy mental stimulation to daily meals.",
      "Silicone can lids lock in moisture so leftover wet food stays fresh in the fridge.",
      "Waterproof absorbent mats stop bowl sliding and protect hardwood floors.",
    ],
    body: [
      "Mealtimes are one of the easiest ways to enrich your dog or cat's daily routine. Swapping a plain plastic dish for an interactive puzzle feeder or elevated ceramic bowl improves digestion and burns nervous energy.",
      "Pair your bowls with an absorbent waterproof feeding mat and universal silicone can lids to keep kitchen corners spotless and reduce food waste.",
    ],
  },
  {
    id: "ep-guide-2",
    tag: "Small Pets",
    readTime: "4 min read",
    author: "EverythingPet Habitat Desk",
    title: "Setting Up a Cozy Maze & Chew Zone for Rabbits, Hamsters & Guinea Pigs",
    excerpt:
      "Why wooden exploration mazes, modular cages, and natural grass chew balls are essential for small companions.",
    image: "/images/species-small.jpg",
    relatedSlug: "small-pets",
    relatedCtaLabel: "Shop Small Pets",
    keyTakeaways: [
      "Small rodents have continuously growing teeth and need daily timothy grass chew toys.",
      "Multi-chamber wooden mazes mimic natural burrows and lower cage stress.",
      "Washable plastic-base habitats make weekly cleaning quick and odor-free.",
    ],
    body: [
      "Hamsters, rabbits, guinea pigs, and chinchillas thrive when their enclosures offer both open zoomie space and quiet dark hideouts. Adding a nail-free wooden maze gives them safe chambers for sleeping and hoarding snacks.",
      "Always keep fresh woven grass chew balls accessible so your small pet can satisfy natural chewing instincts safely.",
    ],
  },
  {
    id: "ep-guide-3",
    tag: "Fish & Reptiles",
    readTime: "4 min read",
    author: "EverythingPet Exotic Specialists",
    title: "Aquarium Filtration & Terrarium Lamp Positioning Essentials",
    excerpt:
      "Quick setup tips for crystal-clear tank water with wave pumps and accurate basking heat zones for reptiles.",
    image: "/images/species-fish.jpg",
    relatedSlug: "fish",
    relatedCtaLabel: "Shop Fish & Aquatic",
    keyTakeaways: [
      "Multi-stage filters with biological ceramic media stabilize ammonia and nitrite levels.",
      "Submersible wave pumps improve oxygen exchange across every tank corner.",
      "Adjustable steel lamp stands let you fine-tune safe UVB and basking temperatures.",
    ],
    body: [
      "Healthy aquatic and reptile habitats rely on reliable, steady equipment. A whisper-quiet multi-stage filter paired with gentle wave circulation keeps fish vibrant and plants lush without disturbing tank tranquility.",
      "For geckos and lizards, an adjustable lamp stand ensures heat domes sit securely at the exact distance recommended for your species.",
    ],
  },
];

export const INITIAL_ORDERS: Record<string, OrderRecord> = {
  "EP-2026-8412": {
    id: "EP-2026-8412",
    status: "Out for Delivery",
    eta: "Arriving Today by 6:00 PM",
    impactNote: "Funded 11 Shelter Meals",
    steps: [
      {
        title: "Order Confirmed & Charity Profit Logged",
        date: "Nov 21, 2026 · 10:14 AM",
        done: true,
      },
      {
        title: "Packed at EverythingPet Warehouse",
        date: "Nov 22, 2026 · 2:40 PM",
        done: true,
      },
      {
        title: "In Transit — Regional Delivery Hub",
        date: "Nov 23, 2026 · 7:15 AM",
        done: true,
      },
      {
        title: "Out for Local Delivery",
        date: "Nov 24, 2026 · 8:30 AM",
        done: true,
      },
    ],
  },
  "EP-2026-9901": {
    id: "EP-2026-9901",
    status: "Packed & Ready to Ship",
    eta: "Estimated Delivery: Nov 27, 2026",
    impactNote: "Funded 6 Shelter Meals",
    steps: [
      {
        title: "Order Confirmed & Charity Profit Logged",
        date: "Nov 23, 2026 · 4:05 PM",
        done: true,
      },
      {
        title: "Packed at EverythingPet Warehouse",
        date: "Nov 24, 2026 · 11:20 AM",
        done: true,
      },
      {
        title: "In Transit — Regional Delivery Hub",
        date: "Pending carrier scan",
        done: false,
      },
      {
        title: "Out for Local Delivery",
        date: "Pending",
        done: false,
      },
    ],
  },
};

export const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    quote:
      "Ordered the natural rubber chew toy and waterproof food mat for my golden retriever — fast delivery and I love knowing profits go to animal welfare charities.",
    author: "Nadia Rahman",
    petInfo: "Dog & Cat Owner",
    initials: "NR",
    productTag: "Natural Rubber Chew Toy",
    productId: "ep-dog-01",
  },
  {
    id: "rev-2",
    quote:
      "EverythingPet really has everything in one place. I picked up silicone can lids for my cats, a wooden hamster maze, and an aquarium filter in a single order!",
    author: "Daniel Brooks",
    petInfo: "Multi-Pet Parent",
    initials: "DB",
    productTag: "Hamster Exploration Maze",
    productId: "ep-small-01",
  },
  {
    id: "rev-3",
    quote:
      "The adjustable reptile lamp stand and stainless snake tongs are super sturdy, and 24/7 support answered my sizing question in minutes.",
    author: "Sadia Karim",
    petInfo: "Gecko & Aquascape Keeper",
    initials: "SK",
    productTag: "Reptile Lamp Stand",
    productId: "ep-rep-01",
  },
];

export function getProductsByCollectionSlug(slug: string): Product[] {
  const meta = COLLECTION_PAGES[slug];
  if (!meta || meta.filterType === "all") return PRODUCTS;
  if (meta.filterType === "species") {
    return PRODUCTS.filter((p) => p.species === meta.filterValue);
  }
  if (meta.filterType === "sale") {
    return PRODUCTS.filter((p) => p.oldPrice !== null);
  }
  if (meta.filterType === "new") {
    return PRODUCTS.filter((p) => p.collections.includes("new"));
  }
  return PRODUCTS;
}
