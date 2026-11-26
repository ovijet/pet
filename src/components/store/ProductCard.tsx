"use client";

import React from "react";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types/ecommerce";
import DynamicImage from "@/components/common/DynamicImage";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onAddToCart: (product: Product, variant?: string) => void;
  onToggleWishlist: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({
  product,
  isWishlisted,
  onAddToCart,
  onToggleWishlist,
  onQuickView,
}: ProductCardProps): React.JSX.Element {
  const badgeColor =
    product.badge === "sale"
      ? "bg-rose-500 text-white"
      : product.badge === "new"
      ? "bg-indigo-600 text-white"
      : "bg-teal-500 text-white";

  return (
    <article className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] hover:border-indigo-200">
      <div className="relative aspect-square sm:aspect-[4/3.5] bg-slate-100 overflow-hidden">
        <Link
          href={`/products/${product.id}`}
          aria-label={`Open full details for ${product.name}`}
          className="absolute inset-0 block"
        >
          <DynamicImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 pointer-events-none">
          <span
            className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs ${badgeColor}`}
          >
            {product.badgeText}
          </span>
        </div>

        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 flex flex-col gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm transition-all cursor-pointer ${
              isWishlisted
                ? "bg-rose-500 text-white scale-105"
                : "bg-white/95 text-slate-800 hover:bg-indigo-950 hover:text-white"
            }`}
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="hidden sm:flex w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-indigo-950 hover:text-white items-center justify-center shadow-sm transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:block absolute inset-x-3 bottom-3 z-10 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={() => onAddToCart(product, product.variants[0])}
            className="w-full py-2.5 px-4 rounded-xl bg-indigo-950/95 hover:bg-rose-500 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add · ${product.price.toFixed(2)}
          </button>
        </div>
      </div>

      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-1.5 mb-1">
          <Link
            href={`/collections/${product.species}`}
            className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-indigo-600 hover:underline truncate"
          >
            {product.speciesLabel}
          </Link>
          <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[11px] sm:text-xs font-semibold text-slate-600 shrink-0">
            <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 fill-amber-400" />
            {product.rating.toFixed(1)}
            <span className="hidden sm:inline text-slate-400 font-normal">
              ({product.reviews})
            </span>
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="font-display text-xs sm:text-[1.06rem] font-bold text-slate-900 hover:text-rose-500 leading-snug mb-2 transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-lg w-fit mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Funds {product.mealsFunded} shelter meals
        </div>

        <div className="mt-auto pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 leading-tight">
            <span className="text-sm sm:text-lg font-extrabold text-slate-900">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice !== null && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, product.variants[0])}
            className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-indigo-50 hover:bg-indigo-950 text-indigo-900 hover:text-white text-[11px] sm:text-xs font-bold transition-colors cursor-pointer shrink-0"
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
