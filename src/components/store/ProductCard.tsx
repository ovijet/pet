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
    product.badge === "drop"
      ? "bg-[#d96b43] text-white"
      : product.badge === "fresh"
      ? "bg-[#183A2E] text-[#FBF8F3]"
      : "bg-amber-400 text-[#14261C]";

  return (
    <article className="group bg-white rounded-[24px] sm:rounded-[26px] border border-emerald-950/10 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-emerald-950/20">
      <div className="relative aspect-[4/3.6] bg-[#F3EDE2] overflow-hidden">
        <Link
          href={`/products/${product.id}`}
          aria-label={`Open full details for ${product.name}`}
          className="absolute inset-0 block"
        >
          <DynamicImage
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider shadow-xs ${badgeColor}`}
          >
            {product.badgeText}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => onToggleWishlist(product.id)}
            aria-label={
              isWishlisted
                ? `Remove ${product.name} from saved items`
                : `Save ${product.name}`
            }
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all cursor-pointer ${
              isWishlisted
                ? "bg-[#d96b43] text-white scale-105"
                : "bg-white/95 text-[#183A2E] hover:bg-[#183A2E] hover:text-white"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </button>

          <button
            type="button"
            onClick={() => onQuickView(product)}
            aria-label={`Quick preview ${product.name}`}
            className="w-9 h-9 rounded-full bg-white/95 text-[#183A2E] hover:bg-[#183A2E] hover:text-white flex items-center justify-center shadow-sm transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:block absolute inset-x-3 bottom-3 z-10 translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={() => onAddToCart(product, product.variants[0])}
            className="w-full py-2.5 px-4 rounded-full bg-[#183A2E]/95 hover:bg-[#d96b43] text-[#FBF8F3] text-xs font-bold inline-flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag · ${product.price.toFixed(2)}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <Link
            href={`/collections/${product.category}`}
            className="text-[11px] font-bold uppercase tracking-wider text-[#d96b43] hover:underline truncate"
          >
            {product.categoryLabel}
          </Link>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {product.rating.toFixed(1)}
            <span className="text-stone-400 font-normal">
              ({product.reviews})
            </span>
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          className="font-display text-base sm:text-[1.08rem] font-semibold text-[#14261C] hover:text-[#d96b43] leading-snug mb-2.5 transition-colors block"
        >
          {product.name}
        </Link>

        <Link
          href={`/collections/${product.petType}`}
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900 bg-[#E6EFE9] hover:bg-[#183A2E] hover:text-white px-2.5 py-1 rounded-full w-fit mb-4 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {product.petLabel} · Grants {product.grantMeals} meals
        </Link>

        <div className="mt-auto pt-3 border-t border-dashed border-emerald-950/12 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg font-extrabold text-[#14261C]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice !== null && (
              <span className="text-xs text-stone-400 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onAddToCart(product, product.variants[0])}
            className="px-3.5 py-2 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] text-[#183A2E] hover:text-[#FBF8F3] text-xs font-bold transition-colors cursor-pointer"
          >
            + Bag
          </button>
        </div>
      </div>
    </article>
  );
}
