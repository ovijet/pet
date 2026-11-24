"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Gift,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HERO_PROMO_BANNERS, HERO_SLIDES } from "@/data/catalog";
import type { DynamicActionType } from "@/types/ecommerce";
import DynamicImage from "./DynamicImage";

interface HeroProps {
  onAction: (action: DynamicActionType) => void;
}

export default function Hero({ onAction }: HeroProps): React.JSX.Element {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const current = HERO_SLIDES[activeSlide];

  const handlePrev = () => {
    setActiveSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length
    );
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="top" className="max-w-7xl mx-auto px-3 sm:px-8 pt-5 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Main Dynamic Banner Slider (Left 8 cols) */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="lg:col-span-8 relative rounded-[26px] sm:rounded-[30px] overflow-hidden bg-gradient-to-br from-[#E7F0EA] via-[#F4F1EA] to-[#E2ECE5] border border-emerald-950/8 p-5 sm:p-10 lg:p-11 flex flex-col justify-between shadow-sm min-h-[380px] sm:min-h-[450px] lg:min-h-[480px]"
        >
          <div className="absolute -top-12 right-8 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />

          {/* Clickable Mobile Hero Dynamic Image */}
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            aria-label={`Open ${current.ctaLabel}`}
            className="sm:hidden relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white shadow-md mb-5 group cursor-pointer block"
          >
            <DynamicImage
              key={`mob-${current.id}`}
              src={current.image}
              alt={current.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 bg-white/92 backdrop-blur-sm text-[#183A2E] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d96b43]" />
              {current.highlightTag}
            </span>
          </button>

          <div className="relative z-10 sm:max-w-[54%] md:max-w-md">
            <button
              type="button"
              onClick={() => onAction(current.ctaAction)}
              className="inline-flex items-center space-x-2 bg-white/90 hover:bg-white backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#183A2E] text-[11px] sm:text-xs font-bold mb-4 sm:mb-5 shadow-xs border border-emerald-950/8 cursor-pointer transition"
            >
              <span className="w-2 h-2 rounded-full bg-[#d96b43] animate-pulse" />
              <span>{current.badge}</span>
            </button>

            <h1
              onClick={() => onAction(current.ctaAction)}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#14261C] hover:text-[#183A2E] leading-[1.08] tracking-tight cursor-pointer"
            >
              {current.titleTop} <br />
              <span className="italic text-[#d96b43] font-medium">
                {current.titleAccent}
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm font-medium text-emerald-950/75 leading-relaxed">
              {current.subtitle}
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => onAction(current.ctaAction)}
                className="bg-[#183A2E] hover:bg-[#d96b43] text-[#FBF8F3] text-xs sm:text-sm font-semibold px-5 sm:px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-lg shadow-emerald-950/15 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onAction(current.secondaryAction)}
                className="bg-white/90 hover:bg-white border border-emerald-950/12 text-[#183A2E] text-xs sm:text-sm font-bold px-4 sm:px-5 py-3 rounded-full transition hover:-translate-y-0.5 cursor-pointer"
              >
                {current.secondaryCtaLabel}
              </button>
            </div>
          </div>

          {/* Clickable Desktop / Tablet Right Arch Image */}
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            aria-label={`Explore ${current.titleTop} ${current.titleAccent}`}
            className="absolute right-0 bottom-0 top-8 w-[45%] md:w-[47%] hidden sm:block group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-tl-[110px] lg:rounded-tl-[135px] overflow-hidden border-t-[6px] border-l-[6px] border-white/90 shadow-2xl">
              <DynamicImage
                key={`desk-${current.id}`}
                src={current.image}
                alt={current.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 46vw, 430px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 bg-white/92 group-hover:bg-[#183A2E] group-hover:text-white backdrop-blur-md text-[#183A2E] text-xs font-bold px-3.5 py-2 rounded-full shadow-md transition-colors">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d96b43] group-hover:text-amber-300" />
                {current.highlightTag}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>

          {/* Dynamic Slide Controls */}
          <div className="relative z-10 mt-6 sm:mt-8 flex items-center justify-between gap-4 sm:max-w-[50%]">
            <div className="flex items-center space-x-2">
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

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous hero banner"
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-[#183A2E] hover:text-white text-[#14261C] border border-emerald-950/10 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next hero banner"
                className="w-8 h-8 rounded-full bg-white/85 hover:bg-[#183A2E] hover:text-white text-[#14261C] border border-emerald-950/10 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Dynamic Stacked Promo Banners */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
          {HERO_PROMO_BANNERS.map((banner) => {
            const isWarm = banner.theme === "warm";
            return (
              <button
                key={banner.id}
                type="button"
                onClick={() => onAction(banner.action)}
                className={`text-left relative rounded-[26px] sm:rounded-[28px] overflow-hidden p-5 sm:p-6 text-white flex justify-between items-center gap-3 group cursor-pointer shadow-sm hover:shadow-lg transition-all min-h-[175px] lg:min-h-[228px] ${
                  isWarm
                    ? "bg-gradient-to-br from-[#D96B43] via-[#DF7E4D] to-[#E8A838]"
                    : "bg-gradient-to-br from-[#183A2E] via-[#255544] to-[#3B7360]"
                }`}
              >
                <div className="relative z-10 flex-1 min-w-0 pr-1">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] tracking-widest font-extrabold uppercase ${
                      isWarm ? "text-amber-100" : "text-emerald-200"
                    }`}
                  >
                    {isWarm ? (
                      <Gift className="w-3 h-3" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {banner.badge}
                  </span>
                  <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold mt-1.5 leading-tight text-white">
                    {banner.title}
                  </h2>
                  <p
                    className={`text-xs mt-1.5 font-medium ${
                      isWarm ? "text-amber-50/90" : "text-emerald-100/90"
                    }`}
                  >
                    {banner.subtitle}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold mt-3 underline underline-offset-4 ${
                      isWarm ? "text-white" : "text-amber-300"
                    }`}
                  >
                    {banner.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-md group-hover:scale-105 transition-transform duration-300 shrink-0">
                  <DynamicImage
                    src={banner.image}
                    alt={banner.imageAlt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
