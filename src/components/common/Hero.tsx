"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { HERO_SLIDES } from "@/data/catalog";
import type { CategoryFilter } from "@/types/ecommerce";

interface HeroProps {
  onSelectCategory: (category: CategoryFilter) => void;
}

export default function Hero({
  onSelectCategory,
}: HeroProps): React.JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const current = HERO_SLIDES[activeSlide];

  const handleCta = (category: CategoryFilter) => {
    onSelectCategory(category);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="top" className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Editorial Banner (Left 8 cols) */}
        <div className="lg:col-span-8 relative rounded-[30px] overflow-hidden bg-gradient-to-br from-[#E7F0EA] via-[#F4F1EA] to-[#E2ECE5] border border-emerald-950/8 p-7 sm:p-11 flex flex-col justify-between shadow-sm min-h-[410px] lg:min-h-[470px]">
          <div className="absolute -top-12 right-8 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-md">
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#183A2E] text-xs font-bold mb-5 shadow-xs border border-emerald-950/8">
              <span className="w-2 h-2 rounded-full bg-[#d96b43] animate-pulse" />
              <span>{current.badge}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#14261C] leading-[1.08] tracking-tight">
              {current.titleTop} <br />
              <span className="italic text-[#d96b43] font-medium">
                {current.titleAccent}
              </span>
            </h1>

            <p className="mt-4 text-xs sm:text-sm font-medium text-emerald-950/75 leading-relaxed">
              {current.subtitle}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleCta(current.targetCategory)}
                className="bg-[#183A2E] hover:bg-[#d96b43] text-[#FBF8F3] text-xs sm:text-sm font-semibold px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-emerald-950/15 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm border border-emerald-950/8 text-[#183A2E] text-xs font-bold px-3.5 py-2.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d96b43]" />
                {current.highlightTag}
              </span>
            </div>
          </div>

          {/* Right Arch Visual Photography */}
          <div className="absolute right-0 bottom-0 top-8 w-[47%] hidden sm:block pointer-events-none">
            <div className="relative w-full h-full rounded-tl-[130px] overflow-hidden border-t-[6px] border-l-[6px] border-white/90 shadow-2xl">
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 420px"
                className="object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Interactive Slide Dots */}
          <div className="relative z-10 mt-8 flex items-center space-x-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? "w-9 bg-[#183A2E]"
                    : "w-2.5 bg-[#183A2E]/25 hover:bg-[#183A2E]/50"
                }`}
                aria-label={`View slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Stacked Bento Promo Cards (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5 justify-between">
          {/* Top Card: New Pet Starter Kits */}
          <button
            type="button"
            onClick={() => handleCta("bundles")}
            className="text-left relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#D96B43] via-[#DF7E4D] to-[#E8A838] p-6 text-white flex justify-between items-center gap-3 group cursor-pointer shadow-sm hover:shadow-lg transition-all min-h-[190px] lg:min-h-[224px]"
          >
            <div className="relative z-10 max-w-[58%]">
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest font-extrabold uppercase text-amber-100">
                <Gift className="w-3 h-3" />
                CURATED BOXES
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold mt-1.5 leading-tight text-white">
                New Pet Starter Kits
              </h2>
              <p className="text-xs text-amber-50/90 mt-1.5 font-medium">
                Bundle collars, bowls &amp; chews · Save 20%
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold mt-3 underline underline-offset-4">
                Build a Kit <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="w-28 h-28 relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Image
                src="/images/mission-welfare.jpg"
                alt="Happy rescued puppy in starter kit showcase"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          </button>

          {/* Bottom Card: Grooming & Habitat Wellness */}
          <button
            type="button"
            onClick={() => handleCta("wellness")}
            className="text-left relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#183A2E] via-[#255544] to-[#3B7360] p-6 text-white flex justify-between items-center gap-3 group cursor-pointer shadow-sm hover:shadow-lg transition-all min-h-[190px] lg:min-h-[224px]"
          >
            <div className="relative z-10 max-w-[58%]">
              <span className="inline-flex items-center gap-1 text-[10px] tracking-widest font-extrabold uppercase text-emerald-200">
                <Sparkles className="w-3 h-3" />
                CLEAN CARE STUDIO
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold mt-1.5 leading-tight text-white">
                Bio-Filters &amp; Daily Wellness
              </h2>
              <p className="text-xs text-emerald-100/90 mt-1.5 font-medium">
                Silent tank filtration &amp; precision care tools
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-bold mt-3 text-amber-300 underline underline-offset-4">
                Shop Wellness <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
            <div className="w-28 h-28 relative rounded-2xl overflow-hidden border-2 border-white/35 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <Image
                src="/images/species-birds.jpg"
                alt="Pastel lovebird on natural birch stand"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
