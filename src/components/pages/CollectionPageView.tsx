"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import {
  CATEGORY_NAV_ITEMS,
  JOURNAL_ARTICLES,
  type CollectionMeta,
} from "@/data/catalog";
import type { Product, SortOption } from "@/types/ecommerce";
import { useStore } from "@/context/StoreContext";
import DynamicImage from "@/components/common/DynamicImage";
import ProductCard from "@/components/store/ProductCard";

interface CollectionPageViewProps {
  meta: CollectionMeta;
  initialProducts: Product[];
}

export default function CollectionPageView({
  meta,
  initialProducts,
}: CollectionPageViewProps): React.JSX.Element {
  const store = useStore();
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const products = useMemo(() => {
    const q = store.searchQuery.trim().toLowerCase();
    const filtered = initialProducts.filter((p) => {
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.speciesLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });

    if (sortBy === "price-asc")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      return [...filtered].sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [initialProducts, store.searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-10">
      <div className="flex items-center justify-between gap-4 mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to EverythingPet Home
        </Link>
        <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">
          {meta.badge}
        </span>
      </div>

      {/* Midnight-Indigo Dynamic Collection Banner */}
      <section className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white p-6 sm:p-10 lg:p-12 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 bg-white/12 text-teal-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 border border-white/15">
            <Sparkles className="w-3.5 h-3.5" />
            {meta.badge} · {products.length} Products
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.08] mb-3">
            {meta.title}
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/80 max-w-xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl">
            <DynamicImage
              src={meta.image}
              alt={meta.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Switcher Strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/collections/${item.id}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
                meta.slug === item.id
                  ? "bg-indigo-950 text-white"
                  : "bg-slate-100 text-slate-600 hover:text-indigo-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/collections/sale"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
              meta.slug === "sale"
                ? "bg-rose-500 text-white"
                : "bg-rose-50 text-rose-600 hover:bg-rose-100"
            }`}
          >
            On Sale Now
          </Link>
          <Link
            href="/collections/new"
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition shrink-0 ${
              meta.slug === "new"
                ? "bg-teal-600 text-white"
                : "bg-teal-50 text-teal-700 hover:bg-teal-100"
            }`}
          >
            New Arrivals
          </Link>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 shrink-0">
          <span className="text-xs text-slate-500 font-medium">
            <strong className="text-slate-900">{products.length}</strong> items
          </span>
          <select
            aria-label="Sort collection items"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-9 px-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 cursor-pointer focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={store.wishlist.includes(product.id)}
              onAddToCart={store.addToCart}
              onToggleWishlist={store.toggleWishlist}
              onQuickView={store.setQuickViewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl py-14 px-6 text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-2">
            No items matched &ldquo;{store.searchQuery}&rdquo;
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Clear your search or browse all EverythingPet products.
          </p>
          <button
            type="button"
            onClick={() => store.setSearchQuery("")}
            className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-xl transition cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Related Guides */}
      <section className="border-t border-slate-200 pt-12">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-600 mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            Pet Care Resources
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Related Care Guides
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {JOURNAL_ARTICLES.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase text-indigo-600">
                  {post.tag}
                </span>
                <h3 className="font-display text-sm font-bold text-slate-900 group-hover:text-rose-500 line-clamp-2 leading-snug mt-0.5">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-1">
                  Read guide <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
