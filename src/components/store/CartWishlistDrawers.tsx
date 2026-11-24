"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Flame,
  Headphones,
  Heart,
  HeartHandshake,
  Minus,
  PawPrint,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
  X,
} from "lucide-react";
import { CATEGORY_NAV_ITEMS, SITE_BRAND } from "@/data/catalog";
import type {
  CartItem,
  CategoryFilter,
  DynamicActionType,
  Product,
} from "@/types/ecommerce";
import DynamicImage from "@/components/common/DynamicImage";

export interface DetailedCartItem extends CartItem {
  product: Product;
}

interface CartWishlistDrawersProps {
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
  activeCategory: CategoryFilter;
  onAction: (action: DynamicActionType) => void;

  cartOpen: boolean;
  onCloseCart: () => void;
  cartItems: DetailedCartItem[];
  cartCount: number;
  cartSubtotal: number;
  cartMealsFunded: number;
  promoApplied: boolean;
  onApplyPromo: (code: string) => void;
  onUpdateQty: (productId: string, variant: string, delta: number) => void;
  onRemoveItem: (productId: string, variant: string) => void;
  onCheckout: () => void;

  wishlistOpen: boolean;
  onCloseWishlist: () => void;
  wishlistProducts: Product[];
  onMoveToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
}

export default function CartWishlistDrawers({
  mobileMenuOpen,
  onCloseMobileMenu,
  activeCategory,
  onAction,
  cartOpen,
  onCloseCart,
  cartItems,
  cartCount,
  cartSubtotal,
  cartMealsFunded,
  promoApplied,
  onApplyPromo,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  wishlistOpen,
  onCloseWishlist,
  wishlistProducts,
  onMoveToCart,
  onToggleWishlist,
}: CartWishlistDrawersProps): React.JSX.Element {
  const [promoInput, setPromoInput] = useState("");

  const threshold = SITE_BRAND.freeShippingThreshold;
  const discountAmount = promoApplied ? cartSubtotal * 0.15 : 0;
  const shippingCost =
    cartSubtotal === 0 || cartSubtotal >= threshold ? 0 : 5.95;
  const total = Math.max(0, cartSubtotal - discountAmount + shippingCost);
  const progress = Math.min(100, (cartSubtotal / threshold) * 100);

  const handlePromoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApplyPromo(promoInput);
  };

  const triggerMobileAction = (action: DynamicActionType) => {
    onCloseMobileMenu();
    onAction(action);
  };

  return (
    <>
      {/* Mobile Navigation Drawer */}
      <aside
        aria-label="Mobile menu"
        className={`fixed top-0 left-0 bottom-0 w-[min(320px,86vw)] bg-[#F6F8FC] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4 bg-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-900 to-rose-500 text-white flex items-center justify-center">
              <PawPrint className="w-4 h-4" />
            </span>
            <span className="font-display text-lg font-extrabold text-slate-900">
              {SITE_BRAND.nameFirst}
              <span className="text-rose-500">{SITE_BRAND.nameSecond}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobileMenu}
            aria-label="Close mobile menu"
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
              Shop by Category
            </span>
            <div className="flex flex-col gap-1.5">
              {CATEGORY_NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    triggerMobileAction({ type: "category", category: item.id })
                  }
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-left transition cursor-pointer ${
                    activeCategory === item.id
                      ? "bg-indigo-950 text-white"
                      : "bg-white border border-slate-200 text-slate-800 hover:border-indigo-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
              Quick Access
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "collection", slug: "sale" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-rose-600 flex items-center gap-2.5 cursor-pointer"
              >
                <Flame className="w-4 h-4" /> On Sale Now
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "collection", slug: "new" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-indigo-700 flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> New Arrivals
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "section", sectionId: "guides" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> Pet Care Guides
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "modal", modal: "charity" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-teal-700 flex items-center gap-2.5 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" /> Animal Welfare Mission
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "modal", modal: "tracker" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 flex items-center gap-2.5 cursor-pointer"
              >
                <Truck className="w-4 h-4" /> Track Order
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "modal", modal: "advisor" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-800 flex items-center gap-2.5 cursor-pointer"
              >
                <Headphones className="w-4 h-4" /> 24/7 Pet Care Support
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border-t border-slate-200">
          <button
            type="button"
            onClick={() =>
              triggerMobileAction({ type: "modal", modal: "login" })
            }
            className="w-full bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold py-3 rounded-xl inline-flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <User className="w-4 h-4" />
            My Account ({SITE_BRAND.promoCode})
          </button>
        </div>
      </aside>

      {/* Shopping Cart Drawer */}
      <aside
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 bottom-0 w-[min(440px,100vw)] bg-[#F6F8FC] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              Your Cart ({cartCount})
            </h3>
            <p className="text-xs text-slate-400">
              Fast delivery · Profits fund animal welfare
            </p>
          </div>
          <button
            type="button"
            onClick={onCloseCart}
            aria-label="Close cart"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-3.5 bg-teal-50 text-teal-900 text-xs font-semibold border-b border-teal-100">
          {cartSubtotal >= threshold ? (
            <span>🎉 You unlocked FREE fast delivery!</span>
          ) : (
            <span>
              Add <strong>${(threshold - cartSubtotal).toFixed(2)}</strong> more
              for free delivery
            </span>
          )}
          <div className="h-1.5 bg-teal-200 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-3.5">
          {cartItems.length === 0 ? (
            <div className="my-auto text-center py-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-bold text-slate-900 mb-1">
                Your cart is empty
              </h4>
              <p className="text-sm text-slate-500 mb-5">
                Shop toys, mats, feeders, filters &amp; cages for all 6 pet
                categories.
              </p>
              <button
                type="button"
                onClick={onCloseCart}
                className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-indigo-950 to-indigo-800 text-white px-4 py-3 rounded-2xl text-xs flex items-center gap-3">
                <HeartHandshake className="w-4 h-4 text-teal-300 shrink-0" />
                <span>
                  This order funds{" "}
                  <strong className="text-teal-300">
                    {cartMealsFunded} shelter animal meals
                  </strong>{" "}
                  through EverythingPet.
                </span>
              </div>

              {cartItems.map(({ product, variant, quantity }) => (
                <div
                  key={`${product.id}-${variant}`}
                  className="bg-white border border-slate-200/80 rounded-2xl p-3 flex gap-3.5"
                >
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <DynamicImage
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-400 mb-2">{variant}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 bg-slate-100 rounded-xl px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, variant, -1)}
                          aria-label="Decrease quantity"
                          className="w-5 h-5 rounded-lg hover:bg-indigo-950 hover:text-white flex items-center justify-center cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold min-w-[16px] text-center">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, variant, 1)}
                          aria-label="Increase quantity"
                          className="w-5 h-5 rounded-lg hover:bg-indigo-950 hover:text-white flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <strong className="block text-sm text-slate-900">
                          ${(product.price * quantity).toFixed(2)}
                        </strong>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id, variant)}
                          className="text-[11px] font-semibold text-rose-500 hover:underline cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 bg-white border-t border-slate-200 flex flex-col gap-3">
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={`Promo code (try ${SITE_BRAND.promoCode})`}
                className="flex-1 h-10 px-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-xs font-bold text-slate-800 transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-teal-700 font-semibold">
                  <span>Club Discount ({SITE_BRAND.promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold py-3.5 rounded-xl shadow-lg shadow-rose-500/25 transition cursor-pointer mt-1"
            >
              Checkout · Fund {cartMealsFunded} Shelter Meals
            </button>
          </div>
        )}
      </aside>

      {/* Wishlist Drawer */}
      <aside
        aria-label="Wishlist"
        className={`fixed top-0 right-0 bottom-0 w-[min(420px,100vw)] bg-[#F6F8FC] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          wishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Wishlist ({wishlistProducts.length})
          </h3>
          <button
            type="button"
            onClick={onCloseWishlist}
            aria-label="Close wishlist"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-3.5">
          {wishlistProducts.length === 0 ? (
            <div className="my-auto text-center py-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-bold text-slate-900 mb-1">
                Your wishlist is empty
              </h4>
              <p className="text-sm text-slate-500">
                Tap the heart icon on any item to save it here.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-slate-200/80 rounded-2xl p-3 flex gap-3.5"
              >
                <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <DynamicImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-indigo-600 mt-0.5 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-950 hover:bg-rose-500 text-white text-xs font-bold transition cursor-pointer"
                    >
                      Move to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      className="text-xs font-semibold text-slate-400 hover:text-rose-500 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
