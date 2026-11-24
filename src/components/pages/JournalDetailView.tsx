"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Headphones,
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
      <div className="flex items-center justify-between gap-4 mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to EverythingPet Home
        </Link>
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-600">
          <BookOpen className="w-3.5 h-3.5" />
          {article.tag} · {article.readTime}
        </span>
      </div>

      <header className="mb-8">
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 leading-[1.08] mb-4">
          {article.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 mb-6">
          By <strong className="text-slate-900">{article.author}</strong> ·{" "}
          {article.readTime}
        </p>

        <div className="relative w-full aspect-[16/9] rounded-[28px] overflow-hidden border-4 border-white shadow-lg bg-slate-100">
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

      <div className="bg-white border border-slate-200/80 rounded-[28px] p-6 sm:p-10 shadow-xs mb-12 space-y-6">
        <p className="font-display text-lg sm:text-xl font-bold text-indigo-950 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
          {article.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="bg-[#F6F8FC] border border-slate-200 rounded-2xl p-5 sm:p-6">
          <h2 className="font-display text-xl font-bold text-slate-900 mb-3.5">
            Key Pet Care Takeaways
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {article.keyTakeaways.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-1" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/collections/${article.relatedSlug}`}
            className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition"
          >
            <span>{article.relatedCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={() =>
              store.handleAction({ type: "modal", modal: "advisor" })
            }
            className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 inline-flex items-center gap-2 cursor-pointer"
          >
            <Headphones className="w-4 h-4 text-rose-500" />
            Ask 24/7 Support
          </button>
        </div>
      </div>

      <section className="mb-14">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Featured Products
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Shop Matching Supplies
            </h2>
          </div>
          <Link
            href={`/collections/${article.relatedSlug}`}
            className="text-xs sm:text-sm font-bold text-indigo-700 hover:text-rose-500 underline underline-offset-4"
          >
            View full category →
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

      <section className="border-t border-slate-200 pt-10">
        <h2 className="font-display text-2xl font-extrabold text-slate-900 mb-5">
          More EverythingPet Guides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {otherArticles.map((post) => (
            <Link
              key={post.id}
              href={`/journal/${post.id}`}
              className="group bg-white rounded-2xl border border-slate-200/80 p-4 flex gap-4 items-center hover:shadow-md transition"
            >
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                <DynamicImage
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-bold uppercase text-indigo-600">
                  {post.tag} · {post.readTime}
                </span>
                <h3 className="font-display text-base font-bold text-slate-900 group-hover:text-rose-500 leading-snug mt-1">
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
