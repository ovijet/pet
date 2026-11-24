export type SpeciesId =
  | "dogs"
  | "cats"
  | "reptiles"
  | "birds"
  | "fish"
  | "small-pets";

export type CategoryFilter = "all" | SpeciesId;
export type CollectionFilter = "all" | "popular" | "new" | "sale";
export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export type DynamicActionType =
  | { type: "category"; category: CategoryFilter }
  | { type: "collection"; slug: string }
  | { type: "section"; sectionId: string }
  | {
      type: "modal";
      modal: "tracker" | "login" | "cart" | "wishlist" | "advisor" | "charity";
    };

export interface NavItem {
  id: CategoryFilter;
  label: string;
}

export interface UtilityLinkItem {
  id: string;
  label: string;
  icon: "heart" | "book" | "truck" | "help";
  action: DynamicActionType;
  highlight?: boolean;
  hideOnMobile?: boolean;
}

export interface HeroSlide {
  id: number;
  badge: string;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  ctaLabel: string;
  ctaAction: DynamicActionType;
  secondaryCtaLabel: string;
  secondaryAction: DynamicActionType;
  image: string;
  imageAlt: string;
  highlightTag: string;
}

export interface PromoBannerItem {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  action: DynamicActionType;
  image: string;
  imageAlt: string;
  theme: "coral" | "teal";
}

export interface TrustPillarItem {
  id: string;
  icon: "truck" | "shield" | "heart" | "headset";
  title: string;
  desc: string;
  action: DynamicActionType;
}

export interface SpeciesCategory {
  id: SpeciesId;
  name: string;
  count: string;
  tagline: string;
  image: string;
  accentRing: string;
}

export interface Product {
  id: string;
  name: string;
  species: SpeciesId;
  speciesLabel: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  badge: "sale" | "new" | "popular";
  badgeText: string;
  collections: ("popular" | "new" | "sale")[];
  mealsFunded: number;
  variants: string[];
  image: string;
  description: string;
}

export interface MissionBannerConfig {
  badge: string;
  titleStart: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryAction: DynamicActionType;
  stats: { value: string; label: string }[];
}

export interface NewsletterBannerConfig {
  badge: string;
  title: string;
  description: string;
  ctaLabel: string;
  promoCode: string;
  discountPercent: number;
  perks: string[];
}

export interface JournalArticle {
  id: string;
  tag: string;
  readTime: string;
  author: string;
  title: string;
  excerpt: string;
  image: string;
  relatedSlug: string;
  relatedCtaLabel: string;
  keyTakeaways: string[];
  body: string[];
}

export interface CartItem {
  productId: string;
  variant: string;
  quantity: number;
}

export interface OrderStep {
  title: string;
  date: string;
  done: boolean;
}

export interface OrderRecord {
  id: string;
  status: string;
  eta: string;
  impactNote: string;
  steps: OrderStep[];
}

export interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  petInfo: string;
  initials: string;
  productTag: string;
  productId: string;
}

export interface HeaderProps {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onAction: (action: DynamicActionType) => void;
  onSelectProduct: (product: Product) => void;
  onOpenMobileMenu: () => void;
}

export interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onAction: (action: DynamicActionType) => void;
  onSelectProduct: (product: Product) => void;
  onOpenMobileMenu: () => void;
}

export interface CategoryNavProps {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
  onAction: (action: DynamicActionType) => void;
}
