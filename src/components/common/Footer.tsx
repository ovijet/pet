"use client";

import React from "react";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { CATEGORY_NAV_ITEMS, SITE_BRAND } from "@/data/catalog";
import type { DynamicActionType } from "@/types/ecommerce";

interface FooterProps {
  wishlistCount: number;
  onAction: (action: DynamicActionType) => void;
}

export default function Footer({
  wishlistCount,
  onAction,
}: FooterProps): React.JSX.Element {
  return (
    <footer
      id="footer"
      className="bg-[#0F172A] text-slate-300 pt-14 sm:pt-16 pb-8 border-t border-indigo-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-slate-800">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-rose-500 text-white flex items-center justify-center">
                <PawPrint className="w-5 h-5" />
              </span>
              <span className="font-display text-xl font-extrabold text-white">
                {SITE_BRAND.nameFirst}
                <span className="text-rose-400">{SITE_BRAND.nameSecond}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              {SITE_BRAND.tagline}. A purpose-driven online pet store covering
              operating costs and donating remaining profits to animal welfare.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white mb-4">
              Pet Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORY_NAV_ITEMS.filter((i) => i.id !== "all").map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      onAction({ type: "category", category: item.id })
                    }
                    className="hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white mb-4">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAction({ type: "collection", slug: "sale" })
                  }
                  className="hover:text-rose-400 transition cursor-pointer"
                >
                  On Sale Now
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "collection", slug: "new" })}
                  className="hover:text-rose-400 transition cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "tracker" })}
                  className="hover:text-rose-400 transition cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "wishlist" })}
                  className="hover:text-rose-400 transition cursor-pointer"
                >
                  Wishlist ({wishlistCount})
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "charity" })}
                  className="hover:text-teal-300 transition cursor-pointer"
                >
                  Animal Welfare Mission
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-bold text-white mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "advisor" })}
                  className="hover:text-teal-300 transition cursor-pointer text-left"
                >
                  24/7 Pet Care Support →
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_BRAND.supportEmail}`}
                  className="hover:text-rose-400 transition"
                >
                  {SITE_BRAND.supportEmail}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "login" })}
                  className="hover:text-rose-400 transition cursor-pointer text-left"
                >
                  My Account ({SITE_BRAND.promoCode})
                </button>
              </li>
              <li>100% Authentic &amp; Fast Delivery</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 EverythingPet. Your Pet&apos;s World, All in One Place.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Visa", "Mastercard", "Apple Pay", "PayPal", "Animal Welfare"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-semibold"
                >
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
