"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, HeartHandshake, MapPin, X } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartWishlistDrawers from "@/components/store/CartWishlistDrawers";
import StoreModals from "@/components/store/StoreModals";
import { useStore } from "@/context/StoreContext";
import { PARTNER_SHELTERS, PRODUCTS, SITE_BRAND } from "@/data/catalog";

export default function SiteShell({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const store = useStore();
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackTop(window.scrollY > 520);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const anyOverlayOpen =
    store.mobileMenuOpen ||
    store.cartOpen ||
    store.wishlistOpen ||
    Boolean(store.quickViewProduct) ||
    Boolean(store.activeArticle) ||
    store.trackerOpen ||
    store.loginOpen ||
    store.advisorOpen ||
    store.grantsModalOpen;

  const grantProduct = PRODUCTS.find((p) => p.id === "ph-16");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#14261C]">
      <Header
        activeCategory={store.activeCategory}
        setActiveCategory={(cat) => {
          store.setActiveCategory(cat);
          store.handleAction({ type: "category", category: cat });
        }}
        searchQuery={store.searchQuery}
        setSearchQuery={store.setSearchQuery}
        cartCount={store.cartCount}
        wishlistCount={store.wishlist.length}
        onAction={store.handleAction}
        onSelectProduct={store.openProductPage}
        onOpenMobileMenu={() => store.setMobileMenuOpen(true)}
      />

      <main className="flex-1">{children}</main>

      <Footer
        wishlistCount={store.wishlist.length}
        onAction={store.handleAction}
      />

      {anyOverlayOpen && (
        <div
          onClick={store.closeAllOverlays}
          className="fixed inset-0 bg-[#102118]/55 backdrop-blur-xs z-40"
          aria-hidden="true"
        />
      )}

      <CartWishlistDrawers
        mobileMenuOpen={store.mobileMenuOpen}
        onCloseMobileMenu={() => store.setMobileMenuOpen(false)}
        activeCategory={store.activeCategory}
        onAction={store.handleAction}
        cartOpen={store.cartOpen}
        onCloseCart={() => store.setCartOpen(false)}
        cartItems={store.cartItems}
        cartCount={store.cartCount}
        cartSubtotal={store.cartSubtotal}
        cartMealsFunded={store.cartMealsFunded}
        promoApplied={store.promoApplied}
        onApplyPromo={store.applyPromo}
        onUpdateQty={store.updateQty}
        onRemoveItem={store.removeCartItem}
        onCheckout={store.checkout}
        wishlistOpen={store.wishlistOpen}
        onCloseWishlist={() => store.setWishlistOpen(false)}
        wishlistProducts={store.wishlistProducts}
        onMoveToCart={(product) => {
          store.addToCart(product, product.variants[0]);
          store.setWishlistOpen(false);
          store.setCartOpen(true);
        }}
        onToggleWishlist={store.toggleWishlist}
      />

      <StoreModals
        quickViewProduct={store.quickViewProduct}
        onCloseQuickView={() => store.setQuickViewProduct(null)}
        onAddToCart={(product, variant, qty) => {
          store.addToCart(product, variant, qty);
          store.setCartOpen(true);
        }}
        activeArticle={store.activeArticle}
        onCloseArticle={() => store.setActiveArticle(null)}
        onAction={store.handleAction}
        trackerOpen={store.trackerOpen}
        onCloseTracker={() => store.setTrackerOpen(false)}
        orders={store.orders}
        trackInput={store.trackInput}
        setTrackInput={store.setTrackInput}
        activeOrder={store.activeOrder}
        trackNotFound={store.trackNotFound}
        onTrackSubmit={store.submitTrack}
        onPickSampleOrder={store.pickSampleOrder}
        loginOpen={store.loginOpen}
        onCloseLogin={() => store.setLoginOpen(false)}
        onClubSignIn={(email) =>
          store.showToast(
            `Signed in as ${email} · Haven Pass ${SITE_BRAND.promoCode} active!`
          )
        }
        advisorOpen={store.advisorOpen}
        onCloseAdvisor={() => store.setAdvisorOpen(false)}
        onAdvisorSubmit={(petType) =>
          store.showToast(
            `Received! Our ${petType} vet advisor will reply shortly.`
          )
        }
      />

      {/* Dynamic Rescue Grants Transparency Modal */}
      {store.grantsModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="PawHaven Rescue Grant Report"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(620px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-[#FBF8F3] rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-[#d96b43]">
              <HeartHandshake className="w-4 h-4" />
              2026 Rescue Grant Ledger
            </span>
            <button
              type="button"
              onClick={() => store.setGrantsModalOpen(false)}
              aria-label="Close rescue ledger"
              className="w-9 h-9 rounded-full bg-[#F3EDE2] hover:bg-[#183A2E] hover:text-white text-[#14261C] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#14261C] mb-2">
            Where your 10% Rescue Grant goes
          </h3>
          <p className="text-sm text-stone-600 mb-6">
            Every PawHaven box directs 10% of order value straight into verified
            micro-grants for neighborhood animal shelters and foster homes.
          </p>

          <div className="space-y-3 mb-6">
            {PARTNER_SHELTERS.map((sh) => (
              <div
                key={sh.id}
                className="bg-white border border-emerald-950/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <strong className="block text-sm text-[#14261C]">
                    {sh.name}
                  </strong>
                  <span className="inline-flex items-center gap-1 text-xs text-stone-400">
                    <MapPin className="w-3 h-3" /> {sh.city} · {sh.focus}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#E6EFE9] text-[#183A2E] text-xs font-extrabold">
                  {sh.granted} Granted
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {grantProduct && (
              <Link
                href={`/products/${grantProduct.id}`}
                onClick={() => store.setGrantsModalOpen(false)}
                className="bg-[#183A2E] hover:bg-[#d96b43] text-white text-sm font-bold px-5 py-3 rounded-full inline-flex items-center gap-2 transition"
              >
                <span>View Grant Edition Kit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/collections/bundles"
              onClick={() => store.setGrantsModalOpen(false)}
              className="px-5 py-3 rounded-full border border-emerald-950/15 text-sm font-semibold text-[#14261C] hover:bg-white transition"
            >
              Browse Starter Kits
            </Link>
          </div>
        </div>
      )}

      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-30 w-11 h-11 rounded-full bg-[#183A2E] hover:bg-[#d96b43] text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {store.toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none px-4 w-full max-w-md flex justify-center"
        >
          <div className="bg-[#102118] text-[#FBF8F3] px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2.5 border border-white/10">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="truncate">{store.toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}

