"use client";

import React from "react";
import { BookOpen, HeartHandshake, MapPin, Truck } from "lucide-react";

interface TopUtilityBarProps {
  onTrackOrderClick: () => void;
}

export default function TopUtilityBar({
  onTrackOrderClick,
}: TopUtilityBarProps): React.JSX.Element {
  return (
    <div className="bg-[#14261C] text-[#D8E6DC] text-xs py-2.5 px-4 sm:px-8 border-b border-[#233D2F]">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#grants"
            className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-semibold transition-colors"
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>10% Rescue Grant Fund</span>
          </a>
          <span className="hidden md:inline text-emerald-500/50">•</span>
          <span className="hidden md:inline text-emerald-200/85">
            Complimentary eco shipping $55+ · Member code{" "}
            <strong className="text-white">HAVEN20</strong>
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="#journal"
            className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Care Journal</span>
          </a>
          <button
            type="button"
            onClick={onTrackOrderClick}
            className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Parcel Status</span>
          </button>
          <a
            href="#footer"
            className="hidden sm:inline-flex items-center gap-1 hover:text-emerald-300 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Vet Partners</span>
          </a>
        </div>
      </div>
    </div>
  );
}
