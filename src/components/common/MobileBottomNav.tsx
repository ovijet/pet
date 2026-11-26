"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, ShoppingCart, Store, User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function MobileBottomNav(): React.JSX.Element {
  const pathname = usePathname();
  const store = useStore();

  const activeTab: "home" | "shop" | "cart" | "wishlist" | "login" =
    store.cartOpen
      ? "cart"
      : store.wishlistOpen
      ? "wishlist"
      : store.loginOpen
      ? "login"
      : pathname.startsWith("/collections") || pathname.startsWith("/products")
      ? "shop"
      : "home";

  const closeDrawersOnly = () => {
    store.setCartOpen(false);
    store.setWishlistOpen(false);
    store.setLoginOpen(false);
    store.setMobileMenuOpen(false);
  };

  return (
    <nav
      aria-label="Mobile bottom navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/96 backdrop-blur-lg border-t border-slate-200 shadow-[0_-6px_24px_rgba(15,23,42,0.08)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5 h-[64px] max-w-lg mx-auto">
        {/* Home */}
        <Link
          href="/"
          onClick={closeDrawersOnly}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "home"
              ? "text-indigo-600"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {activeTab === "home" && (
            <span className="absolute top-0 w-10 h-[3px] rounded-b-full bg-indigo-600" />
          )}
          <Home className="w-[21px] h-[21px]" strokeWidth={activeTab === "home" ? 2.3 : 1.9} />
          <span className="text-[11px] font-semibold leading-none">Home</span>
        </Link>

        {/* Shop */}
        <Link
          href="/collections/all"
          onClick={closeDrawersOnly}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === "shop"
              ? "text-indigo-600"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {activeTab === "shop" && (
            <span className="absolute top-0 w-10 h-[3px] rounded-b-full bg-indigo-600" />
          )}
          <Store className="w-[21px] h-[21px]" strokeWidth={activeTab === "shop" ? 2.3 : 1.9} />
          <span className="text-[11px] font-semibold leading-none">Shop</span>
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={() => {
            store.setWishlistOpen(false);
            store.setLoginOpen(false);
            store.setCartOpen(!store.cartOpen);
          }}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "cart"
              ? "text-indigo-600"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {activeTab === "cart" && (
            <span className="absolute top-0 w-10 h-[3px] rounded-b-full bg-indigo-600" />
          )}
          <span className="relative">
            <ShoppingCart
              className="w-[21px] h-[21px]"
              strokeWidth={activeTab === "cart" ? 2.3 : 1.9}
            />
            {store.cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {store.cartCount}
              </span>
            )}
          </span>
          <span className="text-[11px] font-semibold leading-none">Cart</span>
        </button>

        {/* Wishlist */}
        <button
          type="button"
          onClick={() => {
            store.setCartOpen(false);
            store.setLoginOpen(false);
            store.setWishlistOpen(!store.wishlistOpen);
          }}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "wishlist"
              ? "text-indigo-600"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {activeTab === "wishlist" && (
            <span className="absolute top-0 w-10 h-[3px] rounded-b-full bg-indigo-600" />
          )}
          <span className="relative">
            <Heart
              className="w-[21px] h-[21px]"
              strokeWidth={activeTab === "wishlist" ? 2.3 : 1.9}
            />
            {store.wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {store.wishlist.length}
              </span>
            )}
          </span>
          <span className="text-[11px] font-semibold leading-none">
            Wishlist
          </span>
        </button>

        {/* Login */}
        <button
          type="button"
          onClick={() => {
            store.setCartOpen(false);
            store.setWishlistOpen(false);
            store.setLoginOpen(!store.loginOpen);
          }}
          className={`relative flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activeTab === "login"
              ? "text-indigo-600"
              : "text-slate-500 hover:text-indigo-600"
          }`}
        >
          {activeTab === "login" && (
            <span className="absolute top-0 w-10 h-[3px] rounded-b-full bg-indigo-600" />
          )}
          <User
            className="w-[21px] h-[21px]"
            strokeWidth={activeTab === "login" ? 2.3 : 1.9}
          />
          <span className="text-[11px] font-semibold leading-none">Login</span>
        </button>
      </div>
    </nav>
  );
}

