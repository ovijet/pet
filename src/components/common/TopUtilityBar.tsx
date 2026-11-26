"use client";

import React from "react";
import { BookOpen, Headphones, HeartHandshake, Truck } from "lucide-react";
import { SITE_BRAND, UTILITY_LINKS } from "@/data/catalog";
import type { DynamicActionType, UtilityLinkItem } from "@/types/ecommerce";

interface TopUtilityBarProps {
  onAction: (action: DynamicActionType) => void;
}

function renderUtilityIcon(icon: UtilityLinkItem["icon"]) {
  if (icon === "heart")
    return <HeartHandshake className="w-3.5 h-3.5 shrink-0" />;
  if (icon === "book") return <BookOpen className="w-3.5 h-3.5 shrink-0" />;
  if (icon === "truck") return <Truck className="w-3.5 h-3.5 shrink-0" />;
  return <Headphones className="w-3.5 h-3.5 shrink-0" />;
}

export default function TopUtilityBar({
  onAction,
}: TopUtilityBarProps): React.JSX.Element {
  const leftLink = UTILITY_LINKS[0];
  const rightLinks = UTILITY_LINKS.slice(1);

  return (
    <div className="bg-[#0F172A] text-slate-200 text-[11px] sm:text-xs py-2 px-3 sm:px-8 border-b border-indigo-900/60">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          {leftLink && (
            <button
              type="button"
              onClick={() => onAction(leftLink.action)}
              className="inline-flex items-center gap-1.5 text-teal-300 hover:text-teal-200 font-semibold transition-colors cursor-pointer truncate"
            >
              {renderUtilityIcon(leftLink.icon)}
              <span>{leftLink.label}</span>
            </button>
          )}
          <span className="hidden lg:inline text-slate-600">•</span>
          <span className="hidden lg:inline text-slate-300">
           {SITE_BRAND.announcement} 
            <strong className="text-rose-400">{SITE_BRAND.promoCode}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {rightLinks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onAction(item.action)}
              className={`${
                item.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"
              } items-center gap-1.5 hover:text-rose-300 transition-colors cursor-pointer`}
            >
              {renderUtilityIcon(item.icon)}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
