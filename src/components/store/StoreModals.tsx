"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Headphones,
  HeartHandshake,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  UserCheck,
  X,
} from "lucide-react";
import type {
  DynamicActionType,
  JournalArticle,
  OrderRecord,
  Product,
} from "@/types/ecommerce";
import { SITE_BRAND } from "@/data/catalog";
import DynamicImage from "@/components/common/DynamicImage";

interface StoreModalsProps {
  quickViewProduct: Product | null;
  onCloseQuickView: () => void;
  onAddToCart: (product: Product, variant: string, qty: number) => void;

  activeArticle: JournalArticle | null;
  onCloseArticle: () => void;
  onAction: (action: DynamicActionType) => void;

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

  advisorOpen: boolean;
  onCloseAdvisor: () => void;
  onAdvisorSubmit: (petType: string, question: string) => void;
}

export default function StoreModals({
  quickViewProduct,
  onCloseQuickView,
  onAddToCart,
  activeArticle,
  onCloseArticle,
  onAction,
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
  advisorOpen,
  onCloseAdvisor,
  onAdvisorSubmit,
}: StoreModalsProps): React.JSX.Element {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [qty, setQty] = useState<number>(1);
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [advisorPet, setAdvisorPet] = useState<string>("Dogs");
  const [advisorQuestion, setAdvisorQuestion] = useState<string>("");

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

  const handleAdvisorForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!advisorQuestion.trim()) return;
    onAdvisorSubmit(advisorPet, advisorQuestion.trim());
    setAdvisorQuestion("");
    onCloseAdvisor();
  };

  return (
    <>
      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(840px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-white rounded-[28px] shadow-2xl border border-slate-200 z-50 grid grid-cols-1 md:grid-cols-2"
        >
          <button
            type="button"
            onClick={onCloseQuickView}
            aria-label="Close product preview"
            className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-indigo-950 hover:text-white flex items-center justify-center shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative min-h-[240px] sm:min-h-[300px] md:min-h-[420px] bg-slate-100">
            <DynamicImage
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />
          </div>

          <div className="p-5 sm:p-8 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2 pr-8 md:pr-0">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                {quickViewProduct.speciesLabel}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-800">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                {quickViewProduct.rating} ({quickViewProduct.reviews})
              </span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl font-extrabold text-slate-900">
                ${quickViewProduct.price.toFixed(2)}
              </span>
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${quickViewProduct.oldPrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {quickViewProduct.description}
            </p>

            <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-100 px-3.5 py-2 rounded-xl w-fit">
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              Funds {quickViewProduct.mealsFunded} shelter animal meals
            </div>

            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Select Option
              </span>
              <div className="flex flex-wrap gap-2">
                {quickViewProduct.variants.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      activeVariant === v
                        ? "bg-indigo-950 border-indigo-950 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mt-2 pt-4 border-t border-slate-100">
              <div className="inline-flex items-center gap-3 bg-slate-100 rounded-xl px-3 py-2">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-6 h-6 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer"
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
                  className="w-6 h-6 rounded-lg hover:bg-white flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex-1 bg-rose-500 hover:bg-indigo-950 text-white text-sm font-bold py-3 px-5 rounded-xl inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Add · ${(quickViewProduct.price * qty).toFixed(2)}
              </button>
            </div>

            <Link
              href={`/products/${quickViewProduct.id}`}
              onClick={onCloseQuickView}
              className="text-xs font-bold text-indigo-700 hover:text-rose-500 underline underline-offset-4 text-center pt-1"
            >
              Open Full Product Page &amp; Related Items →
            </Link>
          </div>
        </div>
      )}

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeArticle.title}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(680px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-white rounded-[28px] shadow-2xl z-50"
        >
          <div className="relative h-52 sm:h-64 bg-slate-100">
            <DynamicImage
              src={activeArticle.image}
              alt={activeArticle.title}
              fill
              sizes="680px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={onCloseArticle}
              aria-label="Close guide"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/95 text-slate-800 hover:bg-indigo-950 hover:text-white flex items-center justify-center shadow-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <span className="absolute bottom-4 left-5 bg-indigo-950/90 text-teal-300 text-xs font-bold px-3.5 py-1 rounded-lg inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              {activeArticle.tag} · {activeArticle.readTime}
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-1">
                {activeArticle.author}
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {activeArticle.title}
              </h3>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              {activeArticle.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="bg-[#F6F8FC] border border-slate-200 rounded-2xl p-5">
              <h4 className="font-display text-base font-bold text-slate-900 mb-3">
                Key Care Takeaways
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                {activeArticle.keyTakeaways.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  onCloseArticle();
                  onAction({
                    type: "collection",
                    slug: activeArticle.relatedSlug,
                  });
                }}
                className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition cursor-pointer"
              >
                <span>{activeArticle.relatedCtaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Tracker Modal */}
      {trackerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Order Tracker"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(540px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-slate-200 z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
              <Truck className="w-3.5 h-3.5" />
              Order Tracking
            </span>
            <button
              type="button"
              onClick={onCloseTracker}
              aria-label="Close tracker"
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-display text-2xl font-extrabold text-slate-900">
            Track your EverythingPet order
          </h3>

          <form onSubmit={onTrackSubmit} className="flex gap-2 mt-4 mb-2">
            <input
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              placeholder="Order ID (e.g. EP-2026-8412)"
              className="flex-1 min-w-0 h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold px-5 rounded-xl transition cursor-pointer shrink-0"
            >
              Track
            </button>
          </form>

          <div className="text-xs text-slate-500 mb-5 flex flex-wrap gap-y-1">
            <span>Sample IDs:</span>
            {Object.keys(orders)
              .slice(0, 3)
              .map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => onPickSampleOrder(id)}
                  className="ml-2 font-bold text-rose-500 underline cursor-pointer"
                >
                  {id}
                </button>
              ))}
          </div>

          {trackNotFound && (
            <p className="text-sm text-rose-600 bg-rose-50 px-4 py-3 rounded-xl font-medium">
              Order ID not found. Try a sample ID above or place a quick test
              order!
            </p>
          )}

          {activeOrder && (
            <div className="bg-[#F6F8FC] border border-slate-200 rounded-2xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-xs font-bold text-slate-400">
                    {activeOrder.id}
                  </span>
                  <strong className="block text-base text-slate-900">
                    {activeOrder.status}
                  </strong>
                  <span className="text-xs text-slate-500">
                    {activeOrder.eta}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold">
                  {activeOrder.impactNote}
                </span>
              </div>

              <div className="mt-4 pl-6 relative space-y-4 before:content-[''] before:absolute before:left-[7px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-indigo-200">
                {activeOrder.steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <span
                      className={`absolute -left-[22px] top-1 w-3 h-3 rounded-full ${
                        step.done
                          ? "bg-indigo-600 ring-4 ring-indigo-100"
                          : "bg-slate-300"
                      }`}
                    />
                    <strong className="block text-sm text-slate-900">
                      {step.title}
                    </strong>
                    <span className="text-xs text-slate-400">{step.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Account Login Modal */}
      {loginOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Account Login"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(440px,calc(100vw-24px))] bg-white rounded-[28px] p-6 sm:p-7 shadow-2xl border border-slate-200 z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-indigo-600">
              <UserCheck className="w-4 h-4" />
              EverythingPet Account
            </span>
            <button
              type="button"
              onClick={onCloseLogin}
              aria-label="Close modal"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-1">
            Sign in to EverythingPet
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Track orders, manage your wishlist, and unlock promo code{" "}
            <strong>{SITE_BRAND.promoCode}</strong>.
          </p>
          <form onSubmit={handleLoginSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              className="w-full bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Continue with Email
            </button>
          </form>
        </div>
      )}

      {/* 24/7 Pet Care Support Modal */}
      {advisorOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="24/7 Pet Care Support"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(480px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-white rounded-[28px] p-6 sm:p-7 shadow-2xl border border-slate-200 z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-600">
              <Headphones className="w-4 h-4" />
              24/7 Customer Support
            </span>
            <button
              type="button"
              onClick={onCloseAdvisor}
              aria-label="Close support modal"
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-950 hover:text-white text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <h3 className="font-display text-2xl font-extrabold text-slate-900 mb-1">
            Ask EverythingPet Support
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Questions about orders, aquarium filter sizing, reptile lamp stands,
            or small pet cages? Our 24/7 team is here to help.
          </p>

          <form onSubmit={handleAdvisorForm} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Pet Category
              </label>
              <select
                value={advisorPet}
                onChange={(e) => setAdvisorPet(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              >
                <option>Dogs</option>
                <option>Cats</option>
                <option>Reptiles</option>
                <option>Birds</option>
                <option>Fish &amp; Aquatic</option>
                <option>Small Pets</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Your Question
              </label>
              <textarea
                rows={3}
                required
                value={advisorQuestion}
                onChange={(e) => setAdvisorQuestion(e.target.value)}
                placeholder="Example: Which aquarium filter size fits a 20-gallon tank?"
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-950 hover:bg-rose-500 text-white text-sm font-bold py-3 rounded-xl transition cursor-pointer"
            >
              Send Support Request
            </button>
          </form>
        </div>
      )}
    </>
  );
}
