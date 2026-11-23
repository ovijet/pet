"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, HeartHandshake } from "lucide-react";

interface MissionImpactSectionProps {
  cartMealsFunded: number;
  onOpenCart: () => void;
}

export default function MissionImpactSection({
  cartMealsFunded,
  onOpenCart,
}: MissionImpactSectionProps): React.JSX.Element {
  const [monthlySpend, setMonthlySpend] = useState<number>(95);

  const simMeals = Math.round(monthlySpend * 0.22) * 12;
  const simVaccines = Math.max(1, Math.round((monthlySpend * 12) / 130));
  const simBeds = Math.max(2, Math.round((monthlySpend * 12) / 60));

  return (
    <section
      id="grants"
      className="relative bg-[#14261C] text-[#FBF8F3] py-20 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-28 w-[520px] h-[520px] rounded-full bg-[#d96b43]/20 blur-[110px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Rescue Grant Photo */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/4.4] rounded-[34px] overflow-hidden border-[6px] border-white/15 shadow-2xl">
            <Image
              src="/images/mission-welfare.jpg"
              alt="Rescue volunteer comforting a happy young dog"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
          </div>

          <div className="absolute inset-x-4 bottom-4 bg-[#102017]/90 backdrop-blur-md border border-white/15 rounded-2xl p-4 grid grid-cols-3 gap-3 text-center">
            <div>
              <strong className="block font-display text-xl text-amber-300">
                $98K
              </strong>
              <span className="text-[11px] text-emerald-100/75">
                Grants Issued
              </span>
            </div>
            <div>
              <strong className="block font-display text-xl text-amber-300">
                29
              </strong>
              <span className="text-[11px] text-emerald-100/75">
                Local Rescues
              </span>
            </div>
            <div>
              <strong className="block font-display text-xl text-amber-300">
                10%
              </strong>
              <span className="text-[11px] text-emerald-100/75">
                Every Order Box
              </span>
            </div>
          </div>
        </div>

        {/* Rescue Grant Copy + Interactive Slider */}
        <div className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-300 mb-3">
            <HeartHandshake className="w-4 h-4" />
            PawHaven Rescue Grants
          </span>

          <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-[1.1] tracking-tight mb-5">
            Better daily care at home{" "}
            <span className="italic font-medium text-amber-300">
              funds second chances.
            </span>
          </h2>

          <p className="text-emerald-100/80 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            Ten percent of every PawHaven box automatically feeds our quarterly
            Rescue Grant Pool—funding emergency vet clinics, starter adoption
            kits, and warm foster supplies.
          </p>

          <div className="bg-white/7 border border-white/15 rounded-3xl p-6 mb-8">
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
              className="w-full h-2 rounded-full accent-amber-400 cursor-pointer mb-6"
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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

          <div className="flex flex-wrap gap-3.5">
            <a
              href="#catalog"
              className="bg-[#FBF8F3] hover:bg-white text-[#14261C] text-sm font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition hover:-translate-y-0.5"
            >
              <span>Shop Starter Kits</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={onOpenCart}
              className="border border-white/30 hover:bg-white/10 text-white text-sm font-semibold px-6 py-3 rounded-full transition cursor-pointer"
            >
              Your Bag Grant ({cartMealsFunded} meals)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
