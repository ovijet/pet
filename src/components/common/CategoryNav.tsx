"use client";

import React from "react";
import { Sparkles, BookOpen, HeartHandshake } from "lucide-react";
import type { CategoryNavProps } from "@/types/ecommerce";
import { CATEGORY_NAV_ITEMS } from "@/data/catalog";

export default function CategoryNav({
  activeCategory,
  setActiveCategory,
}: CategoryNavProps): React.JSX.Element {
  const handleSelect = (id: CategoryNavProps["activeCategory"]) => {
    setActiveCategory(id);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="border-t border-emerald-950/5 bg-[#FBF8F3]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#183A2E] text-[#FBF8F3] shadow-sm"
                    : "text-stone-600 hover:text-[#183A2E] hover:bg-[#EFEAE0]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-5 flex-shrink-0 text-xs font-bold">
          <a
            href="#drops"
            className="inline-flex items-center gap-1.5 text-[#d96b43] hover:text-[#b9522d] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Member Drops</span>
          </a>
          <a
            href="#journal"
            className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#183A2E] transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Care Journal</span>
          </a>
          <a
            href="#grants"
            className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Rescue Grants</span>
          </a>
        </div>
      </div>
    </div>
  );
}
