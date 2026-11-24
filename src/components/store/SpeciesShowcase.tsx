"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPECIES_LIST } from "@/data/catalog";
import type { CategoryFilter } from "@/types/ecommerce";
import DynamicImage from "@/components/common/DynamicImage";

interface SpeciesShowcaseProps {
  activeCategory: CategoryFilter;
}

export default function SpeciesShowcase({
  activeCategory,
}: SpeciesShowcaseProps): React.JSX.Element {
  return (
    <section
      id="categories"
      className="max-w-7xl mx-auto px-3 sm:px-8 py-10 sm:py-12"
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-7 sm:mb-9">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-rose-500 mb-2">
            <span className="w-5 h-0.5 bg-rose-500 rounded-full" />
            Latest Categories
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Shop by{" "}
            <span className="text-indigo-600">Pet Category</span>
          </h2>
        </div>
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-indigo-700 hover:text-rose-500 transition"
        >
          View all categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Circular-Halo Modern Studio Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
        {SPECIES_LIST.map((sp) => {
          const isActive = activeCategory === sp.id;
          return (
            <Link
              key={sp.id}
              href={`/collections/${sp.id}`}
              className={`group rounded-3xl p-4 border text-center flex flex-col items-center transition-all duration-300 ${
                isActive
                  ? "bg-indigo-950 text-white border-indigo-950 shadow-lg -translate-y-1.5"
                  : "bg-white text-slate-900 border-slate-200/80 hover:border-indigo-300 hover:-translate-y-1.5 hover:shadow-lg"
              }`}
            >
              <div
                className={`p-1 rounded-full bg-gradient-to-tr ${sp.accentRing} mb-3.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[3px] border-white bg-slate-100">
                  <DynamicImage
                    src={sp.image}
                    alt={sp.name}
                    fill
                    sizes="(max-width: 640px) 110px, 128px"
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="font-display text-sm sm:text-base font-bold leading-tight">
                {sp.name}
              </h3>
              <span
                className={`text-[11px] sm:text-xs font-medium mt-1 ${
                  isActive ? "text-indigo-200" : "text-slate-400"
                }`}
              >
                {sp.count}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
