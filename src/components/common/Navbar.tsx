"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  PawPrint,
  X,
  Menu,
} from "lucide-react";
import type { NavbarProps } from "@/types/ecommerce";
import { PRODUCTS, SITE_BRAND } from "@/data/catalog";
import DynamicImage from "./DynamicImage";

export default function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  onAction,
  onSelectProduct,
  onOpenMobileMenu,
}: NavbarProps): React.JSX.Element {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
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
        p.speciesLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDropdownOpen(false);
    setMobileSearchOpen(false);
    router.push("/collections/all");
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-8 py-3">
      <div className="flex items-center justify-between gap-2.5 sm:gap-5 md:gap-8">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-800 flex items-center justify-center transition cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link href="/" className="flex items-center space-x-2.5 group shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-indigo-900 via-indigo-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-indigo-900/20 transition-transform duration-300 group-hover:scale-105">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <div className="leading-none">
              <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                {SITE_BRAND.nameFirst}
                <span className="text-rose-500">{SITE_BRAND.nameSecond}</span>
              </div>
              <span className="hidden sm:block text-[10px] uppercase tracking-[0.12em] text-slate-400 font-semibold">
                {SITE_BRAND.tagline}
              </span>
            </div>
          </Link>
        </div>

        {/* Center Desktop/Tablet Search Bar */}
        <div
          ref={searchWrapRef}
          className="flex-1 max-w-2xl relative hidden md:block"
        >
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center bg-slate-100/90 rounded-2xl border border-slate-200 pl-4 pr-1.5 py-1.5 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/15 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setDropdownOpen(true)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearchQuery(e.target.value);
                  setDropdownOpen(true);
                }}
                placeholder="Search chew toys, waterproof mats, cat puzzles, filters, cages..."
                aria-label="Search EverythingPet products"
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="p-1 mr-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-950 hover:bg-rose-500 text-white text-xs font-bold px-5 py-2 rounded-xl transition-all shrink-0 shadow-xs active:scale-95 cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {dropdownOpen && searchQuery.trim().length > 0 && (
            <div className="absolute top-[calc(100%+8px)] inset-x-0 bg-white border border-slate-200 rounded-2xl shadow-xl p-2 z-50 max-h-80 overflow-y-auto">
              {searchPreview.length > 0 ? (
                searchPreview.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(item);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-left transition cursor-pointer"
                  >
                    <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <DynamicImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.speciesLabel}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-indigo-700">
                      ${item.price.toFixed(2)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-4">
                  No products matched &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 text-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Toggle search bar"
            className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer ${
              mobileSearchOpen
                ? "bg-indigo-950 text-white"
                : "bg-slate-100 text-slate-800 hover:bg-indigo-50"
            }`}
          >
            {mobileSearchOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={() => onAction({ type: "modal", modal: "login" })}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl hover:bg-indigo-50 hover:text-indigo-700 transition cursor-pointer"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-semibold hidden lg:inline">
              Account
            </span>
          </button>

          <button
            type="button"
            onClick={() => onAction({ type: "modal", modal: "wishlist" })}
            className="w-10 h-10 rounded-xl hover:bg-rose-50 hover:text-rose-500 relative flex items-center justify-center transition cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onAction({ type: "modal", modal: "cart" })}
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-indigo-950 hover:bg-rose-500 text-white px-3.5 py-2 rounded-xl relative transition shadow-sm cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs font-bold hidden sm:inline">Cart</span>
            <span className="bg-teal-400 text-slate-950 text-[11px] font-extrabold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden mt-3 relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="flex items-center bg-slate-100 rounded-xl border border-slate-200 pl-3.5 pr-1.5 py-1.5 focus-within:bg-white focus-within:border-indigo-500">
              <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search toys, mats, filters, cages..."
                className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear mobile search"
                  className="p-1 mr-1 text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-indigo-950 text-white text-xs font-bold px-4 py-1.5 rounded-lg shrink-0 cursor-pointer"
              >
                Go
              </button>
            </div>
          </form>

          {searchQuery.trim().length > 0 && (
            <div className="mt-2 bg-white border border-slate-200 rounded-2xl shadow-lg p-2 max-h-64 overflow-y-auto">
              {searchPreview.length > 0 ? (
                searchPreview.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectProduct(item);
                      setMobileSearchOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 text-left cursor-pointer"
                  >
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <DynamicImage
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {item.speciesLabel}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-indigo-700">
                      ${item.price.toFixed(2)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-xs text-slate-400 text-center py-3">
                  No matches for &ldquo;{searchQuery}&rdquo;
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
