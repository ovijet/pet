"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MessageCircleHeart,
} from "lucide-react";
import type { JournalArticle, Product } from "@/types/ecommerce";
import { useStore } from "@/context/StoreContext";
import DynamicImage from "@/components/common/DynamicImage";
import ProductCard from "@/components/store/ProductCard";

interface JournalDetailViewProps {
  article: JournalArticle;
  relatedProducts: Product[];
  otherArticles: JournalArticle[];
}

export default function JournalDetailView({
  article,
  relatedProducts,
  otherArticles,
}: JournalDetailViewProps): React.JSX.Element {
  const store = useStore();

  return (
    <article className="max-w-5xl mx-auto px-3 sm:px-8 py-6 sm:py-10">
      {/* Back Link */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#183A2E]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to PawHaven Home
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#d96b43]">
          <BookOpen className="w-3.5 h-3.5" />
          {article.tag} · {article.readTime}
        </span>
      </div>

      {/* Article Header & Hero Photo */}
      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#14261C] leading-[1.08] mb-4">
          {article.title}
        </h1>
        <p className="text-sm sm:text-base text-stone-500 mb-6">
          By <strong className="text-[#14261C]">{article.author}</strong> ·{" "}
          {article.readTime}
        </p>

        <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden border-4 border-white shadow-lg bg-[#F3EDE2]">
          <DynamicImage
            src={article.image}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>
      </header>

      {/* Body + Vet Checklist */}
      <div className="bg-white border border-emerald-950/10 rounded-[28px] p-6 sm:p-10 shadow-xs mb-12 space-y-6">
        <p className="font-display text-lg sm:text-xl text-[#183A2E] leading-relaxed">
          {article.excerpt}
        </p>

        <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="bg-[#FBF8F3] border border-emerald-950/10 rounded-2xl p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold text-[#14261C] mb-3.5">
            Vet Checklist Highlights
          </h2>
          <ul className="space-y-2.5 text-sm text-stone-700">
            {article.keyTakeaways.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/collections/${article.relatedCategory}`}
            className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition"
          >
            <span>{article.relatedCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() =>
              store.handleAction({ type: "modal", modal: "advisor" })
            }
            className="px-5 py-3 rounded-full border border-emerald-950/15 text-sm font-semibold text-[#14261C] hover:bg-[#FBF8F3] inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageCircleHeart className="w-4 h-4 text-[#d96b43]" />
            Ask Our Vet Advisor
          </button>
        </div>
      </div>

      {/* Related Gear Mentioned in Guide */}
      <section className="mb-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#d96b43]">
              Mentioned in This Guide
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#14261C] mt-1">
              Recommended Essentials
            </h2>
          </div>
          <Link
            href={`/collections/${article.relatedCategory}`}
            className="text-xs sm:text-sm font-bold text-[#183A2E] hover:text-[#d96b43] underline underline-offset-4"
          >
            Browse full collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedProducts.map((product) => (
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
      </section>

      {/* More Guides */}
      <section className="border-t border-emerald-950/10 pt-10">
        <h2 className="font-display text-2xl font-semibold text-[#14261C] mb-5">
          Keep Reading The Care Journal
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {otherArticles.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-2xl border border-emerald-950/10 p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[#F3EDE2] shrink-0">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase text-[#d96b43]">
                  {post.tag} · {post.readTime}
                </span>
                <h3 className="font-display text-base font-semibold text-[#14261C] group-hover:text-[#d96b43] leading-snug mt-1">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

