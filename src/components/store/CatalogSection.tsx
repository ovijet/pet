"use client";

import React from "react";
import { SPECIES_LIST } from "@/data/catalog";
import type {
  CategoryFilter,
  CollectionFilter,
  Product,
  SortOption,
} from "@/types/ecommerce";
import ProductCard from "./ProductCard";

interface CatalogSectionProps {
  products: Product[];
  activeCategory: CategoryFilter;
  setActiveCategory: (category: CategoryFilter) => void;
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
  { id: "all", label: "All Products" },
  { id: "popular", label: "Popular Products" },
  { id: "new", label: "New Arrivals" },
  { id: "sale", label: "Exclusive Deals" },
];

export default function CatalogSection({
  products,
  activeCategory,
  setActiveCategory,
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
    <section
      id="catalog"
      className="max-w-7xl mx-auto px-3 sm:px-8 py-14 sm:py-16"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7 sm:mb-8">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600 mb-2">
            <span className="w-5 h-0.5 bg-indigo-600 rounded-full" />
            EverythingPet Store
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            New Arrivals &amp;{" "}
            <span className="text-rose-500">Popular Picks</span>
          </h2>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {COLLECTION_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCollectionTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                collectionTab === tab.id
                  ? "bg-indigo-950 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3 sm:p-3.5 mb-7 sm:mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
              activeCategory === "all"
                ? "bg-rose-500 text-white"
                : "bg-slate-100 text-slate-600 hover:text-indigo-900"
            }`}
          >
            All Pets
          </button>
          {SPECIES_LIST.map((sp) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => setActiveCategory(sp.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                activeCategory === sp.id
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-indigo-900"
              }`}
            >
              {sp.name}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{products.length}</strong>{" "}
            items
          </span>
          <select
            aria-label="Sort products"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-9 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-14 px-6 text-center">
          <h3 className="font-display text-2xl font-bold text-slate-900 mb-2">
            No pet products matched your filters
          </h3>
          <p className="text-sm text-slate-500 mb-6">
            Clear your search or reset filters to browse all EverythingPet
            categories.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
