"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles, Star } from "lucide-react";
import {
  JOURNAL_ARTICLES,
  NEWSLETTER_BANNER,
  PRODUCTS,
  REVIEWS,
  SPECIES_LIST,
} from "@/data/catalog";
import type { Product, SpeciesId } from "@/types/ecommerce";
import DynamicImage from "@/components/common/DynamicImage";
import ProductCard from "./ProductCard";

interface ConciergeSectionProps {
  wishlist: string[];
  onAddToCart: (product: Product, variant?: string) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNotify: (msg: string) => void;
}

export default function ConciergeSection({
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
  onNotify,
}: ConciergeSectionProps): React.JSX.Element {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesId>("dogs");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const recommended = useMemo(() => {
    const exact = PRODUCTS.filter((p) => p.species === selectedSpecies);
    if (exact.length >= 3) return exact.slice(0, 3);
    const extras = PRODUCTS.filter((p) => p.species !== selectedSpecies).slice(
      0,
      3 - exact.length
    );
    return [...exact, ...extras];
  }, [selectedSpecies]);

  const handleJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      onNotify("Please enter a valid email address");
      return;
    }
    setJoined(true);
    setEmail("");
    onNotify(
      `Welcome to ${NEWSLETTER_BANNER.badge}! Use code ${NEWSLETTER_BANNER.promoCode} for ${NEWSLETTER_BANNER.discountPercent}% off.`
    );
  };

  return (
    <>
      {/* Personalized Recommendations */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 pt-14 sm:pt-16 pb-8">
        <div className="bg-white border border-slate-200/80 rounded-[30px] p-5 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7 sm:mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Personalized Recommendations
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Picked for{" "}
                <span className="text-rose-500">Your Pet</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {SPECIES_LIST.map((sp) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => setSelectedSpecies(sp.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedSpecies === sp.id
                      ? "bg-indigo-950 border-indigo-950 text-white shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-400"
                  }`}
                >
                  {sp.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {recommended.map((product) => (
              <ProductCard
                key={`rec-${product.id}`}
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
              />
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link
              href={`/collections/${selectedSpecies}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-700 hover:text-rose-500 underline underline-offset-4 transition"
            >
              Explore all{" "}
              {SPECIES_LIST.find((s) => s.id === selectedSpecies)?.name}{" "}
              products →
            </Link>
          </div>
        </div>
      </section>

      {/* Pet Care Guides */}
      <section
        id="guides"
        className="max-w-7xl mx-auto px-3 sm:px-8 py-10 sm:py-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-600 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Pet Care Resources
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              EverythingPet{" "}
              <span className="text-indigo-600">Care Guides</span>
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Click any guide to read tips &amp; shop matching products
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {JOURNAL_ARTICLES.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-indigo-950/90 text-teal-300 text-[11px] font-bold px-3 py-1 rounded-lg">
                  {post.tag}
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1 w-full">
                <span className="text-xs font-medium text-slate-400 mb-2">
                  {post.readTime} · {post.author}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-indigo-600 leading-snug mb-2 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-rose-500 group-hover:text-indigo-700">
                  Read Full Guide <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pet Owner Reviews */}
      <section id="reviews" className="bg-indigo-50/70 py-14 sm:py-16 border-y border-indigo-100/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-500 mb-2">
                <span className="w-5 h-0.5 bg-rose-500 rounded-full" />
                Community Reviews
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Loved by{" "}
                <span className="text-indigo-600">Pet Owners</span>
              </h2>
            </div>

            <span className="text-xs sm:text-sm font-bold text-indigo-950 bg-white px-4 py-2 rounded-xl border border-indigo-100 shadow-xs">
              ★ 4.9 Rating · 12,400+ Verified Orders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {REVIEWS.map((rev) => (
              <article
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col gap-4"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-[0.98rem] leading-relaxed text-slate-700 font-medium">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {rev.initials}
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-sm text-slate-900 truncate">
                        {rev.author}
                      </strong>
                      <span className="text-xs text-slate-400 block truncate">
                        {rev.petInfo}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/products/${rev.productId}`}
                    className="text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-indigo-950 hover:text-white px-2.5 py-1 rounded-lg transition shrink-0"
                  >
                    {rev.productTag}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EverythingPet Club CTA */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 py-14 sm:py-16">
        <div className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-teal-900 text-white rounded-[30px] p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-300 mb-3">
              {NEWSLETTER_BANNER.badge}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight mb-3">
              {NEWSLETTER_BANNER.title}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-lg">
              {NEWSLETTER_BANNER.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            {joined ? (
              <div className="bg-white/10 border border-teal-300/40 rounded-2xl p-6 text-center">
                <p className="font-display text-xl font-bold text-teal-300 mb-1">
                  Welcome to {NEWSLETTER_BANNER.badge}!
                </p>
                <p className="text-sm text-indigo-100">
                  Apply code{" "}
                  <strong className="text-white">
                    {NEWSLETTER_BANNER.promoCode}
                  </strong>{" "}
                  in your cart for {NEWSLETTER_BANNER.discountPercent}% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin}>
                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl border border-white/20">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-indigo-200/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-400 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition cursor-pointer shrink-0"
                  >
                    {NEWSLETTER_BANNER.ctaLabel}
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-xs text-teal-200/90 pl-1">
                  {NEWSLETTER_BANNER.perks.map((perk) => (
                    <span key={perk}>✓ {perk}</span>
                  ))}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
