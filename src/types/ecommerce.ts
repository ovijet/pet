export type NeedCategoryId =
  | "nutrition"
  | "enrichment"
  | "habitats"
  | "wellness"
  | "bundles";

export type CategoryFilter = "all" | NeedCategoryId;

export type PetTypeId =
  | "dogs"
  | "cats"
  | "small-pets"
  | "birds"
  | "reptiles"
  | "fish";

export type CollectionFilter = "all" | "trending" | "fresh" | "drops";
export type SortOption = "featured" | "price-asc" | "price-desc" | "rating";

export type DynamicActionType =
  | { type: "category"; category: CategoryFilter }
  | { type: "pet"; petType: PetTypeId }
  | { type: "section"; sectionId: string }
  | { type: "modal"; modal: "tracker" | "login" | "cart" | "wishlist" | "advisor" };

export interface NavItem {
  id: CategoryFilter;
  label: string;
}

export interface UtilityLinkItem {
  id: string;
  label: string;
  icon: "heart" | "book" | "truck" | "map";
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
  theme: "warm" | "forest";
}

export interface TrustPillarItem {
  id: string;
  icon: "leaf" | "shield" | "heart" | "chat";
  title: string;
  desc: string;
  action: DynamicActionType;
}

export interface LifestyleCardItem {
  id: PetTypeId;
  name: string;
  needCategory: NeedCategoryId;
  count: string;
  tagline: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  category: NeedCategoryId;
  categoryLabel: string;
  petType: PetTypeId;
  petLabel: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  badge: "drop" | "fresh" | "vet";
  badgeText: string;
  collections: ("trending" | "fresh" | "drops")[];
  grantMeals: number;
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
  relatedCategory: NeedCategoryId;
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
  grantNote: string;
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
