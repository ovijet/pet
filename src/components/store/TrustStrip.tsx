"use client";

import React from "react";
import { Truck, ShieldCheck, HeartHandshake, Headphones } from "lucide-react";
import { TRUST_PILLARS } from "@/data/catalog";
import type { DynamicActionType, TrustPillarItem } from "@/types/ecommerce";

interface TrustStripProps {
  onAction: (action: DynamicActionType) => void;
}

function renderPillarIcon(icon: TrustPillarItem["icon"]) {
  if (icon === "truck") return <Truck className="w-5 h-5" />;
  if (icon === "shield") return <ShieldCheck className="w-5 h-5" />;
  if (icon === "heart") return <HeartHandshake className="w-5 h-5" />;
  return <Headphones className="w-5 h-5" />;
}

export default function TrustStrip({
  onAction,
}: TrustStripProps): React.JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-8 pb-10 sm:pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {TRUST_PILLARS.map((pillar) => (
          <button
            key={pillar.id}
            type="button"
            onClick={() => onAction(pillar.action)}
            className="text-left bg-white rounded-2xl border border-slate-200/80 p-4 flex items-center gap-3.5 shadow-xs hover:shadow-md hover:border-indigo-300 hover:-translate-y-0.5 transition-all cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-indigo-50 group-hover:bg-indigo-950 group-hover:text-white text-indigo-700 flex items-center justify-center shrink-0 transition-colors">
              {renderPillarIcon(pillar.icon)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                {pillar.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
