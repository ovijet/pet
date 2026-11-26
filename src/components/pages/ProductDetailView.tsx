"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Headphones,
  Heart,
  HeartHandshake,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
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
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 mb-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1 font-semibold hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" /> Home
        </Link>
        <span>/</span>
        <Link
          href={`/collections/${product.species}`}
          className="font-semibold hover:text-indigo-700"
        >
          {product.speciesLabel}
        </Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{product.name}</span>
      </nav>

      <section className="bg-white border border-slate-200/80 rounded-[28px] sm:rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm mb-14">
        <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[420px] lg:min-h-[520px] bg-slate-100">
          <DynamicImage
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-rose-500 text-white text-xs font-bold uppercase tracking-wider">
            {product.badgeText}
          </span>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              href={`/collections/${product.species}`}
              className="text-xs font-bold uppercase tracking-widest text-indigo-600 hover:underline"
            >
              {product.speciesLabel} Supplies
            </Link>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              {product.rating.toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice !== null && (
              <span className="text-base text-slate-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <button
            type="button"
            onClick={() => store.handleAction({ type: "modal", modal: "charity" })}
            className="text-left bg-teal-50 hover:bg-teal-100/80 border border-teal-100 rounded-2xl p-4 flex items-center gap-3 transition cursor-pointer"
          >
            <span className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </span>
            <div>
              <strong className="block text-xs sm:text-sm text-slate-900">
                Funds {product.mealsFunded * qty} shelter animal meals
              </strong>
              <span className="text-xs text-teal-800">
                Surplus profits go directly to animal welfare charities · Tap
                for details
              </span>
            </div>
          </button>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Option: <strong className="text-slate-900">{selectedVariant}</strong>
            </span>
            <div className="flex flex-wrap gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition cursor-pointer ${
                    selectedVariant === variant
                      ? "bg-indigo-950 border-indigo-950 text-white shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400"
                  }`}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-2">
            <div className="inline-flex items-center gap-3 bg-slate-100 rounded-xl px-3.5 py-2.5">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-7 h-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer"
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
                className="w-7 h-7 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 bg-rose-500 hover:bg-indigo-950 text-white text-sm font-bold py-3.5 px-6 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 transition cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart · ${(product.price * qty).toFixed(2)}
            </button>

            <button
              type="button"
              onClick={() => store.toggleWishlist(product.id)}
              aria-label="Save to wishlist"
              className={`w-12 h-12 rounded-xl border flex items-center justify-center transition cursor-pointer shrink-0 ${
                isWishlisted
                  ? "bg-rose-500 border-rose-500 text-white"
                  : "bg-slate-50 border-slate-200 text-slate-800 hover:border-rose-400"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Fast delivery $49+</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>100% Authentic gear</span>
            </div>
            <button
              type="button"
              onClick={() =>
                store.handleAction({ type: "modal", modal: "advisor" })
              }
              className="inline-flex items-center gap-1.5 text-rose-500 font-bold hover:underline cursor-pointer"
            >
              <Headphones className="w-4 h-4 shrink-0" />
              <span>24/7 Pet Support</span>
            </button>
          </div>
        </div>
      </section>

      {/* Related Guide */}
      <section className="mb-14">
        <Link
          href={`/journal/${relatedArticle.id}`}
          className="group bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-indigo-900 text-white rounded-[28px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 hover:shadow-xl transition"
        >
          <div className="relative w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-2xl overflow-hidden shrink-0 border border-white/15">
            <DynamicImage
              src={relatedArticle.image}
              alt={relatedArticle.title}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-teal-300 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Related Pet Care Guide · {relatedArticle.readTime}
            </span>
            <h2 className="font-display text-xl sm:text-2xl font-bold mb-2">
              {relatedArticle.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 mb-3">
              {relatedArticle.excerpt}
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-400">
              Read Full Guide <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Related Products */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-7">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Recommended For You
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Related Pet Supplies
            </h2>
          </div>
          <Link
            href={`/collections/${product.species}`}
            className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-rose-500 underline underline-offset-4"
          >
            View all {product.speciesLabel} →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
