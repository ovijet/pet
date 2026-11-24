"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Heart,
  HeartHandshake,
  MessageCircleHeart,
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
  const discountAmount = promoApplied ? cartSubtotal * 0.2 : 0;
  const shippingCost =
    cartSubtotal === 0 || cartSubtotal >= threshold ? 0 : 6.5;
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
        className={`fixed top-0 left-0 bottom-0 w-[min(320px,86vw)] bg-[#FBF8F3] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 py-4 bg-white border-b border-emerald-950/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-[#183A2E] text-amber-200 flex items-center justify-center">
              <PawPrint className="w-4 h-4" />
            </span>
            <span className="font-display text-lg font-bold text-[#14261C]">
              {SITE_BRAND.nameFirst}
              <span className="text-[#d96b43]">{SITE_BRAND.nameSecond}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobileMenu}
            aria-label="Close mobile menu"
            className="w-9 h-9 rounded-full bg-[#F3EDE2] text-[#14261C] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2.5">
              Shop by Need
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
                      ? "bg-[#183A2E] text-white"
                      : "bg-white border border-emerald-950/8 text-[#14261C] hover:border-[#183A2E]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-2.5">
              Explore Studio
            </span>
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "section", sectionId: "drops" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-950/8 text-sm font-semibold text-[#d96b43] flex items-center gap-2.5 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Weekly Member Drops
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "section", sectionId: "journal" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-950/8 text-sm font-semibold text-[#14261C] flex items-center gap-2.5 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> The Care Journal
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "section", sectionId: "grants" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-950/8 text-sm font-semibold text-emerald-800 flex items-center gap-2.5 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" /> 10% Rescue Grants
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "modal", modal: "tracker" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-950/8 text-sm font-semibold text-[#14261C] flex items-center gap-2.5 cursor-pointer"
              >
                <Truck className="w-4 h-4" /> Check Parcel Status
              </button>
              <button
                type="button"
                onClick={() =>
                  triggerMobileAction({ type: "modal", modal: "advisor" })
                }
                className="px-4 py-2.5 rounded-xl bg-white border border-emerald-950/8 text-sm font-semibold text-[#14261C] flex items-center gap-2.5 cursor-pointer"
              >
                <MessageCircleHeart className="w-4 h-4" /> Ask a Vet Advisor
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 bg-white border-t border-emerald-950/10">
          <button
            type="button"
            onClick={() =>
              triggerMobileAction({ type: "modal", modal: "login" })
            }
            className="w-full bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold py-3 rounded-full inline-flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <User className="w-4 h-4" />
            Sign In · Haven Pass ({SITE_BRAND.promoCode})
          </button>
        </div>
      </aside>

      {/* Shopping Bag Drawer */}
      <aside
        aria-label="Shopping bag"
        className={`fixed top-0 right-0 bottom-0 w-[min(440px,100vw)] bg-[#FBF8F3] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-b border-emerald-950/10 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#14261C]">
              Your PawHaven Bag ({cartCount})
            </h3>
            <p className="text-xs text-stone-400">
              Compostable parcel · 10% Rescue Grant
            </p>
          </div>
          <button
            type="button"
            onClick={onCloseCart}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-[#14261C] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 sm:px-6 py-3.5 bg-[#E6EFE9] text-[#14261C] text-xs font-semibold">
          {cartSubtotal >= threshold ? (
            <span>🎉 Complimentary plastic-free shipping unlocked!</span>
          ) : (
            <span>
              Add <strong>${(threshold - cartSubtotal).toFixed(2)}</strong> more
              for free eco delivery
            </span>
          )}
          <div className="h-1.5 bg-[#183A2E]/15 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-[#183A2E] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-3.5">
          {cartItems.length === 0 ? (
            <div className="my-auto text-center py-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#F3EDE2] text-[#183A2E] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-semibold text-[#14261C] mb-1">
                Your bag is currently empty
              </h4>
              <p className="text-sm text-stone-500 mb-5">
                Explore daily nutrition, play toys, habitats &amp; starter kits.
              </p>
              <button
                type="button"
                onClick={onCloseCart}
                className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition cursor-pointer"
              >
                Browse Studio
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-[#183A2E] to-[#255544] text-[#FBF8F3] px-4 py-3 rounded-2xl text-xs flex items-center gap-3">
                <HeartHandshake className="w-4 h-4 text-amber-300 shrink-0" />
                <span>
                  This bag grants{" "}
                  <strong className="text-amber-300">
                    {cartMealsFunded} warm foster meals
                  </strong>{" "}
                  through our Rescue Fund.
                </span>
              </div>

              {cartItems.map(({ product, variant, quantity }) => (
                <div
                  key={`${product.id}-${variant}`}
                  className="bg-white border border-emerald-950/10 rounded-2xl p-3 flex gap-3.5"
                >
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-[#F3EDE2] shrink-0">
                    <DynamicImage
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="72px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#14261C] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-stone-400 mb-2">{variant}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 bg-[#F3EDE2] rounded-full px-2 py-1">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(product.id, variant, -1)}
                          aria-label="Decrease quantity"
                          className="w-5 h-5 rounded-full hover:bg-[#183A2E] hover:text-white flex items-center justify-center cursor-pointer"
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
                          className="w-5 h-5 rounded-full hover:bg-[#183A2E] hover:text-white flex items-center justify-center cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <strong className="block text-sm text-[#14261C]">
                          ${(product.price * quantity).toFixed(2)}
                        </strong>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(product.id, variant)}
                          className="text-[11px] font-semibold text-[#d96b43] hover:underline cursor-pointer"
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
          <div className="p-5 sm:p-6 bg-white border-t border-emerald-950/10 flex flex-col gap-3">
            <form onSubmit={handlePromoSubmit} className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder={`Member code (try ${SITE_BRAND.promoCode})`}
                className="flex-1 h-10 px-4 rounded-full border border-emerald-950/15 text-xs focus:outline-none focus:border-[#183A2E]"
              />
              <button
                type="submit"
                className="px-4 h-10 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-xs font-bold text-[#14261C] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Haven Pass ({SITE_BRAND.promoCode})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Eco Parcel Shipping</span>
                <span>
                  {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#14261C] pt-2 border-t border-emerald-950/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onCheckout}
              className="w-full bg-[#d96b43] hover:bg-[#bc5530] text-white text-sm font-bold py-3.5 rounded-full shadow-lg shadow-[#d96b43]/25 transition cursor-pointer mt-1"
            >
              Place Order · Grant {cartMealsFunded} Meals
            </button>
          </div>
        )}
      </aside>

      {/* Saved List Drawer */}
      <aside
        aria-label="Saved items"
        className={`fixed top-0 right-0 bottom-0 w-[min(420px,100vw)] bg-[#FBF8F3] z-50 shadow-2xl transition-transform duration-300 flex flex-col ${
          wishlistOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-5 sm:px-6 py-4 sm:py-5 bg-white border-b border-emerald-950/10 flex items-center justify-between">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-[#14261C]">
            Saved Picks ({wishlistProducts.length})
          </h3>
          <button
            type="button"
            onClick={onCloseWishlist}
            aria-label="Close saved picks"
            className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-[#14261C] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 flex flex-col gap-3.5">
          {wishlistProducts.length === 0 ? (
            <div className="my-auto text-center py-10">
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-rose-50 text-[#d96b43] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-display text-xl font-semibold text-[#14261C] mb-1">
                No picks saved yet
              </h4>
              <p className="text-sm text-stone-500">
                Tap the heart icon on any item to keep it handy for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-emerald-950/10 rounded-2xl p-3 flex gap-3.5"
              >
                <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-[#F3EDE2] shrink-0">
                  <DynamicImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-[#14261C] truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs font-bold text-[#d96b43] mt-0.5 mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => onMoveToCart(product)}
                      className="px-3.5 py-1 rounded-full bg-[#183A2E] hover:bg-[#d96b43] text-white text-xs font-semibold transition cursor-pointer"
                    >
                      Move to Bag
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleWishlist(product.id)}
                      className="text-xs font-semibold text-stone-400 hover:text-[#d96b43] cursor-pointer"
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
