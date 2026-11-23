"use client";

import React from "react";
import Image from "next/image";
import { LIFESTYLE_CARDS } from "@/data/catalog";
import type { PetTypeId } from "@/types/ecommerce";

interface SpeciesShowcaseProps {
  activePetType: PetTypeId | "all";
  onSelectPetType: (petType: PetTypeId) => void;
}

export default function SpeciesShowcase({
  activePetType,
  onSelectPetType,
}: SpeciesShowcaseProps): React.JSX.Element {
  return (
    <section id="lifestyles" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-9">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
            <span className="w-5 h-0.5 bg-[#d96b43] rounded-full" />
            Pet Lifestyles
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
            Curated around{" "}
            <span className="italic font-medium text-[#d96b43]">
              how they live
            </span>
          </h2>
        </div>
        <p className="text-sm text-stone-500 max-w-md">
          Pick a companion studio below to jump straight into tailored dining,
          play, and habitat designs.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
        {LIFESTYLE_CARDS.map((card) => {
          const isActive = activePetType === card.id;
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onSelectPetType(card.id)}
              className={`group rounded-t-[130px] rounded-b-[24px] p-3 pb-5 border text-center flex flex-col items-center transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#183A2E] text-[#FBF8F3] border-[#183A2E] shadow-lg -translate-y-1.5"
                  : "bg-white text-[#14261C] border-emerald-950/10 hover:border-[#183A2E] hover:-translate-y-1.5 hover:shadow-md"
              }`}
            >
              <div className="relative w-full aspect-[1/1.08] rounded-t-[120px] rounded-b-[16px] overflow-hidden bg-[#F3EDE2] mb-3.5">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 17vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-display text-base sm:text-lg font-semibold leading-tight">
                {card.name}
              </h3>
              <span
                className={`text-xs font-medium mt-1 ${
                  isActive ? "text-emerald-200" : "text-stone-400"
                }`}
              >
                {card.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
