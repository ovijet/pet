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
    <footer id="footer" className="bg-[#102118] text-emerald-100/80 pt-14 sm:pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-white/10">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
              <span className="w-10 h-10 rounded-2xl rounded-tr-sm bg-[#d96b43] text-white flex items-center justify-center">
                <PawPrint className="w-5 h-5" />
              </span>
              <span className="font-display text-xl font-bold text-[#FBF8F3]">
                {SITE_BRAND.nameFirst}
                <span className="text-amber-300">{SITE_BRAND.nameSecond}</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-emerald-100/70 max-w-xs">
              Modern Pet Wellness Studio. Vet-reviewed nutrition, play, and
              habitat gear—with 10% of every order funding local rescue grants.
            </p>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Shop by Need
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORY_NAV_ITEMS.filter((i) => i.id !== "all").map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() =>
                      onAction({ type: "category", category: item.id })
                    }
                    className="hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              PawHaven World
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAction({ type: "section", sectionId: "drops" })
                  }
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Weekly Member Drops
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAction({ type: "section", sectionId: "journal" })
                  }
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  The Care Journal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    onAction({ type: "section", sectionId: "grants" })
                  }
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Rescue Grant Fund
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "tracker" })}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Check Parcel Status
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "wishlist" })}
                  className="hover:text-amber-300 transition cursor-pointer"
                >
                  Saved List ({wishlistCount})
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-base font-semibold text-white mb-4">
              Advisor Desk
            </h4>
            <ul className="space-y-2.5 text-sm text-emerald-100/75">
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "advisor" })}
                  className="hover:text-amber-300 transition cursor-pointer text-left"
                >
                  7-Day Vet &amp; Nutrition Chat →
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_BRAND.supportEmail}`}
                  className="hover:text-amber-300 transition"
                >
                  {SITE_BRAND.supportEmail}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onAction({ type: "modal", modal: "login" })}
                  className="hover:text-amber-300 transition cursor-pointer text-left"
                >
                  Activate Haven Pass ({SITE_BRAND.promoCode})
                </button>
              </li>
              <li>Compostable Kraft Shipping</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-emerald-100/55">
          <p>© 2026 PawHaven Pet Wellness Studio. All rights reserved.</p>
          <div className="flex flex-wrap gap-2">
            {["Visa", "Mastercard", "Apple Pay", "Shop Pay", "Plastic-Free"].map(
              (badge) => (
                <span
                  key={badge}
                  className="px-2.5 py-1 rounded-md bg-white/8 text-emerald-100/80 font-semibold"
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
