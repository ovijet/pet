"use client";

import React from "react";
import Link from "next/link";
import { Flame, Sparkles, HeartHandshake } from "lucide-react";
import type { CategoryNavProps } from "@/types/ecommerce";
import { CATEGORY_NAV_ITEMS, QUICK_NAV_LINKS } from "@/data/catalog";
import { LiaPlaneArrivalSolid } from "react-icons/lia";

export default function CategoryNav({
  activeCategory,
  setActiveCategory,
  onAction,
}: CategoryNavProps): React.JSX.Element {
  return (
    <div className="border-t border-slate-200/80 bg-[#F6F8FC]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-8 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar snap-x py-0.5">
          {CATEGORY_NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <Link
                key={item.id}
                href={`/collections/${item.id}`}
                onClick={() => setActiveCategory(item.id)}
                className={`snap-start px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-950 text-white shadow-xs"
                    : "text-slate-600 hover:text-indigo-950 hover:bg-indigo-100/70"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-5 shrink-0 text-xs font-bold">
          {QUICK_NAV_LINKS.map((link) =>
            link.id === "q-mission" ? (
              <button
                key={link.id}
                type="button"
                onClick={() =>
                  onAction({ type: "modal", modal: "charity" })
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
                {link.icon === "flame" && <Flame className="w-3.5 h-3.5" />}
                {link.icon === "sparkles" && (
                  <LiaPlaneArrivalSolid className="w-3.5 h-3.5" />
                )}
                <span>{link.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
