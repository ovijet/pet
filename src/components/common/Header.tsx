"use client";

import React from "react";
import TopUtilityBar from "./TopUtilityBar";
import Navbar from "./Navbar";
import CategoryNav from "./CategoryNav";
import type { HeaderProps } from "@/types/ecommerce";

export default function Header({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  cartCount,
  wishlistCount,
  onAction,
  onSelectProduct,
  onOpenMobileMenu,
}: HeaderProps): React.JSX.Element {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/8 shadow-[0_6px_24px_rgba(20,38,28,0.05)]">
      <TopUtilityBar onAction={onAction} />
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onAction={onAction}
        onSelectProduct={onSelectProduct}
        onOpenMobileMenu={onOpenMobileMenu}
      />
      <CategoryNav
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAction={onAction}
      />
    </header>
  );
}
