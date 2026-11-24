"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flame,
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
        {/* Main Midnight-Indigo Mesh Hero Banner (Left 8 cols) */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="lg:col-span-8 relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white p-5 sm:p-10 lg:p-11 flex flex-col justify-between shadow-xl shadow-indigo-950/15 min-h-[390px] sm:min-h-[455px] lg:min-h-[485px]"
        >
          {/* Ambient Coral & Teal Mesh Orbs */}
          <div className="absolute -top-20 right-12 w-72 h-72 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Clickable Mobile Hero Visual */}
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            aria-label={`Explore ${current.ctaLabel}`}
            className="sm:hidden relative w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg mb-5 group cursor-pointer block"
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
            <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1.5 bg-slate-950/85 backdrop-blur-md text-teal-300 text-[11px] font-bold px-3 py-1 rounded-full border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              {current.highlightTag}
            </span>
          </button>

          <div className="relative z-10 sm:max-w-[54%] md:max-w-md">
            <button
              type="button"
              onClick={() => onAction(current.ctaAction)}
              className="inline-flex items-center gap-2 bg-white/12 hover:bg-white/18 backdrop-blur-md px-3.5 py-1.5 rounded-full text-teal-300 text-[11px] sm:text-xs font-bold mb-4 sm:mb-5 border border-white/15 cursor-pointer transition"
            >
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>{current.badge}</span>
            </button>

            <h1
              onClick={() => onAction(current.ctaAction)}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.06] tracking-tight cursor-pointer"
            >
              {current.titleTop} <br />
              <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">
                {current.titleAccent}
              </span>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm font-medium text-indigo-100/80 leading-relaxed">
              {current.subtitle}
            </p>

            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => onAction(current.ctaAction)}
                className="bg-rose-500 hover:bg-rose-400 text-white text-xs sm:text-sm font-bold px-5 sm:px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{current.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onAction(current.secondaryAction)}
                className="bg-white/12 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-3 rounded-xl backdrop-blur-md transition hover:-translate-y-0.5 cursor-pointer"
              >
                {current.secondaryCtaLabel}
              </button>
            </div>
          </div>

          {/* Clickable Desktop/Tablet Floating Squircle Visual */}
          <button
            type="button"
            onClick={() => onAction(current.ctaAction)}
            aria-label={`Open ${current.titleTop} ${current.titleAccent}`}
            className="absolute right-6 bottom-6 top-6 w-[41%] md:w-[43%] hidden sm:block group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-[28px] overflow-hidden border-2 border-white/20 shadow-2xl">
              <DynamicImage
                key={`desk-${current.id}`}
                src={current.image}
                alt={current.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 44vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-3.5 left-3.5 right-3.5 inline-flex items-center justify-between gap-1.5 bg-slate-950/80 group-hover:bg-rose-500 backdrop-blur-md text-white text-xs font-bold px-3.5 py-2.5 rounded-xl border border-white/15 transition-colors">
                <span className="inline-flex items-center gap-1.5 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-300 group-hover:text-white shrink-0" />
                  <span className="truncate">{current.highlightTag}</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
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
                      ? "w-9 bg-rose-400"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
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
                className="w-8 h-8 rounded-xl bg-white/12 hover:bg-rose-500 text-white border border-white/15 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next hero banner"
                className="w-8 h-8 rounded-xl bg-white/12 hover:bg-rose-500 text-white border border-white/15 flex items-center justify-center transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Dynamic Coral & Ocean Teal Offer Bento Cards */}
        <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-5">
          {HERO_PROMO_BANNERS.map((banner) => {
            const isCoral = banner.theme === "coral";
            return (
              <button
                key={banner.id}
                type="button"
                onClick={() => onAction(banner.action)}
                className={`text-left relative rounded-[26px] sm:rounded-[28px] overflow-hidden p-5 sm:p-6 text-white flex justify-between items-center gap-3 group cursor-pointer shadow-md hover:shadow-xl transition-all min-h-[175px] lg:min-h-[230px] ${
                  isCoral
                    ? "bg-gradient-to-br from-rose-500 via-rose-500 to-orange-400"
                    : "bg-gradient-to-br from-teal-600 via-teal-600 to-cyan-500"
                }`}
              >
                <div className="relative z-10 flex-1 min-w-0 pr-1">
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-widest font-extrabold uppercase bg-white/20 px-2.5 py-1 rounded-full">
                    {isCoral ? (
                      <Flame className="w-3 h-3" />
                    ) : (
                      <Sparkles className="w-3 h-3" />
                    )}
                    {banner.badge}
                  </span>
                  <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-bold mt-2 leading-tight text-white">
                    {banner.title}
                  </h2>
                  <p className="text-xs text-white/90 mt-1.5 font-medium">
                    {banner.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold mt-3 underline underline-offset-4">
                    {banner.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>

                <div className="w-24 h-24 sm:w-26 sm:h-26 lg:w-28 lg:h-28 relative rounded-2xl overflow-hidden border-2 border-white/40 shadow-lg group-hover:scale-105 transition-transform duration-300 shrink-0">
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
