"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
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
  const [countdownSec, setCountdownSec] = useState(5 * 3600 + 18 * 60 + 42);

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
      id="sale"
      className="bg-gradient-to-b from-indigo-50/80 via-white to-[#F6F8FC] py-14 sm:py-16 border-y border-indigo-100/80"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-9">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-rose-500 mb-2">
              <Flame className="w-3.5 h-3.5" />
              Popular Products &amp; Exclusive Deals
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              On Sale <span className="text-rose-500">Now</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-3 bg-[#0F172A] text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-sm">
              <span className="uppercase tracking-wider text-slate-300">
                Ends In
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <b className="bg-rose-500/25 text-rose-300 px-2 py-1 rounded-lg text-sm">
                  {hours}h
                </b>
                :
                <b className="bg-rose-500/25 text-rose-300 px-2 py-1 rounded-lg text-sm">
                  {minutes}m
                </b>
                :
                <b className="bg-rose-500/25 text-rose-300 px-2 py-1 rounded-lg text-sm">
                  {seconds}s
                </b>
              </span>
            </div>
            <Link
              href="/collections/sale"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-rose-500"
            >
              All Sale Deals <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
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
