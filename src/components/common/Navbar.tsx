"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  PawPrint,
  X,
} from "lucide-react";
import type { NavbarProps } from "@/types/ecommerce";
import { PRODUCTS } from "@/data/catalog";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  onWishlistClick,
  onCartClick,
  onLoginClick,
  onSelectProduct,
}: NavbarProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        searchWrapRef.current &&
        !searchWrapRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const searchPreview = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.petLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDropdownOpen(false);
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4 md:gap-8">
      {/* Brand Logo — PawHaven */}
      <a
        href="#top"
        className="flex items-center space-x-2.5 group flex-shrink-0"
      >
        <div className="w-10 h-10 rounded-2xl rounded-tr-sm bg-gradient-to-tr from-[#14261C] via-emerald-800 to-[#d96b43] flex items-center justify-center text-white shadow-md shadow-emerald-950/15 transition-all duration-300 group-hover:rotate-6">
          <PawPrint className="w-5 h-5 text-amber-100" />
        </div>
        <div className="leading-none">
          <div className="font-display text-xl font-bold tracking-tight text-[#14261C]">
            Paw<span className="text-[#d96b43]">Haven</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.14em] text-stone-400 font-semibold">
            Pet Wellness Studio
          </span>
        </div>
      </a>

      {/* Center Live Search Bar */}
      <div
        ref={searchWrapRef}
        className="flex-1 max-w-2xl relative hidden sm:block"
      >
        <form onSubmit={handleSearchSubmit}>
          <div className="flex items-center bg-[#F4F2EC] rounded-full border border-emerald-950/10 pl-4 pr-1.5 py-1.5 focus-within:border-emerald-700 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-600/20 transition-all">
            <Search className="w-4 h-4 text-emerald-900/50 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setDropdownOpen(true)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setDropdownOpen(true);
              }}
              placeholder="Find dental chews, elevated bowls, starter kits, bio-filters..."
              aria-label="Search PawHaven products"
              className="w-full bg-transparent text-sm text-stone-800 placeholder-stone-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="p-1 mr-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200/70 transition cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-xs font-semibold px-5 py-2 rounded-full transition-all flex-shrink-0 shadow-sm active:scale-95 cursor-pointer"
            >
              Find
            </button>
          </div>
        </form>

        {/* Live Search Results Dropdown */}
        {dropdownOpen && searchQuery.trim().length > 0 && (
          <div className="absolute top-[calc(100%+8px)] inset-x-0 bg-white border border-emerald-950/10 rounded-2xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
            {searchPreview.length > 0 ? (
              searchPreview.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectProduct(item);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#FBF8F3] text-left transition cursor-pointer"
                >
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#14261C] truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-stone-400">
                      {item.categoryLabel} · {item.petLabel}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-900">
                    ${item.price.toFixed(2)}
                  </span>
                </button>
              ))
            ) : (
              <p className="text-xs text-stone-400 text-center py-4">
                Nothing matched &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-2 sm:space-x-4 text-stone-700">
        <button
          type="button"
          onClick={onLoginClick}
          className="flex items-center space-x-1.5 hover:text-emerald-800 transition focus:outline-none cursor-pointer"
        >
          <div className="p-2 rounded-full hover:bg-emerald-50">
            <User className="w-5 h-5" />
          </div>
          <span className="text-sm font-semibold hidden lg:inline">
            Haven Pass
          </span>
        </button>

        <button
          type="button"
          onClick={onWishlistClick}
          className="p-2 rounded-full hover:bg-rose-50 hover:text-[#d96b43] relative transition focus:outline-none cursor-pointer"
          aria-label="Saved items"
        >
          <Heart className="w-5 h-5" />
          {wishlistCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#d96b43] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onCartClick}
          className="inline-flex items-center gap-2 bg-[#183A2E] hover:bg-[#d96b43] text-white px-3.5 py-2 rounded-full relative transition focus:outline-none shadow-sm cursor-pointer"
          aria-label="Shopping Bag"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-semibold hidden md:inline">Bag</span>
          <span className="bg-amber-400 text-[#14261C] text-[11px] font-extrabold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      </div>
    </div>
  );
}
