"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useRouter } from "next/navigation";
import { INITIAL_ORDERS, PRODUCTS, SITE_BRAND } from "@/data/catalog";
import type {
  CartItem,
  CategoryFilter,
  DynamicActionType,
  JournalArticle,
  OrderRecord,
  Product,
} from "@/types/ecommerce";
import type { DetailedCartItem } from "@/components/store/CartWishlistDrawers";

const CART_KEY = "everythingpet_cart_v3";
const WISH_KEY = "everythingpet_wish_v3";

function subscribeStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("everythingpet-storage-v3", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("everythingpet-storage-v3", callback);
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
    window.dispatchEvent(new Event("everythingpet-storage-v3"));
  } catch {
    // Ignore storage errors
  }
}

function getServerEmpty(): string {
  return "[]";
}

interface StoreContextValue {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: CategoryFilter;
  setActiveCategory: (cat: CategoryFilter) => void;

  cartItems: DetailedCartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartMealsFunded: number;
  wishlist: string[];
  wishlistProducts: Product[];
  promoApplied: boolean;

  addToCart: (product: Product, variant?: string, qty?: number) => void;
  updateQty: (productId: string, variant: string, delta: number) => void;
  removeCartItem: (productId: string, variant: string) => void;
  toggleWishlist: (productId: string) => void;
  applyPromo: (code: string) => void;
  checkout: () => void;

  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (v: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  activeArticle: JournalArticle | null;
  setActiveArticle: (a: JournalArticle | null) => void;
  trackerOpen: boolean;
  setTrackerOpen: (v: boolean) => void;
  loginOpen: boolean;
  setLoginOpen: (v: boolean) => void;
  advisorOpen: boolean;
  setAdvisorOpen: (v: boolean) => void;
  charityModalOpen: boolean;
  setCharityModalOpen: (v: boolean) => void;
  closeAllOverlays: () => void;

  orders: Record<string, OrderRecord>;
  trackInput: string;
  setTrackInput: (val: string) => void;
  activeOrder: OrderRecord | null;
  trackNotFound: boolean;
  submitTrack: (e: React.FormEvent<HTMLFormElement>) => void;
  pickSampleOrder: (id: string) => void;

  handleAction: (action: DynamicActionType) => void;
  openProductPage: (product: Product) => void;
  showToast: (msg: string) => void;
  toast: string | null;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [wishlistOpen, setWishlistOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);
  const [trackerOpen, setTrackerOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [advisorOpen, setAdvisorOpen] = useState<boolean>(false);
  const [charityModalOpen, setCharityModalOpen] = useState<boolean>(false);

  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [orders, setOrders] =
    useState<Record<string, OrderRecord>>(INITIAL_ORDERS);
  const [trackInput, setTrackInput] = useState<string>("EP-2026-8412");
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(
    INITIAL_ORDERS["EP-2026-8412"]
  );
  const [trackNotFound, setTrackNotFound] = useState<boolean>(false);

  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const orderSeqRef = useRef<number>(4210);

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

  const cartItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        return product ? { ...item, product } : null;
      })
      .filter((x): x is DetailedCartItem => x !== null);
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
        (sum, item) => sum + item.product.mealsFunded * item.quantity,
        0
      ),
    [cartItems]
  );

  const wishlistProducts = useMemo(
    () => PRODUCTS.filter((p) => wishlist.includes(p.id)),
    [wishlist]
  );

  const addToCart = (product: Product, variant?: string, qty = 1) => {
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
      `Added "${product.name}" · +${product.mealsFunded * qty} shelter meals`
    );
  };

  const updateQty = (productId: string, variant: string, delta: number) => {
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

  const removeCartItem = (productId: string, variant: string) => {
    updateCart((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variant === variant))
    );
  };

  const toggleWishlist = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    updateWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed ${prod?.name ?? "item"} from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      showToast(`Saved ${prod?.name ?? "item"} to your wishlist`);
      return [...prev, productId];
    });
  };

  const applyPromo = (code: string) => {
    if (code.trim().toUpperCase() === SITE_BRAND.promoCode) {
      setPromoApplied(true);
      showToast(`Promo ${SITE_BRAND.promoCode} applied — 15% off!`);
    } else {
      showToast(`Try promo code ${SITE_BRAND.promoCode} for 15% off`);
    }
  };

  const checkout = () => {
    if (cartItems.length === 0) return;
    const seq = orderSeqRef.current;
    orderSeqRef.current += 1;
    const orderId = `EP-2026-${seq}`;

    const created: OrderRecord = {
      id: orderId,
      status: "Confirmed — Packing at EverythingPet",
      eta: "Estimated Delivery: 2–4 Business Days",
      impactNote: `Funded ${cartMealsFunded} Shelter Meals`,
      steps: [
        {
          title: "Order Confirmed & Charity Profit Logged",
          date: "Just now",
          done: true,
        },
        {
          title: "Packing at EverythingPet Warehouse",
          date: "In queue",
          done: false,
        },
        {
          title: "In Transit — Regional Delivery Hub",
          date: "Pending pickup",
          done: false,
        },
        {
          title: "Out for Local Delivery",
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
    showToast(`Order ${orderId} confirmed! Thank you for helping animals.`);
  };

  const submitTrack = (e: React.FormEvent<HTMLFormElement>) => {
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

  const pickSampleOrder = (id: string) => {
    setTrackInput(id);
    setActiveOrder(orders[id]);
    setTrackNotFound(false);
  };

  const closeAllOverlays = () => {
    setMobileMenuOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
    setQuickViewProduct(null);
    setActiveArticle(null);
    setTrackerOpen(false);
    setLoginOpen(false);
    setAdvisorOpen(false);
    setCharityModalOpen(false);
  };

  const handleAction = (action: DynamicActionType) => {
    if (action.type === "category") {
      setActiveCategory(action.category);
      router.push(`/collections/${action.category}`);
      return;
    }
    if (action.type === "collection") {
      router.push(`/collections/${action.slug}`);
      return;
    }
    if (action.type === "section") {
      if (action.sectionId === "guides") {
        router.push("/journal/ep-guide-1");
        return;
      }
      if (action.sectionId === "mission") {
        setCharityModalOpen(true);
        return;
      }
      const el = document.getElementById(action.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/#${action.sectionId}`);
      }
      return;
    }
    if (action.type === "modal") {
      if (action.modal === "cart") setCartOpen(true);
      if (action.modal === "wishlist") setWishlistOpen(true);
      if (action.modal === "tracker") setTrackerOpen(true);
      if (action.modal === "login") setLoginOpen(true);
      if (action.modal === "advisor") setAdvisorOpen(true);
      if (action.modal === "charity") setCharityModalOpen(true);
    }
  };

  const openProductPage = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <StoreContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        cartItems,
        cartCount,
        cartSubtotal,
        cartMealsFunded,
        wishlist,
        wishlistProducts,
        promoApplied,
        addToCart,
        updateQty,
        removeCartItem,
        toggleWishlist,
        applyPromo,
        checkout,
        mobileMenuOpen,
        setMobileMenuOpen,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        quickViewProduct,
        setQuickViewProduct,
        activeArticle,
        setActiveArticle,
        trackerOpen,
        setTrackerOpen,
        loginOpen,
        setLoginOpen,
        advisorOpen,
        setAdvisorOpen,
        charityModalOpen,
        setCharityModalOpen,
        closeAllOverlays,
        orders,
        trackInput,
        setTrackInput,
        activeOrder,
        trackNotFound,
        submitTrack,
        pickSampleOrder,
        handleAction,
        openProductPage,
        showToast,
        toast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return ctx;
}
