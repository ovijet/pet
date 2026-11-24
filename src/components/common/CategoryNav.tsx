"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, BookOpen, HeartHandshake } from "lucide-react";
import type { CategoryNavProps } from "@/types/ecommerce";
import { CATEGORY_NAV_ITEMS, QUICK_NAV_LINKS } from "@/data/catalog";

export default function CategoryNav({
  activeCategory,
  setActiveCategory,
  onAction,
}: CategoryNavProps): React.JSX.Element {
  return (
    <div className="border-t border-emerald-950/5 bg-[#FBF8F3]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar snap-x py-0.5">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <Link
                key={item.id}
                href={`/collections/${item.id}`}
                onClick={() => setActiveCategory(item.id)}
                className={`snap-start px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-[#183A2E] text-[#FBF8F3] shadow-sm"
                    : "text-stone-600 hover:text-[#183A2E] hover:bg-[#EFEAE0]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-5 shrink-0 text-xs font-bold">
          {QUICK_NAV_LINKS.map((link) =>
            link.id === "q-grants" ? (
              <button
                key={link.id}
                type="button"
                onClick={() =>
                  onAction({ type: "section", sectionId: "grants" })
                }
                className={`inline-flex items-center gap-1.5 transition-colors cursor-pointer ${link.colorClass}`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </button>
            ) : (
              <Link
                key={link.id}
                href={link.href}
                className={`inline-flex items-center gap-1.5 transition-colors ${link.colorClass}`}
              >
                {link.icon === "sparkles" && (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {link.icon === "book" && <BookOpen className="w-3.5 h-3.5" />}
                <span>{link.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
