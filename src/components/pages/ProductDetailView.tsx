"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Heart,
  HeartHandshake,
  Leaf,
  MessageCircleHeart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
} from "lucide-react";
import type { JournalArticle, Product } from "@/types/ecommerce";
import { useStore } from "@/context/StoreContext";
import DynamicImage from "@/components/common/DynamicImage";
import ProductCard from "@/components/store/ProductCard";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
  relatedArticle: JournalArticle;
}

export default function ProductDetailView({
  product,
  relatedProducts,
  relatedArticle,
}: ProductDetailViewProps): React.JSX.Element {
  const store = useStore();
  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0]
  );
  const [qty, setQty] = useState<number>(1);

  const isWishlisted = store.wishlist.includes(product.id);

  const handleAdd = () => {
    store.addToCart(product, selectedVariant, qty);
    store.setCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-500 mb-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-semibold hover:text-[#183A2E]"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <span>/</span>
        <Link
          href={`/collections/${product.category}`}
          className="font-semibold hover:text-[#183A2E]"
        >
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#14261C] font-bold truncate">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <section className="bg-white border border-emerald-950/10 rounded-[28px] sm:rounded-[34px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm mb-14">
        <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[540px] bg-[#F3EDE2]">
          <DynamicImage
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#183A2E] text-amber-300 text-xs font-bold uppercase tracking-wider">
            {product.badgeText}
          </span>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Link
                href={`/collections/${product.category}`}
                className="text-xs font-bold uppercase tracking-widest text-[#d96b43] hover:underline"
              >
                {product.categoryLabel}
              </Link>
              <span className="text-stone-300">·</span>
              <Link
                href={`/collections/${product.petType}`}
                className="text-xs font-bold text-emerald-800 hover:underline"
              >
                {product.petLabel} Studio
              </Link>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#14261C]">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#14261C] leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-[#14261C]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice !== null && (
              <span className="text-base text-stone-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {product.description}
          </p>

          {/* Rescue Grant Callout */}
          <button
            type="button"
            onClick={() =>
              store.handleAction({ type: "section", sectionId: "grants" })
            }
            className="text-left bg-[#E6EFE9] hover:bg-[#dbe8df] rounded-2xl p-4 flex items-center gap-3 transition cursor-pointer"
          >
            <span className="w-10 h-10 rounded-xl bg-[#183A2E] text-amber-300 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <div>
              <strong className="block text-xs sm:text-sm text-[#14261C]">
                Grants {product.grantMeals * qty} warm foster meals
              </strong>
              <span className="text-xs text-emerald-900/75">
                10% of this item feeds the PawHaven Rescue Grant Fund · Tap to
                view partner shelters
              </span>
            </div>
          </button>

          {/* Variant Picker */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
              Choose Edition:{" "}
              <strong className="text-[#14261C]">{selectedVariant}</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                    selectedVariant === variant
                      ? "bg-[#183A2E] border-[#183A2E] text-white shadow-xs"
                      : "bg-[#FBF8F3] border-emerald-950/15 text-[#14261C] hover:border-[#183A2E]"
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Bag + Wishlist */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-3 bg-[#FBF8F3] border border-emerald-950/15 rounded-full px-3.5 py-2.5">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold min-w-[20px] text-center">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-7 h-7 rounded-full hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold py-3.5 px-6 rounded-full inline-flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag · ${(product.price * qty).toFixed(2)}
            </button>

            <button
              type="button"
              onClick={() => store.toggleWishlist(product.id)}
              aria-label="Save to favorites"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition cursor-pointer shrink-0 ${
                isWishlisted
                  ? "bg-[#d96b43] border-[#d96b43] text-white"
                  : "bg-[#FBF8F3] border-emerald-950/15 text-[#14261C] hover:border-[#d96b43]"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>

          {/* Guarantees + Vet Advisor */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-emerald-950/10 text-xs">
            <div className="flex items-center gap-2 text-stone-600">
              <Leaf className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Plastic-free parcel</span>
            </div>
            <div className="flex items-center gap-2 text-stone-600">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Vet-reviewed materials</span>
            </div>
            <button
              type="button"
              onClick={() =>
                store.handleAction({ type: "modal", modal: "advisor" })
              }
              className="inline-flex items-center gap-1.5 text-[#d96b43] font-bold hover:underline cursor-pointer"
            >
              <MessageCircleHeart className="w-4 h-4 shrink-0" />
              <span>Ask sizing advisor</span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Care Guide Banner */}
      <section className="mb-14">
        <Link
          href={`/journal/${relatedArticle.id}`}
          className="group bg-[#14261C] text-[#FBF8F3] rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition"
        >
          <div className="relative w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden shrink-0">
            <DynamicImage
              src={relatedArticle.image}
              alt={relatedArticle.title}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Related Vet Care Guide · {relatedArticle.readTime}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-semibold mb-2">
              {relatedArticle.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 mb-3">
              {relatedArticle.excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
              Read Full Guide <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Related Products Grid */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d96b43]">
              Pairs Well With
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#14261C] mt-1">
              Related Essentials
            </h2>
          </div>
          <Link
            href={`/collections/${product.category}`}
            className="text-xs sm:text-sm font-bold text-[#183A2E] hover:text-[#d96b43] underline underline-offset-4"
          >
            View all {product.categoryLabel} →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {relatedProducts.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              isWishlisted={store.wishlist.includes(item.id)}
              onAddToCart={store.addToCart}
              onToggleWishlist={store.toggleWishlist}
              onQuickView={store.setQuickViewProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

