"use client";

import React, { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Header from "@/components/common/Header";
import Hero from "@/components/common/Hero";
import Footer from "@/components/common/Footer";
import TrustStrip from "@/components/store/TrustStrip";
import SpeciesShowcase from "@/components/store/SpeciesShowcase";
import FlashDealsSection from "@/components/store/FlashDealsSection";
import CatalogSection from "@/components/store/CatalogSection";
import MissionImpactSection from "@/components/store/MissionImpactSection";
import ConciergeSection from "@/components/store/ConciergeSection";
import CartWishlistDrawers from "@/components/store/CartWishlistDrawers";
import StoreModals from "@/components/store/StoreModals";
import { INITIAL_ORDERS, PRODUCTS } from "@/data/catalog";
import type {
  CartItem,
  CategoryFilter,
  CollectionFilter,
  OrderRecord,
  PetTypeId,
  Product,
  SortOption,
} from "@/types/ecommerce";

const CART_KEY = "pawhaven_bag_v1";
const WISH_KEY = "pawhaven_saved_v1";

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("pawhaven-storage", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("pawhaven-storage", callback);
  };
}

function readStorageRaw(key: string): string {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
}

function writeStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new Event("pawhaven-storage"));
  } catch {
    // Ignore storage write errors
  }
}

function getServerEmpty(): string {
  return "[]";
}

export default function EverythingPetStore(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [activePetType, setActivePetType] = useState<PetTypeId | "all">("all");
  const [collectionTab, setCollectionTab] = useState<CollectionFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [trackerOpen, setTrackerOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);

  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [orders, setOrders] =
    useState<Record<string, OrderRecord>>(INITIAL_ORDERS);
  const [trackInput, setTrackInput] = useState<string>("PH-2026-5104");
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(
    INITIAL_ORDERS["PH-2026-5104"]
  );
  const [trackNotFound, setTrackNotFound] = useState<boolean>(false);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orderSeqRef = useRef<number>(8201);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  };

  const cartRaw = useSyncExternalStore(
    subscribeStorage,
    () => readStorageRaw(CART_KEY),
    getServerEmpty
  );
  const wishRaw = useSyncExternalStore(
    subscribeStorage,
    () => readStorageRaw(WISH_KEY),
    getServerEmpty
  );

  const cart = useMemo<CartItem[]>(() => {
    try {
      return JSON.parse(cartRaw) as CartItem[];
    } catch {
      return [];
    }
  }, [cartRaw]);

  const wishlist = useMemo<string[]>(() => {
    try {
      return JSON.parse(wishRaw) as string[];
    } catch {
      return [];
    }
  }, [wishRaw]);

  const updateCart = (
    updater: CartItem[] | ((prev: CartItem[]) => CartItem[])
  ) => {
    const next = typeof updater === "function" ? updater(cart) : updater;
    writeStorage(CART_KEY, next);
  };

  const updateWishlist = (
    updater: string[] | ((prev: string[]) => string[])
  ) => {
    const next = typeof updater === "function" ? updater(wishlist) : updater;
    writeStorage(WISH_KEY, next);
  };

  const memberDrops = useMemo(
    () => PRODUCTS.filter((p) => p.oldPrice !== null).slice(0, 4),
    []
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchNeed =
        activeCategory === "all" || p.category === activeCategory;
      const matchPet = activePetType === "all" || p.petType === activePetType;
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
  }, [activeCategory, activePetType, collectionTab, searchQuery, sortBy]);

  const cartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((x): x is CartItem & { product: Product } => x !== null);
  }, [cart]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () =>
      cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const cartMealsFunded = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.grantMeals * item.quantity,
        0
      ),
    [cartItems]
  );

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  const handleAddToCart = (product: Product, variant?: string, qty = 1) => {
    const chosenVariant = variant || product.variants[0];
    updateCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.productId === product.id && i.variant === chosenVariant
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [
        ...prev,
        { productId: product.id, variant: chosenVariant, quantity: qty },
      ];
    });
    showToast(
      `Added "${product.name}" · +${product.grantMeals * qty} rescue meals`
    );
  };

  const handleUpdateQty = (
    productId: string,
    variant: string,
    delta: number
  ) => {
    updateCart((prev) =>
      prev
        .map((i) =>
          i.productId === productId && i.variant === variant
            ? { ...i, quantity: i.quantity + delta }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveCartItem = (productId: string, variant: string) => {
    updateCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variant === variant))
    );
  };

  const handleToggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    updateWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed ${prod?.name ?? "item"} from saved picks`);
        return prev.filter((id) => id !== productId);
      }
      showToast(`Saved ${prod?.name ?? "item"} for later`);
      return [...prev, productId];
    });
  };

  const handleSelectPetType = (petType: PetTypeId) => {
    setActivePetType((prev) => (prev === petType ? "all" : petType));
    setActiveCategory("all");
    setCollectionTab("all");
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyPromo = (code: string) => {
    if (code.trim().toUpperCase() === "HAVEN20") {
      setPromoApplied(true);
      showToast("Haven Pass code HAVEN20 applied — 20% off!");
    } else {
      showToast("Try member code HAVEN20 for 20% off your bag");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const seq = orderSeqRef.current;
    orderSeqRef.current += 1;
    const orderId = `PH-2026-${seq}`;

    const created: OrderRecord = {
      id: orderId,
      status: "Confirmed — Packing Compostable Box",
      eta: "Estimated Arrival: 3–4 Business Days",
      grantNote: `${cartMealsFunded} Rescue Meals Granted`,
      steps: [
        {
          title: "Order Confirmed & Rescue Grant Allocated",
          date: "Just now",
          done: true,
        },
        {
          title: "Packing in Compostable Kraft Box",
          date: "In studio queue",
          done: false,
        },
        {
          title: "Metro Courier Dispatch",
          date: "Pending pickup",
          done: false,
        },
        {
          title: "Out for Doorstep Delivery",
          date: "Pending",
          done: false,
        },
      ],
    };

    setOrders((prev) => ({ ...prev, [orderId]: created }));
    updateCart([]);
    setPromoApplied(false);
    setCartOpen(false);
    setTrackInput(orderId);
    setActiveOrder(created);
    setTrackNotFound(false);
    setTrackerOpen(true);
    showToast(`Order ${orderId} confirmed! Thank you for supporting rescues.`);
  };

  const handleTrackSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = orders[trackInput.trim().toUpperCase()];
    if (found) {
      setActiveOrder(found);
      setTrackNotFound(false);
    } else {
      setActiveOrder(null);
      setTrackNotFound(true);
    }
  };

  const anyModalOrDrawerOpen =
    cartOpen ||
    wishlistOpen ||
    Boolean(quickViewProduct) ||
    trackerOpen ||
    loginOpen;

  const closeAllOverlays = () => {
    setCartOpen(false);
    setWishlistOpen(false);
    setQuickViewProduct(null);
    setTrackerOpen(false);
    setLoginOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#14261C]">
      <Header
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setActivePetType("all");
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setWishlistOpen(true)}
        onCartClick={() => setCartOpen(true)}
        onTrackOrderClick={() => setTrackerOpen(true)}
        onLoginClick={() => setLoginOpen(true)}
        onSelectProduct={(product) => setQuickViewProduct(product)}
      />

      <main className="flex-1">
        <Hero
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            setActivePetType("all");
          }}
        />

        <TrustStrip />

        <SpeciesShowcase
          activePetType={activePetType}
          onSelectPetType={handleSelectPetType}
        />

        <FlashDealsSection
          deals={memberDrops}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
        />

        <CatalogSection
          products={filteredProducts}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activePetType={activePetType}
          setActivePetType={setActivePetType}
          collectionTab={collectionTab}
          setCollectionTab={setCollectionTab}
          sortBy={sortBy}
          setSortBy={setSortBy}
          wishlist={wishlist}
          onResetFilters={() => {
            setActiveCategory("all");
            setActivePetType("all");
            setCollectionTab("all");
            setSearchQuery("");
          }}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
        />

        <MissionImpactSection
          cartMealsFunded={cartMealsFunded}
          onOpenCart={() => setCartOpen(true)}
        />

        <ConciergeSection
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={setQuickViewProduct}
          onNotify={showToast}
        />
      </main>

      <Footer
        wishlistCount={wishlist.length}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          setActivePetType("all");
        }}
        onOpenTracker={() => setTrackerOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {anyModalOrDrawerOpen && (
        <div
          onClick={closeAllOverlays}
          className="fixed inset-0 bg-[#102118]/55 backdrop-blur-xs z-40"
          aria-hidden="true"
        />
      )}

      <CartWishlistDrawers
        cartOpen={cartOpen}
        onCloseCart={() => setCartOpen(false)}
        cartItems={cartItems}
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        cartMealsFunded={cartMealsFunded}
        promoApplied={promoApplied}
        onApplyPromo={handleApplyPromo}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        wishlistOpen={wishlistOpen}
        onCloseWishlist={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onMoveToCart={(product) => {
          handleAddToCart(product, product.variants[0]);
          setWishlistOpen(false);
          setCartOpen(true);
        }}
        onToggleWishlist={handleToggleWishlist}
      />

      <StoreModals
        quickViewProduct={quickViewProduct}
        onCloseQuickView={() => setQuickViewProduct(null)}
        onAddToCart={(product, variant, qty) => {
          handleAddToCart(product, variant, qty);
          setCartOpen(true);
        }}
        trackerOpen={trackerOpen}
        onCloseTracker={() => setTrackerOpen(false)}
        orders={orders}
        trackInput={trackInput}
        setTrackInput={setTrackInput}
        activeOrder={activeOrder}
        trackNotFound={trackNotFound}
        onTrackSubmit={handleTrackSubmit}
        onPickSampleOrder={(id) => {
          setTrackInput(id);
          setActiveOrder(orders[id]);
          setTrackNotFound(false);
        }}
        loginOpen={loginOpen}
        onCloseLogin={() => setLoginOpen(false)}
        onClubSignIn={(email) =>
          showToast(`Signed in as ${email} · Haven Pass HAVEN20 active!`)
        }
      />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none"
        >
          <div className="bg-[#102118] text-[#FBF8F3] px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2.5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
