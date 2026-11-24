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
  const [monthlySpend, setMonthlySpend] = useState<number>(85);

  const simMeals = Math.round(monthlySpend * 0.24) * 12;
  const simCheckups = Math.max(1, Math.round((monthlySpend * 12) / 145));
  const simBlankets = Math.max(2, Math.round((monthlySpend * 12) / 55));

  return (
    <section
      id="mission"
      className="relative bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] text-white py-16 sm:py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-36 -right-24 w-[500px] h-[500px] rounded-full bg-rose-500/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-36 -left-24 w-[460px] h-[460px] rounded-full bg-teal-400/18 blur-[110px]"
      />

      <div className="max-w-7xl mx-auto px-3 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Clickable Charity Sanctuary Photo & Stat Cards */}
        <div className="lg:col-span-5 relative">
          <button
            type="button"
            onClick={() => onAction({ type: "modal", modal: "charity" })}
            aria-label="Open EverythingPet Animal Welfare Report"
            className="w-full text-left group cursor-pointer block relative aspect-[4/4.2] sm:aspect-[4/4.4] rounded-[28px] sm:rounded-[34px] overflow-hidden border-2 border-white/20 shadow-2xl"
          >
            <DynamicImage
              src={MISSION_BANNER.image}
              alt={MISSION_BANNER.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-slate-950/85 group-hover:bg-rose-500 text-teal-300 group-hover:text-white text-xs font-bold px-3.5 py-1.5 rounded-xl backdrop-blur-md transition-colors">
              View Partner Charities →
            </span>
          </button>

          <button
            type="button"
            onClick={() => onAction({ type: "modal", modal: "charity" })}
            className="absolute inset-x-3 sm:inset-x-4 bottom-3 sm:bottom-4 bg-slate-950/90 hover:bg-indigo-950 backdrop-blur-md border border-white/15 rounded-2xl p-3 sm:p-4 grid grid-cols-3 gap-2 sm:gap-3 text-center transition-colors cursor-pointer"
          >
            {MISSION_BANNER.stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block font-display text-lg sm:text-xl text-teal-300">
                  {stat.value}
                </strong>
                <span className="text-[10px] sm:text-[11px] text-slate-300 leading-tight block">
                  {stat.label}
                </span>
              </div>
            ))}
          </button>
        </div>

        {/* Mission Story & Interactive Profit Impact Calculator */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-300 mb-3">
            <HeartHandshake className="w-4 h-4" />
            {MISSION_BANNER.badge}
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-extrabold leading-[1.08] tracking-tight mb-5">
            {MISSION_BANNER.titleStart}{" "}
            <span className="bg-gradient-to-r from-rose-400 to-teal-300 bg-clip-text text-transparent">
              {MISSION_BANNER.titleAccent}
            </span>
          </h2>

          <p className="text-indigo-100/80 text-sm sm:text-base leading-relaxed mb-7 sm:mb-8 max-w-xl">
            {MISSION_BANNER.description}
          </p>

          <div className="bg-white/8 border border-white/15 rounded-3xl p-5 sm:p-6 mb-7 sm:mb-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs sm:text-sm text-indigo-100 font-medium">
                Slide your monthly pet supply budget to see annual shelter
                impact:
              </span>
              <strong className="font-display text-2xl text-rose-400">
                ${monthlySpend}
                <span className="text-xs font-sans font-normal text-slate-300">
                  {" "}
                  / mo
                </span>
              </strong>
            </div>

            <input
              type="range"
              min={15}
              max={300}
              step={5}
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(Number(e.target.value))}
              aria-label="Monthly pet spend simulator"
              className="w-full h-2 rounded-full accent-rose-500 cursor-pointer mb-5 sm:mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white/8 rounded-2xl p-4 border border-white/10">
                <strong className="block font-display text-2xl text-white">
                  {simMeals}
                </strong>
                <span className="text-xs text-teal-300">
                  Shelter meals donated / yr
                </span>
              </div>
              <div className="bg-white/8 rounded-2xl p-4 border border-white/10">
                <strong className="block font-display text-2xl text-white">
                  {simCheckups}
                </strong>
                <span className="text-xs text-teal-300">
                  Rescue vet checkups funded
                </span>
              </div>
              <div className="bg-white/8 rounded-2xl p-4 border border-white/10">
                <strong className="block font-display text-2xl text-white">
                  {simBlankets}
                </strong>
                <span className="text-xs text-teal-300">
                  Warm rescue blankets gifted
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onAction(MISSION_BANNER.primaryAction)}
              className="bg-rose-500 hover:bg-rose-400 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-rose-500/25 transition hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{MISSION_BANNER.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onAction({ type: "modal", modal: "charity" })}
              className="border border-white/25 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-xl transition cursor-pointer"
            >
              View Charity Partners ({cartMealsFunded} meals in cart)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
