"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { Product } from "@/types/ecommerce";
import ProductCard from "./ProductCard";

interface FlashDealsSectionProps {
  deals: Product[];
  wishlist: string[];
  onAddToCart: (product: Product, variant?: string) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export default function FlashDealsSection({
  deals,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}: FlashDealsSectionProps): React.JSX.Element {
  const [countdownSec, setCountdownSec] = useState(4 * 3600 + 26 * 60 + 19);

  useEffect(() => {
    const id = setInterval(() => {
      setCountdownSec((prev) => (prev > 1 ? prev - 1 : 6 * 3600));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const hours = String(Math.floor(countdownSec / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((countdownSec % 3600) / 60)).padStart(2, "0");
  const seconds = String(countdownSec % 60).padStart(2, "0");

  return (
    <section
      id="drops"
      className="bg-gradient-to-b from-[#F2ECE1] to-[#FBF8F3] py-16 border-y border-emerald-950/6"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Weekly Member Drops
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#14261C] tracking-tight">
              Studio Savings{" "}
              <span className="italic font-medium text-[#d96b43]">
                This Week
              </span>
            </h2>
          </div>

          <div className="inline-flex items-center gap-3 bg-[#14261C] text-[#FBF8F3] px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm">
            <span className="uppercase tracking-wider text-emerald-200">
              Drop Ends In
            </span>
            <span className="inline-flex items-center gap-1.5 tabular-nums">
              <b className="bg-white/15 px-2 py-1 rounded-md text-sm text-amber-300">
                {hours}h
              </b>
              :
              <b className="bg-white/15 px-2 py-1 rounded-md text-sm text-amber-300">
                {minutes}m
              </b>
              :
              <b className="bg-white/15 px-2 py-1 rounded-md text-sm text-amber-300">
                {seconds}s
              </b>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={wishlist.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
