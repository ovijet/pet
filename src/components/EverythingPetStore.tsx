"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/common/Hero";
import TrustStrip from "@/components/store/TrustStrip";
import SpeciesShowcase from "@/components/store/SpeciesShowcase";
import FlashDealsSection from "@/components/store/FlashDealsSection";
import CatalogSection from "@/components/store/CatalogSection";
import MissionImpactSection from "@/components/store/MissionImpactSection";
import ConciergeSection from "@/components/store/ConciergeSection";
import { useStore } from "@/context/StoreContext";
import { PRODUCTS } from "@/data/catalog";
import type {
  CategoryFilter,
  CollectionFilter,
  PetTypeId,
  SortOption,
} from "@/types/ecommerce";

export default function EverythingPetStore(): React.JSX.Element {
  const router = useRouter();
  const store = useStore();

  const [localCategory, setLocalCategory] = useState<CategoryFilter>("all");
  const [localPetType, setLocalPetType] = useState<PetTypeId | "all">("all");
  const [collectionTab, setCollectionTab] = useState<CollectionFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const memberDrops = useMemo(
    () => PRODUCTS.filter((p) => p.oldPrice !== null).slice(0, 4),
    []
  );

  const filteredProducts = useMemo(() => {
    const q = store.searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchNeed =
        localCategory === "all" || p.category === localCategory;
      const matchPet = localPetType === "all" || p.petType === localPetType;
      const matchTab =
        collectionTab === "all" || p.collections.includes(collectionTab);
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.petLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchNeed && matchPet && matchTab && matchQuery;
    });

    if (sortBy === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      return [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")
      return [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [localCategory, localPetType, collectionTab, store.searchQuery, sortBy]);

  return (
    <>
      <Hero onAction={store.handleAction} />

      <TrustStrip onAction={store.handleAction} />

      <SpeciesShowcase
        activePetType={localPetType}
        onSelectPetType={(pet) => router.push(`/collections/${pet}`)}
      />

      <FlashDealsSection
        deals={memberDrops}
        wishlist={store.wishlist}
        onAddToCart={store.addToCart}
        onToggleWishlist={store.toggleWishlist}
        onQuickView={store.setQuickViewProduct}
      />

      <CatalogSection
        products={filteredProducts}
        activeCategory={localCategory}
        setActiveCategory={setLocalCategory}
        activePetType={localPetType}
        setActivePetType={setLocalPetType}
        collectionTab={collectionTab}
        setCollectionTab={setCollectionTab}
        sortBy={sortBy}
        setSortBy={setSortBy}
        wishlist={store.wishlist}
        onResetFilters={() => {
          setLocalCategory("all");
          setLocalPetType("all");
          setCollectionTab("all");
          store.setSearchQuery("");
        }}
        onAddToCart={store.addToCart}
        onToggleWishlist={store.toggleWishlist}
        onQuickView={store.setQuickViewProduct}
      />

      <MissionImpactSection
        cartMealsFunded={store.cartMealsFunded}
        onAction={store.handleAction}
      />

      <ConciergeSection
        wishlist={store.wishlist}
        onAddToCart={store.addToCart}
        onToggleWishlist={store.toggleWishlist}
        onQuickView={store.setQuickViewProduct}
        onNotify={store.showToast}
      />
    </>
  );
}
