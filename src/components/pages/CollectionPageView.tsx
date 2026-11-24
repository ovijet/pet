"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Sparkles } from "lucide-react";
import {
  CATEGORY_NAV_ITEMS,
  JOURNAL_ARTICLES,
  LIFESTYLE_CARDS,
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
        p.categoryLabel.toLowerCase().includes(q) ||
        p.petLabel.toLowerCase().includes(q) ||
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
      {/* Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#183A2E] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to PawHaven Home
        </Link>
        <span className="text-xs font-bold text-[#d96b43] uppercase tracking-wider">
          {meta.badge}
        </span>
      </div>

      {/* Dynamic Collection Hero Banner */}
      <section className="relative rounded-[28px] sm:rounded-[34px] overflow-hidden bg-gradient-to-br from-[#183A2E] via-[#14261C] to-[#235241] text-[#FBF8F3] p-6 sm:p-10 lg:p-12 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-lg">
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-1.5 bg-white/12 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            {meta.badge} · {products.length} Curated Items
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.08] mb-3">
            {meta.title}
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
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

      {/* Quick Switcher Strip (Need Categories + Pet Lifestyles) */}
      <div className="bg-white border border-emerald-950/10 rounded-2xl p-3.5 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORY_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/collections/${item.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition shrink-0 ${
                meta.slug === item.id
                  ? "bg-[#183A2E] text-white"
                  : "bg-[#FBF8F3] text-stone-600 hover:text-[#183A2E]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {LIFESTYLE_CARDS.map((card) => (
            <Link
              key={card.id}
              href={`/collections/${card.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition shrink-0 ${
                meta.slug === card.id
                  ? "bg-[#d96b43] text-white"
                  : "bg-[#FBF8F3] text-stone-600 hover:text-[#d96b43]"
              }`}
            >
              {card.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-emerald-950/8 shrink-0">
          <span className="text-xs text-stone-500 font-medium">
            <strong className="text-[#14261C]">{products.length}</strong> items
          </span>
          <select
            aria-label="Sort collection items"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="h-9 px-3.5 rounded-full bg-[#FBF8F3] border border-emerald-950/14 text-xs font-bold text-[#14261C] cursor-pointer focus:outline-none"
          >
            <option value="featured">Sort: Curated</option>
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
        <div className="bg-white border-2 border-dashed border-emerald-950/15 rounded-3xl py-14 px-6 text-center mb-16">
          <h2 className="font-display text-2xl font-semibold text-[#14261C] mb-2">
            No items matched &ldquo;{store.searchQuery}&rdquo;
          </h2>
          <p className="text-sm text-stone-500 mb-5">
            Clear your search term or explore all PawHaven collections.
          </p>
          <button
            type="button"
            onClick={() => store.setSearchQuery("")}
            className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold px-6 py-3 rounded-full transition cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Related Care Journal Strip */}
      <section className="border-t border-emerald-950/10 pt-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d96b43] mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              Related Reading
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#14261C]">
              From The Care Journal
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {JOURNAL_ARTICLES.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-2xl border border-emerald-950/10 p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F3EDE2] shrink-0">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase text-[#d96b43]">
                  {post.tag}
                </span>
                <h3 className="font-display text-sm font-semibold text-[#14261C] group-hover:text-[#d96b43] line-clamp-2 leading-snug mt-0.5">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-400 mt-1">
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

