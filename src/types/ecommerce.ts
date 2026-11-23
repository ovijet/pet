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

export interface NavItem {
  id: CategoryFilter;
  label: string;
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

export interface HeroSlide {
  id: number;
  badge: string;
  titleTop: string;
  titleAccent: string;
  subtitle: string;
  ctaLabel: string;
  targetCategory: CategoryFilter;
  image: string;
  imageAlt: string;
  highlightTag: string;
}

export interface JournalArticle {
  id: string;
  tag: string;
  readTime: string;
  title: string;
  excerpt: string;
  image: string;
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
}

export interface HeaderProps {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onWishlistClick: () => void;
  onCartClick: () => void;
  onTrackOrderClick: () => void;
  onLoginClick: () => void;
  onSelectProduct: (product: Product) => void;
}

export interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  wishlistCount: number;
  onWishlistClick: () => void;
  onCartClick: () => void;
  onLoginClick: () => void;
  onSelectProduct: (product: Product) => void;
}

export interface CategoryNavProps {
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
}
