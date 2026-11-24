"use client";

import React, { useState } from "react";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { MISSION_BANNER } from "@/data/catalog";
import type { DynamicActionType } from "@/types/ecommerce";
import DynamicImage from "@/components/common/DynamicImage";

interface MissionImpactSectionProps {
  cartMealsFunded: number;
  onAction: (action: DynamicActionType) => void;
}

export default function MissionImpactSection({
  cartMealsFunded,
  onAction,
}: MissionImpactSectionProps): React.JSX.Element {
  const [monthlySpend, setMonthlySpend] = useState<number>(95);

  const simMeals = Math.round(monthlySpend * 0.22) * 12;
  const simVaccines = Math.max(1, Math.round((monthlySpend * 12) / 130));
  const simBeds = Math.max(2, Math.round((monthlySpend * 12) / 60));

  return (
    <section
      id="grants"
      className="relative bg-[#14261C] text-[#FBF8F3] py-16 sm:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-28 w-[520px] h-[520px] rounded-full bg-[#d96b43]/20 blur-[110px]"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Clickable Dynamic Rescue Grant Photo & Stat Ledger Trigger */}
        <div className="lg:col-span-5 relative">
          <button
            type="button"
            onClick={() => onAction({ type: "section", sectionId: "grants" })}
            aria-label="Open 2026 Rescue Grant Ledger"
            className="w-full text-left group cursor-pointer block relative aspect-[4/4.2] sm:aspect-[4/4.4] rounded-[28px] sm:rounded-[34px] overflow-hidden border-[5px] sm:border-[6px] border-white/15 shadow-2xl"
          >
            <DynamicImage
              src={MISSION_BANNER.image}
              alt={MISSION_BANNER.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-[#102017]/85 group-hover:bg-[#d96b43] text-amber-300 group-hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-full backdrop-blur-md transition-colors">
              Tap to view partner shelters →
            </span>
          </button>

          <button
            type="button"
            onClick={() => onAction({ type: "section", sectionId: "grants" })}
            className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 bg-[#102017]/92 hover:bg-[#183A2E] backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-3 text-center transition-colors cursor-pointer"
          >
            {MISSION_BANNER.stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block font-display text-lg sm:text-xl text-amber-300">
                  {stat.value}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-emerald-100/75 leading-tight block">
                  {stat.label}
                </span>
              </div>
            ))}
          </button>
        </div>

        {/* Dynamic Copy + Interactive Slider */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300 mb-3">
            <HeartHandshake className="w-4 h-4" />
            {MISSION_BANNER.badge}
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.1] tracking-tight mb-5">
            {MISSION_BANNER.titleStart}{" "}
            <span className="italic font-medium text-amber-300">
              {MISSION_BANNER.titleAccent}
            </span>
          </h2>

          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-xl">
            {MISSION_BANNER.description}
          </p>

          <div className="bg-white/7 border border-white/15 rounded-3xl p-5 sm:p-6 mb-7 sm:mb-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm text-emerald-100/85 font-medium">
                Estimate your annual rescue grant contribution:
              </span>
              <strong className="font-display text-2xl text-amber-300">
                ${monthlySpend}
                <span className="text-xs font-sans font-normal text-emerald-200/70">
                  {" "}
                  / mo
                </span>
              </strong>
            </div>

            <input
              type="range"
              min={20}
              max={300}
              step={5}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              aria-label="Monthly care spend simulator"
              className="w-full h-2 rounded-full accent-amber-400 cursor-pointer mb-5 sm:mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/8 rounded-2xl p-4">
                <strong className="block font-display text-2xl text-white">
                  {simMeals}
                </strong>
                <span className="text-xs text-emerald-200">
                  Warm foster meals / year
                </span>
              </div>
              <div className="bg-white/8 rounded-2xl p-4">
                <strong className="block font-display text-2xl text-white">
                  {simVaccines}
                </strong>
                <span className="text-xs text-emerald-200">
                  Clinic wellness visits funded
                </span>
              </div>
              <div className="bg-white/8 rounded-2xl p-4">
                <strong className="block font-display text-2xl text-white">
                  {simBeds}
                </strong>
                <span className="text-xs text-emerald-200">
                  Adoption welcome beds gifted
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onAction(MISSION_BANNER.primaryAction)}
              className="bg-[#FBF8F3] hover:bg-white text-[#14261C] text-xs sm:text-sm font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{MISSION_BANNER.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onAction({ type: "section", sectionId: "grants" })}
              className="border border-white/30 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer"
            >
              View Partner Shelters ({cartMealsFunded} meals in bag)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
