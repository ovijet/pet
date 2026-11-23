"use client";

import React from "react";
import { CATEGORY_NAV_ITEMS } from "@/data/catalog";
import type {
  CategoryFilter,
  CollectionFilter,
  PetTypeId,
  Product,
  SortOption,
} from "@/types/ecommerce";
import ProductCard from "./ProductCard";

interface CatalogSectionProps {
  products: Product[];
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
  activePetType: PetTypeId | "all";
  setActivePetType: (petType: PetTypeId | "all") => void;
  collectionTab: CollectionFilter;
  setCollectionTab: (tab: CollectionFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  wishlist: string[];
  onResetFilters: () => void;
  onAddToCart: (product: Product, variant?: string) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

const COLLECTION_TABS: { id: CollectionFilter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "trending", label: "Most Loved" },
  { id: "fresh", label: "Just Landed" },
  { id: "drops", label: "Member Drops" },
];

export default function CatalogSection({
  products,
  activeCategory,
  setActiveCategory,
  activePetType,
  setActivePetType,
  collectionTab,
  setCollectionTab,
  sortBy,
  setSortBy,
  wishlist,
  onResetFilters,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}: CatalogSectionProps): React.JSX.Element {
  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
            <span className="w-5 h-0.5 bg-[#d96b43] rounded-full" />
            PawHaven Edit
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
            Everyday Care &amp;{" "}
            <span className="italic font-medium text-[#d96b43]">
              Enrichment
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {COLLECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCollectionTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                collectionTab === tab.id
                  ? "bg-[#183A2E] text-[#FBF8F3] shadow-sm"
                  : "bg-white border border-emerald-950/12 text-stone-600 hover:border-[#183A2E] hover:text-[#183A2E]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="bg-white border border-emerald-950/10 rounded-2xl p-3.5 mb-8 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORY_NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveCategory(item.id);
                setActivePetType("all");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeCategory === item.id && activePetType === "all"
                  ? "bg-[#d96b43] text-white"
                  : "bg-[#FBF8F3] text-stone-600 hover:text-[#183A2E]"
              }`}
            >
              {item.label}
            </button>
          ))}
          {activePetType !== "all" && (
            <button
              type="button"
              onClick={() => setActivePetType("all")}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#183A2E] text-amber-300 cursor-pointer"
            >
              Pet: {activePetType} ×
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-stone-500 font-medium">
            Showing <strong className="text-[#14261C]">{products.length}</strong>{" "}
            designs
          </span>
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-9 px-3.5 rounded-full bg-[#FBF8F3] border border-emerald-950/14 text-xs font-bold text-[#14261C] cursor-pointer focus:outline-none focus:border-[#183A2E]"
          >
            <option value="featured">Sort: Curated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-emerald-950/15 rounded-3xl py-16 px-6 text-center">
          <h3 className="font-display text-2xl font-semibold text-[#14261C] mb-2">
            No items matched that combination
          </h3>
          <p className="text-sm text-stone-500 mb-6">
            Clear your search or reset category filters to browse the full studio.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
