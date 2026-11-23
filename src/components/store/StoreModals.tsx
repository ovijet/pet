"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HeartHandshake,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  UserCheck,
  X,
} from "lucide-react";
import type { OrderRecord, Product } from "@/types/ecommerce";

interface StoreModalsProps {
  quickViewProduct: Product | null;
  onCloseQuickView: () => void;
  onAddToCart: (product: Product, variant: string, qty: number) => void;

  trackerOpen: boolean;
  onCloseTracker: () => void;
  orders: Record<string, OrderRecord>;
  trackInput: string;
  setTrackInput: (val: string) => void;
  activeOrder: OrderRecord | null;
  trackNotFound: boolean;
  onTrackSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onPickSampleOrder: (orderId: string) => void;

  loginOpen: boolean;
  onCloseLogin: () => void;
  onClubSignIn: (email: string) => void;
}

export default function StoreModals({
  quickViewProduct,
  onCloseQuickView,
  onAddToCart,
  trackerOpen,
  onCloseTracker,
  orders,
  trackInput,
  setTrackInput,
  activeOrder,
  trackNotFound,
  onTrackSubmit,
  onPickSampleOrder,
  loginOpen,
  onCloseLogin,
  onClubSignIn,
}: StoreModalsProps): React.JSX.Element {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [loginEmail, setLoginEmail] = useState<string>("");

  const activeVariant =
    quickViewProduct && quickViewProduct.variants.includes(selectedVariant)
      ? selectedVariant
      : quickViewProduct?.variants[0] ?? "";

  const handleQuickAdd = () => {
    if (!quickViewProduct) return;
    onAddToCart(quickViewProduct, activeVariant, qty);
    setQty(1);
    onCloseQuickView();
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    onClubSignIn(loginEmail.trim());
    setLoginEmail("");
    onCloseLogin();
  };

  return (
    <>
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(840px,calc(100vw-32px))] max-h-[calc(100vh-40px)] overflow-y-auto bg-[#FBF8F3] rounded-[32px] shadow-2xl z-50 grid grid-cols-1 md:grid-cols-2"
        >
          <button
            type="button"
            onClick={onCloseQuickView}
            aria-label="Close product preview"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 text-[#14261C] hover:bg-[#183A2E] hover:text-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative min-h-[280px] md:min-h-[420px] bg-[#F3EDE2]">
            <Image
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          <div className="p-7 sm:p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#d96b43]">
                {quickViewProduct.categoryLabel} · {quickViewProduct.petLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#14261C]">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {quickViewProduct.rating} ({quickViewProduct.reviews})
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#14261C] leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-extrabold text-[#14261C]">
                ${quickViewProduct.price.toFixed(2)}
              </span>
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-stone-400 line-through">
                  ${quickViewProduct.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {quickViewProduct.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#183A2E] bg-[#E6EFE9] px-3.5 py-2 rounded-xl w-fit">
              <HeartHandshake className="w-4 h-4" />
              Grants {quickViewProduct.grantMeals} warm foster meals per unit
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Choose Edition
              </span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer ${
                      activeVariant === v
                        ? "bg-[#183A2E] border-[#183A2E] text-[#FBF8F3]"
                        : "bg-white border-emerald-950/15 text-[#14261C] hover:border-[#183A2E]"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2 pt-4 border-t border-emerald-950/10">
              <div className="inline-flex items-center gap-3 bg-white border border-emerald-950/15 rounded-full px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-full hover:bg-[#F3EDE2] flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold min-w-[18px] text-center">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-6 h-6 rounded-full hover:bg-[#F3EDE2] flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex-1 bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold py-3 px-5 rounded-full inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag · ${(quickViewProduct.price * qty).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Parcel Status Modal */}
      {trackerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Parcel Status"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(540px,calc(100vw-32px))] max-h-[calc(100vh-40px)] overflow-y-auto bg-[#FBF8F3] rounded-[32px] p-7 sm:p-8 shadow-2xl z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43]">
              <Truck className="w-3.5 h-3.5" />
              Parcel Status
            </span>
            <button
              type="button"
              onClick={onCloseTracker}
              aria-label="Close parcel status"
              className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-[#14261C] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-display text-2xl font-semibold text-[#14261C]">
            Check your PawHaven delivery
          </h3>

          <form onSubmit={onTrackSubmit} className="flex gap-2 mt-4 mb-2">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              placeholder="Parcel ID (e.g. PH-2026-5104)"
              className="flex-1 h-11 px-4 rounded-full bg-white border border-emerald-950/18 text-sm focus:outline-none focus:border-[#183A2E]"
            />
            <button
              type="submit"
              className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold px-5 rounded-full transition cursor-pointer"
            >
              Lookup
            </button>
          </form>

          <div className="text-xs text-stone-500 mb-5">
            Sample IDs:
            {Object.keys(orders)
              .slice(0, 3)
              .map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onPickSampleOrder(id)}
                  className="ml-2 font-bold text-[#d96b43] underline cursor-pointer"
                >
                  {id}
                </button>
              ))}
          </div>

          {trackNotFound && (
            <p className="text-sm text-[#d96b43] bg-rose-50 px-4 py-3 rounded-xl font-medium">
              Parcel ID not found. Try a sample ID above or place a quick test
              order!
            </p>
          )}

          {activeOrder && (
            <div className="bg-white border border-emerald-950/10 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-emerald-950/10">
                <div>
                  <span className="text-xs font-bold text-stone-400">
                    {activeOrder.id}
                  </span>
                  <strong className="block text-base text-[#14261C]">
                    {activeOrder.status}
                  </strong>
                  <span className="text-xs text-stone-500">
                    {activeOrder.eta}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E6EFE9] text-[#183A2E] text-xs font-bold">
                  {activeOrder.grantNote}
                </span>
              </div>

              <div className="mt-4 pl-6 relative space-y-4 before:content-[''] before:absolute before:left-[7px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-emerald-950/15">
                {activeOrder.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full ${
                        step.done
                          ? "bg-[#183A2E] ring-4 ring-[#E6EFE9]"
                          : "bg-stone-300"
                      }`}
                    />
                    <strong className="block text-sm text-[#14261C]">
                      {step.title}
                    </strong>
                    <span className="text-xs text-stone-400">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Haven Pass Sign-In Modal */}
      {loginOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Haven Pass Sign In"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(440px,calc(100vw-32px))] bg-[#FBF8F3] rounded-[30px] p-7 shadow-2xl z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43]">
              <UserCheck className="w-4 h-4" />
              Haven Pass
            </span>
            <button
              type="button"
              onClick={onCloseLogin}
              aria-label="Close modal"
              className="w-8 h-8 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-[#14261C] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display text-2xl font-semibold text-[#14261C] mb-1">
            Welcome to PawHaven
          </h3>
          <p className="text-xs text-stone-500 mb-5">
            Save your pet profiles, view Rescue Grants, and unlock code HAVEN20.
          </p>
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-full bg-white border border-emerald-950/15 text-sm focus:outline-none focus:border-[#183A2E]"
            />
            <button
              type="submit"
              className="w-full bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold py-3 rounded-full transition cursor-pointer"
            >
              Continue with Email
            </button>
          </form>
        </div>
      )}
    </>
  );
}
