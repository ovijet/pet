"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Sparkles, Star } from "lucide-react";
import {
  JOURNAL_ARTICLES,
  LIFESTYLE_CARDS,
  NEWSLETTER_BANNER,
  PRODUCTS,
  REVIEWS,
} from "@/data/catalog";
import type { PetTypeId, Product } from "@/types/ecommerce";
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
  const [selectedPet, setSelectedPet] = useState<PetTypeId>("dogs");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const recommended = useMemo(() => {
    const exact = PRODUCTS.filter((p) => p.petType === selectedPet);
    if (exact.length >= 3) return exact.slice(0, 3);
    const extras = PRODUCTS.filter((p) => p.petType !== selectedPet).slice(
      0,
      3 - exact.length
    );
    return [...exact, ...extras];
  }, [selectedPet]);

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
      {/* PawHaven Care Journal — Dynamic Links to /journal/[id] */}
      <section
        id="journal"
        className="max-w-7xl mx-auto px-3 sm:px-8 pt-14 sm:pt-16 pb-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-9">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              The Care Journal
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
              Vet-written notes for{" "}
              <span className="italic font-medium text-[#d96b43]">
                happier routines
              </span>
            </h2>
          </div>
          <span className="text-xs font-semibold text-stone-500">
            Click any guide to open the full article &amp; related gear
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {JOURNAL_ARTICLES.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-[26px] border border-emerald-950/10 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all"
            >
              <div className="relative w-full aspect-[16/10] bg-[#F3EDE2] overflow-hidden">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[#183A2E] text-[11px] font-bold px-3 py-1 rounded-full">
                  {post.tag}
                </span>
              </div>
              <div className="p-5 sm:p-6 flex flex-col flex-1 w-full">
                <span className="text-xs font-medium text-stone-400 mb-2">
                  {post.readTime} · {post.author}
                </span>
                <h3 className="font-display text-lg font-semibold text-[#14261C] group-hover:text-[#d96b43] leading-snug mb-2 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-[#183A2E] group-hover:text-[#d96b43]">
                  Read Full Guide <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Personalized Companion Match */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 py-12 sm:py-14">
        <div className="bg-white border border-emerald-950/10 rounded-[28px] sm:rounded-[34px] p-5 sm:p-10 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-7 sm:mb-8">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Wellness Match
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
                Tailored to your{" "}
                <span className="italic font-medium text-[#d96b43]">
                  companion
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {LIFESTYLE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedPet(card.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedPet === card.id
                      ? "bg-[#d96b43] border-[#d96b43] text-white shadow-xs"
                      : "bg-[#FBF8F3] border-emerald-950/12 text-[#14261C] hover:border-[#d96b43]"
                  }`}
                >
                  {card.name}
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
              href={`/collections/${selectedPet}`}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#183A2E] hover:text-[#d96b43] underline underline-offset-4 transition"
            >
              View full{" "}
              {LIFESTYLE_CARDS.find((c) => c.id === selectedPet)?.name} studio
              page →
            </Link>
          </div>
        </div>
      </section>

      {/* Community Pet Parent Stories */}
      <section id="reviews" className="bg-[#F2ECE1] py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
                <span className="w-5 h-0.5 bg-[#d96b43] rounded-full" />
                Member Notes
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
                Loved inside{" "}
                <span className="italic font-medium text-[#d96b43]">
                  real homes
                </span>
              </h2>
            </div>

            <span className="text-xs sm:text-sm font-bold text-[#183A2E] bg-white px-4 py-2 rounded-full border border-emerald-950/10 shadow-xs">
              ★ 4.9 Rating · 9,800+ PawHaven Homes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {REVIEWS.map((rev) => (
              <article
                key={rev.id}
                className="bg-white rounded-[26px] p-6 sm:p-7 border border-emerald-950/10 shadow-xs flex flex-col gap-4"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="font-display text-base sm:text-[1.05rem] leading-relaxed text-[#14261C]">
                  &ldquo;{rev.quote}&rdquo;
                </p>
                <div className="mt-auto pt-4 border-t border-emerald-950/8 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-10 h-10 rounded-full bg-[#E6EFE9] text-[#183A2E] text-xs font-bold flex items-center justify-center shrink-0">
                      {rev.initials}
                    </span>
                    <div className="min-w-0">
                      <strong className="block text-sm text-[#14261C] truncate">
                        {rev.author}
                      </strong>
                      <span className="text-xs text-stone-400 block truncate">
                        {rev.petInfo}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/products/${rev.productId}`}
                    className="text-[11px] font-bold text-emerald-900 bg-[#E6EFE9] hover:bg-[#183A2E] hover:text-white px-2.5 py-1 rounded-full transition shrink-0"
                  >
                    {rev.productTag}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Haven Pass Newsletter Banner */}
      <section className="max-w-7xl mx-auto px-3 sm:px-8 py-14 sm:py-16">
        <div className="bg-gradient-to-br from-[#183A2E] via-[#14261C] to-[#235241] text-[#FBF8F3] rounded-[28px] sm:rounded-[34px] p-6 sm:p-12 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300 mb-3">
              {NEWSLETTER_BANNER.badge}
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold leading-tight mb-3">
              {NEWSLETTER_BANNER.title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80 max-w-lg">
              {NEWSLETTER_BANNER.description}
            </p>
          </div>

          <div className="lg:col-span-5">
            {joined ? (
              <div className="bg-white/10 border border-amber-300/40 rounded-3xl p-6 text-center">
                <p className="font-display text-xl text-amber-300 mb-1">
                  Your {NEWSLETTER_BANNER.badge} is Active!
                </p>
                <p className="text-sm text-emerald-100">
                  Apply code{" "}
                  <strong className="text-white">
                    {NEWSLETTER_BANNER.promoCode}
                  </strong>{" "}
                  in your bag for {NEWSLETTER_BANNER.discountPercent}% off.
                </p>
              </div>
            ) : (
              <form onSubmit={handleJoin}>
                <div className="flex flex-col sm:flex-row gap-2 bg-white/10 p-2 rounded-2xl sm:rounded-full border border-white/20">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="flex-1 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-emerald-100/60 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#d96b43] hover:bg-[#c25933] text-white text-sm font-bold px-6 py-2.5 rounded-full transition cursor-pointer shrink-0"
                  >
                    {NEWSLETTER_BANNER.ctaLabel}
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-3 text-xs text-emerald-200/90 pl-2">
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
