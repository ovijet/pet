import type {
  HeroSlide,
  JournalArticle,
  LifestyleCardItem,
  MissionBannerConfig,
  NavItem,
  NewsletterBannerConfig,
  OrderRecord,
  Product,
  PromoBannerItem,
  ReviewItem,
  TrustPillarItem,
  UtilityLinkItem,
} from "@/types/ecommerce";

export interface CollectionMeta {
  slug: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  filterType: "all" | "category" | "pet" | "drops";
  filterValue: string;
}

export interface PartnerShelter {
  id: string;
  name: string;
  city: string;
  granted: string;
  focus: string;
}

export const SITE_BRAND = {
  nameFirst: "Paw",
  nameSecond: "Haven",
  tagline: "Pet Wellness Studio",
  announcement: "Complimentary eco shipping $55+ · Member code",
  promoCode: "HAVEN20",
  freeShippingThreshold: 55,
  supportEmail: "hello@pawhaven.shop",
};

export const UTILITY_LINKS: UtilityLinkItem[] = [
  {
    id: "u-grants",
    label: "10% Rescue Grant Fund",
    icon: "heart",
    action: { type: "section", sectionId: "grants" },
    highlight: true,
  },
  {
    id: "u-journal",
    label: "Care Journal",
    icon: "book",
    action: { type: "section", sectionId: "journal" },
  },
  {
    id: "u-parcel",
    label: "Parcel Status",
    icon: "truck",
    action: { type: "modal", modal: "tracker" },
  },
  {
    id: "u-advisor",
    label: "Vet Advisors",
    icon: "map",
    action: { type: "modal", modal: "advisor" },
    hideOnMobile: true,
  },
];

export const CATEGORY_NAV_ITEMS: NavItem[] = [
  { id: "all", label: "Explore All" },
  { id: "nutrition", label: "Daily Nutrition" },
  { id: "enrichment", label: "Play & Enrichment" },
  { id: "habitats", label: "Home & Habitats" },
  { id: "wellness", label: "Grooming & Health" },
  { id: "bundles", label: "Starter Kits" },
];

export const QUICK_NAV_LINKS = [
  {
    id: "q-drops",
    label: "Member Drops",
    icon: "sparkles" as const,
    colorClass: "text-[#d96b43] hover:text-[#b9522d]",
    href: "/collections/drops",
  },
  {
    id: "q-journal",
    label: "Care Journal",
    icon: "book" as const,
    colorClass: "text-stone-700 hover:text-[#183A2E]",
    href: "/journal/j-1",
  },
  {
    id: "q-grants",
    label: "Rescue Grants",
    icon: "heart" as const,
    colorClass: "text-emerald-800 hover:text-emerald-950",
    href: "/#grants",
  },
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    badge: "Autumn Wellness Studio",
    titleTop: "Crafted for Happy Tails",
    titleAccent: "& Calm Homes",
    subtitle:
      "Slow-Feeding Ceramics • Natural Enrichment Toys • Breathable Habitats — 10% of every box supports local rescue grants.",
    ctaLabel: "Shop Wellness Edit",
    ctaAction: { type: "category", category: "all" },
    secondaryCtaLabel: "Explore Grants",
    secondaryAction: { type: "section", sectionId: "grants" },
    image: "/images/hero-pets.jpg",
    imageAlt:
      "Golden Retriever and ginger tabby relaxing in a sunlit living room",
    highlightTag: "Vet-Reviewed Craftsmanship",
  },
  {
    id: 1,
    badge: "Indoor Feline Living",
    titleTop: "Smarter Playtime For",
    titleAccent: "Indoor Cats",
    subtitle:
      "Foraging oak puzzles, posture-friendly dining bowls, and fresh meal accessories made for clutter-free homes.",
    ctaLabel: "Browse Enrichment",
    ctaAction: { type: "category", category: "enrichment" },
    secondaryCtaLabel: "Read Cat Guide",
    secondaryAction: { type: "section", sectionId: "journal" },
    image: "/images/species-cats.jpg",
    imageAlt: "Tabby cat inspecting a minimalist wooden puzzle toy",
    highlightTag: "Zero-Plastic Food Contact",
  },
  {
    id: 2,
    badge: "Living Habitats Series",
    titleTop: "Balanced Micro-Worlds",
    titleAccent: "For Exotic Friends",
    subtitle:
      "Silent multi-stage aquascape filtration, thermal basking rigs, and natural birch perches engineered for longevity.",
    ctaLabel: "Explore Habitats",
    ctaAction: { type: "category", category: "habitats" },
    secondaryCtaLabel: "Ask Vet Advisor",
    secondaryAction: { type: "modal", modal: "advisor" },
    image: "/images/species-fish.jpg",
    imageAlt: "Rimless planted freshwater aquascape on minimalist oak stand",
    highlightTag: "Whisper-Quiet 24dB Tech",
  },
];

export const HERO_PROMO_BANNERS: PromoBannerItem[] = [
  {
    id: "promo-starter-kits",
    badge: "CURATED BOXES",
    title: "New Pet Starter Kits",
    subtitle: "Bundle collars, bowls & chews · Save 20%",
    ctaLabel: "Open Starter Kits",
    action: { type: "category", category: "bundles" },
    image: "/images/mission-welfare.jpg",
    imageAlt: "Happy rescued puppy in starter kit showcase",
    theme: "warm",
  },
  {
    id: "promo-wellness-studio",
    badge: "CLEAN CARE STUDIO",
    title: "Bio-Filters & Daily Wellness",
    subtitle: "Silent tank filtration & precision care tools",
    ctaLabel: "Open Wellness",
    action: { type: "category", category: "wellness" },
    image: "/images/species-birds.jpg",
    imageAlt: "Pastel lovebird on natural birch stand",
    theme: "forest",
  },
];

export const TRUST_PILLARS: TrustPillarItem[] = [
  {
    id: "tp-ship",
    icon: "leaf",
    title: "Compostable Kraft Shipping",
    desc: "Zero plastic fillers · Free on orders $55+",
    action: { type: "modal", modal: "tracker" },
  },
  {
    id: "tp-vet",
    icon: "shield",
    title: "Vet-Reviewed Craftsmanship",
    desc: "Food-grade ceramic, hemp & natural sap rubber",
    action: { type: "category", category: "wellness" },
  },
  {
    id: "tp-grant",
    icon: "heart",
    title: "10% Rescue Grant Fund",
    desc: "Monthly micro-grants for neighborhood shelters",
    action: { type: "section", sectionId: "grants" },
  },
  {
    id: "tp-chat",
    icon: "chat",
    title: "Live Care Advisors",
    desc: "Tailored nutrition & habitat tips 7 days a week",
    action: { type: "modal", modal: "advisor" },
  },
];

export const LIFESTYLE_CARDS: LifestyleCardItem[] = [
  {
    id: "dogs",
    name: "Canine Living",
    needCategory: "enrichment",
    count: "48 Curated Picks",
    tagline: "Walk gear, dental chews & slow bowls",
    image: "/images/species-dogs.jpg",
  },
  {
    id: "cats",
    name: "Feline Studio",
    needCategory: "nutrition",
    count: "42 Curated Picks",
    tagline: "Elevated dining & mental foraging",
    image: "/images/species-cats.jpg",
  },
  {
    id: "small-pets",
    name: "Burrow & Play",
    needCategory: "habitats",
    count: "31 Curated Picks",
    tagline: "Birch tunnels & meadow hay chews",
    image: "/images/species-small.jpg",
  },
  {
    id: "birds",
    name: "Avian Perch",
    needCategory: "enrichment",
    count: "24 Curated Picks",
    tagline: "Natural branch gyms & rattan toys",
    image: "/images/species-birds.jpg",
  },
  {
    id: "reptiles",
    name: "Warm Terrarium",
    needCategory: "habitats",
    count: "27 Curated Picks",
    tagline: "Precision UVB mounts & tongs",
    image: "/images/species-reptiles.jpg",
  },
  {
    id: "fish",
    name: "Aquascape Care",
    needCategory: "wellness",
    count: "35 Curated Picks",
    tagline: "Bio-filters, wave flow & water care",
    image: "/images/species-fish.jpg",
  },
];

export const COLLECTION_PAGES: Record<string, CollectionMeta> = {
  all: {
    slug: "all",
    title: "Complete PawHaven Edit",
    badge: "All Collections",
    description:
      "Browse every vet-reviewed dining bowl, enrichment puzzle, living habitat, and starter kit across all six companion worlds.",
    image: "/images/hero-pets.jpg",
    filterType: "all",
    filterValue: "all",
  },
  nutrition: {
    slug: "nutrition",
    title: "Daily Nutrition & Dining",
    badge: "Need Collection",
    description:
      "Posture-friendly glazed stoneware bowls, mineral splash mats, airtight kibble vaults, and natural meadow chews.",
    image: "/images/species-dogs.jpg",
    filterType: "category",
    filterValue: "nutrition",
  },
  enrichment: {
    slug: "enrichment",
    title: "Play & Mental Enrichment",
    badge: "Need Collection",
    description:
      "Natural sap dental rings, white-oak cat foraging puzzles, and kiln-dried birch avian activity stands.",
    image: "/images/species-cats.jpg",
    filterType: "category",
    filterValue: "enrichment",
  },
  habitats: {
    slug: "habitats",
    title: "Home & Living Habitats",
    badge: "Need Collection",
    description:
      "Interlocking birch burrow lodges, adjustable reptile thermal lamp stands, and breathable modern enclosures.",
    image: "/images/species-reptiles.jpg",
    filterType: "category",
    filterValue: "habitats",
  },
  wellness: {
    slug: "wellness",
    title: "Grooming, Filtration & Health",
    badge: "Need Collection",
    description:
      "24dB bio-canister aquarium filters, laminar wave pumps, and silicone-tip feeding precision tools.",
    image: "/images/species-fish.jpg",
    filterType: "category",
    filterValue: "wellness",
  },
  bundles: {
    slug: "bundles",
    title: "New Pet Starter Kits",
    badge: "Bundle & Save 20%",
    description:
      "Thoughtfully paired adoption starter boxes, modular bunny playpens, and avian enrichment kits.",
    image: "/images/mission-welfare.jpg",
    filterType: "category",
    filterValue: "bundles",
  },
  drops: {
    slug: "drops",
    title: "Weekly Member Drops",
    badge: "Limited Time Savings",
    description:
      "Our curated weekly markdowns across dental toys, foraging boards, basking stands, and whisper filters.",
    image: "/images/hero-pets.jpg",
    filterType: "drops",
    filterValue: "drops",
  },
  dogs: {
    slug: "dogs",
    title: "Canine Living Studio",
    badge: "Pet Lifestyle",
    description:
      "Durable natural tree-rubber chews, organic hemp walk gear, rapid-dry dining mats, and airtight kibble storage.",
    image: "/images/species-dogs.jpg",
    filterType: "pet",
    filterValue: "dogs",
  },
  cats: {
    slug: "cats",
    title: "Feline Studio",
    badge: "Pet Lifestyle",
    description:
      "Whisker-relief 15° stoneware bowls, oak foraging boards, and platinum silicone fresh-lock wet food covers.",
    image: "/images/species-cats.jpg",
    filterType: "pet",
    filterValue: "cats",
  },
  "small-pets": {
    slug: "small-pets",
    title: "Burrow & Play Studio",
    badge: "Pet Lifestyle",
    description:
      "Nail-free birch burrow mazes, sun-cured timothy hay spheres, and clear-view modular bunny habitats.",
    image: "/images/species-small.jpg",
    filterType: "pet",
    filterValue: "small-pets",
  },
  birds: {
    slug: "birds",
    title: "Avian Perch Studio",
    badge: "Pet Lifestyle",
    description:
      "Organic multi-grip birch stands and botanical-dyed rattan shredder bundles crafted for curious beaks.",
    image: "/images/species-birds.jpg",
    filterType: "pet",
    filterValue: "birds",
  },
  reptiles: {
    slug: "reptiles",
    title: "Warm Terrarium Studio",
    badge: "Pet Lifestyle",
    description:
      "Precision steel basking lamp mounts and gentle silicone-guarded feeding tongs for geckos and reptiles.",
    image: "/images/species-reptiles.jpg",
    filterType: "pet",
    filterValue: "reptiles",
  },
  fish: {
    slug: "fish",
    title: "Aquascape Care Studio",
    badge: "Pet Lifestyle",
    description:
      "Whisper-quiet multi-stage biological filtration and laminar surface wave pumps for crystal planted tanks.",
    image: "/images/species-fish.jpg",
    filterType: "pet",
    filterValue: "fish",
  },
};

export const PARTNER_SHELTERS: PartnerShelter[] = [
  {
    id: "sh-1",
    name: "Greenway Foster Collective",
    city: "Portland, OR",
    granted: "$34,200",
    focus: "Puppy vaccinations & foster starter boxes",
  },
  {
    id: "sh-2",
    name: "Meadowlark Cat & Bunny Haven",
    city: "Austin, TX",
    granted: "$28,900",
    focus: "Senior feline dental care & rabbit enclosures",
  },
  {
    id: "sh-3",
    name: "Harbor Wings & Exotic Rescue",
    city: "Seattle, WA",
    granted: "$34,900",
    focus: "Avian rehabilitation & reptile thermal habitats",
  },
];

export const MISSION_BANNER: MissionBannerConfig = {
  badge: "PawHaven Rescue Grants",
  titleStart: "Better daily care at home",
  titleAccent: "funds second chances.",
  description:
    "Ten percent of every PawHaven box automatically feeds our quarterly Rescue Grant Pool—funding emergency vet clinics, starter adoption kits, and warm foster supplies.",
  image: "/images/mission-welfare.jpg",
  imageAlt: "Rescue volunteer comforting a happy young dog",
  primaryCtaLabel: "Shop Starter Kits",
  primaryAction: { type: "category", category: "bundles" },
  stats: [
    { value: "$98K", label: "Grants Issued" },
    { value: "29", label: "Local Rescues" },
    { value: "10%", label: "Every Order Box" },
  ],
};

export const NEWSLETTER_BANNER: NewsletterBannerConfig = {
  badge: "Haven Pass",
  title: "Unlock 20% off your first starter kit + weekly vet tips.",
  description:
    "Receive early access to weekly member drops, seasonal pet wellness guides, and our quarterly rescue grant ledger.",
  ctaLabel: "Claim 20% Off",
  promoCode: "HAVEN20",
  discountPercent: 20,
  perks: ["Instant HAVEN20 code", "Vet-reviewed guides", "Unsubscribe anytime"],
};

export const PRODUCTS: Product[] = [
  {
    id: "ph-01",
    name: "TerraChew Natural Sap Dental Ring",
    category: "enrichment",
    categoryLabel: "Play & Enrichment",
    petType: "dogs",
    petLabel: "Canine",
    price: 19.0,
    oldPrice: 25.0,
    rating: 4.9,
    reviews: 192,
    badge: "drop",
    badgeText: "Member Drop",
    collections: ["trending", "drops"],
    grantMeals: 4,
    variants: ["Small · Terracotta", "Medium · Sage", "Large · Charcoal"],
    image: "/images/species-dogs.jpg",
    description:
      "Molded from resilient single-origin tree rubber with gentle massaging grooves that clean molars during daily chew sessions.",
  },
  {
    id: "ph-02",
    name: "DryStone Slate Dining Mat",
    category: "nutrition",
    categoryLabel: "Daily Nutrition",
    petType: "dogs",
    petLabel: "Canine & Feline",
    price: 24.0,
    oldPrice: 31.0,
    rating: 4.8,
    reviews: 154,
    badge: "drop",
    badgeText: "Save 22%",
    collections: ["trending", "drops"],
    grantMeals: 5,
    variants: ["Sandstone Oat", "Deep Pine", "Warm Clay"],
    image: "/images/hero-pets.jpg",
    description:
      "Rapid-evaporation mineral weave absorbs splashes in seconds while keeping ceramic bowls anchored cleanly in place.",
  },
  {
    id: "ph-03",
    name: "LarderSeal Fresh Kibble Tin (18 lb)",
    category: "nutrition",
    categoryLabel: "Daily Nutrition",
    petType: "dogs",
    petLabel: "Canine",
    price: 42.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 88,
    badge: "fresh",
    badgeText: "Just Landed",
    collections: ["trending", "fresh"],
    grantMeals: 8,
    variants: ["18 lb Cream", "28 lb Forest"],
    image: "/images/species-dogs.jpg",
    description:
      "Powder-coated steel pantry canister with a vacuum silicone rim and a solid walnut portion scoop that clips under the lid.",
  },
  {
    id: "ph-04",
    name: "LoomOak Foraging Cat Treat Board",
    category: "enrichment",
    categoryLabel: "Play & Enrichment",
    petType: "cats",
    petLabel: "Feline",
    price: 31.0,
    oldPrice: 38.0,
    rating: 4.9,
    reviews: 229,
    badge: "drop",
    badgeText: "18% Off",
    collections: ["trending", "drops"],
    grantMeals: 6,
    variants: ["Natural White Oak", "Smoked Walnut"],
    image: "/images/species-cats.jpg",
    description:
      "Encourages healthy mental stimulation and slower grazing with removable stoneware cups that rinse spotless in seconds.",
  },
  {
    id: "ph-05",
    name: "FreshCap Silicone Tin Covers & Spoon Duo",
    category: "nutrition",
    categoryLabel: "Daily Nutrition",
    petType: "cats",
    petLabel: "Feline",
    price: 15.0,
    oldPrice: null,
    rating: 4.8,
    reviews: 173,
    badge: "vet",
    badgeText: "Vet Approved",
    collections: ["trending"],
    grantMeals: 3,
    variants: ["Earth Trio Set", "5-Piece Pantry Pack"],
    image: "/images/species-cats.jpg",
    description:
      "Platinum-cured silicone lids seal three standard wet-food can sizes airtight, paired with a curved squeeze treat server.",
  },
  {
    id: "ph-06",
    name: "PostureLift 15° Stoneware Bowl Pair",
    category: "nutrition",
    categoryLabel: "Daily Nutrition",
    petType: "cats",
    petLabel: "Feline",
    price: 34.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 141,
    badge: "fresh",
    badgeText: "New Release",
    collections: ["fresh", "trending"],
    grantMeals: 7,
    variants: ["Alabaster Glaze", "Moss Matte"],
    image: "/images/hero-pets.jpg",
    description:
      "Wide shallow ceramic basins relieve whisker pressure and gently elevate posture to support smooth digestion.",
  },
  {
    id: "ph-07",
    name: "SolarArc Adjustable Terrarium Lamp Arm",
    category: "habitats",
    categoryLabel: "Home & Habitats",
    petType: "reptiles",
    petLabel: "Reptile",
    price: 36.0,
    oldPrice: 46.0,
    rating: 4.9,
    reviews: 79,
    badge: "drop",
    badgeText: "22% Off",
    collections: ["drops", "trending"],
    grantMeals: 7,
    variants: ["Compact (16–28 in)", "Studio Tall (22–38 in)"],
    image: "/images/species-reptiles.jpg",
    description:
      "Weighted anti-tip steel stand lets keepers fine-tune exact heat and UVB distance across glass enclosures.",
  },
  {
    id: "ph-08",
    name: "SoftTip Precision Terrarium Feeding Tongs",
    category: "wellness",
    categoryLabel: "Grooming & Health",
    petType: "reptiles",
    petLabel: "Reptile",
    price: 18.5,
    oldPrice: null,
    rating: 4.8,
    reviews: 58,
    badge: "fresh",
    badgeText: "New Release",
    collections: ["fresh"],
    grantMeals: 4,
    variants: ["10 in Straight", "15 in Angled"],
    image: "/images/species-reptiles.jpg",
    description:
      "Brushed stainless steel with soft silicone guards protects delicate snouts during hand-feeding and tank tidying.",
  },
  {
    id: "ph-09",
    name: "WildBirch Multi-Grip Avian Activity Stand",
    category: "enrichment",
    categoryLabel: "Play & Enrichment",
    petType: "birds",
    petLabel: "Avian",
    price: 28.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 104,
    badge: "vet",
    badgeText: "Vet Approved",
    collections: ["trending", "fresh"],
    grantMeals: 5,
    variants: ["Lovebird / Budgie", "Cockatiel / Conure"],
    image: "/images/species-birds.jpg",
    description:
      "Organic kiln-dried birch limbs with natural bark texture strengthen foot tendons while woven palm cups invite foraging.",
  },
  {
    id: "ph-10",
    name: "MeadowWeave Shredder & Rattan Bird Box",
    category: "bundles",
    categoryLabel: "Starter Kits",
    petType: "birds",
    petLabel: "Avian",
    price: 21.0,
    oldPrice: 27.0,
    rating: 4.8,
    reviews: 69,
    badge: "drop",
    badgeText: "22% Off",
    collections: ["drops"],
    grantMeals: 4,
    variants: ["6-Toy Enrichment Kit"],
    image: "/images/species-birds.jpg",
    description:
      "Curated bundle of untreated sola wood, dried loofah, and palm braids tinted only with fruit and botanical extracts.",
  },
  {
    id: "ph-11",
    name: "StillWater 24dB Bio-Canister Filter",
    category: "wellness",
    categoryLabel: "Grooming & Health",
    petType: "fish",
    petLabel: "Aquatic",
    price: 49.0,
    oldPrice: 62.0,
    rating: 4.9,
    reviews: 164,
    badge: "drop",
    badgeText: "21% Off",
    collections: ["trending", "drops"],
    grantMeals: 9,
    variants: ["10–25 Gal", "25–50 Gal"],
    image: "/images/species-fish.jpg",
    description:
      "Three-stage biological and mechanical filtration powered by a whisper-silent magnetic rotor for crystal-clear planted tanks.",
  },
  {
    id: "ph-12",
    name: "StreamBreeze Gentle Surface Wave Pump",
    category: "wellness",
    categoryLabel: "Grooming & Health",
    petType: "fish",
    petLabel: "Aquatic",
    price: 29.5,
    oldPrice: null,
    rating: 4.8,
    reviews: 83,
    badge: "fresh",
    badgeText: "Just Landed",
    collections: ["fresh"],
    grantMeals: 6,
    variants: ["Nano 400 L/H", "Planted 800 L/H"],
    image: "/images/species-fish.jpg",
    description:
      "Delivers laminar oxygenation currents that nourish aquatic leaves without uprooting delicate carpeting stems.",
  },
  {
    id: "ph-13",
    name: "TimberDen 6-Room Hamster Burrow Lodge",
    category: "habitats",
    categoryLabel: "Home & Habitats",
    petType: "small-pets",
    petLabel: "Small Pet",
    price: 33.0,
    oldPrice: 41.0,
    rating: 4.9,
    reviews: 139,
    badge: "drop",
    badgeText: "20% Off",
    collections: ["trending", "drops"],
    grantMeals: 6,
    variants: ["6-Room Classic", "8-Room Panorama"],
    image: "/images/species-small.jpg",
    description:
      "Glue-free, nail-free interlocking birch chambers with a removable inspection roof for stress-free nesting checks.",
  },
  {
    id: "ph-14",
    name: "SunCured Timothy & Applewood Chew Trio",
    category: "nutrition",
    categoryLabel: "Daily Nutrition",
    petType: "small-pets",
    petLabel: "Small Pet",
    price: 14.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 198,
    badge: "vet",
    badgeText: "Best Seller",
    collections: ["trending"],
    grantMeals: 3,
    variants: ["6-Sphere Tin", "12-Sphere Refill"],
    image: "/images/species-small.jpg",
    description:
      "Hand-braided meadow timothy hay and sweet orchard twigs support healthy tooth wear for bunnies and guinea pigs.",
  },
  {
    id: "ph-15",
    name: "ClearView Modular Bunny Playpen Kit",
    category: "bundles",
    categoryLabel: "Starter Kits",
    petType: "small-pets",
    petLabel: "Small Pet",
    price: 72.0,
    oldPrice: null,
    rating: 4.9,
    reviews: 67,
    badge: "fresh",
    badgeText: "Starter Bundle",
    collections: ["fresh"],
    grantMeals: 14,
    variants: ["4x2 Studio Pen", "5x2 Loft Bundle"],
    image: "/images/species-small.jpg",
    description:
      "Includes washable waterproof liner, snap-in clear acrylic windows, hay rack, and two woven chew spheres.",
  },
  {
    id: "ph-16",
    name: "New Puppy Welcome Kit (Hemp Collar + Mat + Toy)",
    category: "bundles",
    categoryLabel: "Starter Kits",
    petType: "dogs",
    petLabel: "Canine",
    price: 54.0,
    oldPrice: 68.0,
    rating: 5.0,
    reviews: 146,
    badge: "vet",
    badgeText: "Grant Edition",
    collections: ["fresh", "trending", "drops"],
    grantMeals: 12,
    variants: ["Small Breed", "Medium Breed", "Large Breed"],
    image: "/images/mission-welfare.jpg",
    description:
      "Our signature adoption starter box: soft woven hemp collar, brass leash, absorbent dining mat, and natural rubber chew.",
  },
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "j-1",
    tag: "Feline Care",
    readTime: "3 min read",
    author: "Dr. Elena Vance, DVM",
    title: "Why Elevated 15° Bowls Prevent Whisker Stress at Mealtime",
    excerpt:
      "A quick guide from our nutrition advisors on bowl depth, ceramic hygiene, and calmer indoor eating routines.",
    image: "/images/species-cats.jpg",
    relatedCategory: "nutrition",
    relatedCtaLabel: "Shop Daily Nutrition",
    keyTakeaways: [
      "Shallow wide stoneware prevents sensitive whiskers from brushing cold rim walls.",
      "A gentle 15° tilt keeps the esophagus aligned and reduces post-meal regurgitation.",
      "Glazed non-porous ceramic avoids the micro-scratches that trap bacteria in plastic bowls.",
    ],
    body: [
      "If your cat paws kibble onto the floor before eating or leaves food around the outer edges of the bowl, they may be experiencing whisker fatigue. Cat whiskers are densely packed sensory organs that register tiny changes in air pressure and touch.",
      "Switching to a wide, gently tilted ceramic dish transforms mealtime into a relaxed ritual. Pair it with an absorbent mineral dining mat and wash basins daily with warm mild soap for spotless hygiene.",
    ],
  },
  {
    id: "j-2",
    tag: "Small Pets",
    readTime: "4 min read",
    author: "Maya Lin, Exotic Habitat Lead",
    title: "Designing a Stress-Free Natural Burrow Zone for Bunnies & Hamsters",
    excerpt:
      "How multi-chamber birch hideouts and sun-cured timothy chews spark instinctual exploration every evening.",
    image: "/images/species-small.jpg",
    relatedCategory: "habitats",
    relatedCtaLabel: "Shop Home & Habitats",
    keyTakeaways: [
      "Provide at least 6–8 inches of dust-free paper bedding beneath wooden burrow lodges.",
      "Rotate untreated applewood and timothy spheres weekly to encourage healthy tooth wear.",
      "Choose nail-free dovetail birch joinery with a lift-off lid for calm health checks.",
    ],
    body: [
      "Rabbits, hamsters, and guinea pigs are natural tunnel architects. Giving them dark, quiet multi-chamber wooden rooms inside a bright open enclosure dramatically lowers stress hormones.",
      "Scatter small herb treats inside woven grass chew balls right before dusk to mimic natural evening foraging and keep curious minds happily engaged.",
    ],
  },
  {
    id: "j-3",
    tag: "Aquascape",
    readTime: "5 min read",
    author: "Tariq Rahman, Aquatic Specialist",
    title: "Balancing Gentle Flow & Bio-Filtration in Planted Freshwater Tanks",
    excerpt:
      "Keep dissolved oxygen high and water glass-clear without disturbing sensitive shrimp or stem plants.",
    image: "/images/species-fish.jpg",
    relatedCategory: "wellness",
    relatedCtaLabel: "Shop Grooming & Health",
    keyTakeaways: [
      "Aim for 4x–6x tank volume turnover per hour using diffused lily-pipe or laminar flow.",
      "Never rinse biological ceramic rings in tap water—swish gently in old tank water instead.",
      "Subtle surface agitation drives oxygen exchange without stripping dissolved CO2.",
    ],
    body: [
      "A thriving freshwater aquascape depends on invisible beneficial bacteria living inside your canister media. Choosing a whisper-quiet 24dB magnetic impeller keeps your living space serene while stabilizing water parameters around the clock.",
      "Combine multi-stage bio-filtration with gentle surface ripples to prevent biofilm and keep both tropical fish and lush green stem plants flourishing.",
    ],
  },
];

export const INITIAL_ORDERS: Record<string, OrderRecord> = {
  "PH-2026-5104": {
    id: "PH-2026-5104",
    status: "Out for Local Delivery",
    eta: "Arriving Today before 6:00 PM",
    grantNote: "12 Rescue Meals Granted",
    steps: [
      {
        title: "Order Confirmed & Rescue Grant Allocated",
        date: "Nov 20, 2026 · 09:42 AM",
        done: true,
      },
      {
        title: "Packed in Compostable Kraft Box",
        date: "Nov 21, 2026 · 01:18 PM",
        done: true,
      },
      {
        title: "Arrived at Metro Courier Facility",
        date: "Nov 22, 2026 · 06:50 AM",
        done: true,
      },
      {
        title: "Out for Doorstep Delivery",
        date: "Nov 23, 2026 · 08:15 AM",
        done: true,
      },
    ],
  },
  "PH-2026-7820": {
    id: "PH-2026-7820",
    status: "Packed at PawHaven Studio",
    eta: "Estimated Arrival: Nov 26, 2026",
    grantNote: "7 Rescue Meals Granted",
    steps: [
      {
        title: "Order Confirmed & Rescue Grant Allocated",
        date: "Nov 22, 2026 · 03:20 PM",
        done: true,
      },
      {
        title: "Packed in Compostable Kraft Box",
        date: "Nov 23, 2026 · 10:05 AM",
        done: true,
      },
      {
        title: "Metro Courier Dispatch",
        date: "Awaiting evening pickup",
        done: false,
      },
      {
        title: "Out for Doorstep Delivery",
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
      "PawHaven feels like a design studio built by veterinarians. The Puppy Welcome Kit arrived in zero-plastic packaging and our golden loves the hemp collar.",
    author: "Farhana Ahmed",
    petInfo: "Golden Retriever Parent",
    initials: "FA",
    productTag: "Puppy Welcome Kit",
    productId: "ph-16",
  },
  {
    id: "rev-2",
    quote:
      "The LoomOak treat board completely stopped my two indoor cats from gulping dry kibble. Plus it blends right into our oak living room floor.",
    author: "Lucas Bennett",
    petInfo: "Cat Dad to Olive & Milo",
    initials: "LB",
    productTag: "LoomOak Treat Board",
    productId: "ph-04",
  },
  {
    id: "rev-3",
    quote:
      "Switched my 20-gallon planted tank to the StillWater bio-filter—literally silent even in my bedroom, and my plants look crisper than ever.",
    author: "Tasnim Hasan",
    petInfo: "Planted Tank & Gecko Keeper",
    initials: "TH",
    productTag: "StillWater Filter",
    productId: "ph-11",
  },
];

export function getProductsByCollectionSlug(slug: string): Product[] {
  const meta = COLLECTION_PAGES[slug];
  if (!meta || meta.filterType === "all") return PRODUCTS;
  if (meta.filterType === "category") {
    return PRODUCTS.filter((p) => p.category === meta.filterValue);
  }
  if (meta.filterType === "pet") {
    return PRODUCTS.filter((p) => p.petType === meta.filterValue);
  }
  if (meta.filterType === "drops") {
    return PRODUCTS.filter((p) => p.oldPrice !== null);
  }
  return PRODUCTS;
}
