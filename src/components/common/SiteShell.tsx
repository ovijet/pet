"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUp, HeartHandshake, MapPin, X } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import CartWishlistDrawers from "@/components/store/CartWishlistDrawers";
import StoreModals from "@/components/store/StoreModals";
import { useStore } from "@/context/StoreContext";
import { PARTNER_CHARITIES, PRODUCTS, SITE_BRAND } from "@/data/catalog";

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
    store.charityModalOpen;

  const charityProduct = PRODUCTS.find((p) => p.id === "ep-dog-04");

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F8FC] text-[#0F172A] pb-16 md:pb-0">
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

      <MobileBottomNav />

      {anyOverlayOpen && (
        <div
          onClick={store.closeAllOverlays}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40"
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
            `Signed in as ${email} · Promo ${SITE_BRAND.promoCode} unlocked!`
          )
        }
        advisorOpen={store.advisorOpen}
        onCloseAdvisor={() => store.setAdvisorOpen(false)}
        onAdvisorSubmit={(petType) =>
          store.showToast(
            `Support ticket created! Our 24/7 ${petType} specialist will reply shortly.`
          )
        }
      />

      {/* EverythingPet Animal Welfare Charity Modal */}
      {store.charityModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="EverythingPet Animal Welfare Report"
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(620px,calc(100vw-24px))] max-h-[90dvh] overflow-y-auto bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl border border-indigo-950/10 z-50"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal-600">
              <HeartHandshake className="w-4 h-4" />
              EverythingPet Animal Welfare Report
            </span>
            <button
              type="button"
              onClick={() => store.setCharityModalOpen(false)}
              aria-label="Close animal welfare report"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            100% of surplus profits support animal charities
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            EverythingPet covers baseline product and operating costs, then
            funnels remaining profits directly into rescue food, veterinary
            care, and shelter habitats.
          </p>

          <div className="space-y-3 mb-6">
            {PARTNER_CHARITIES.map((ch) => (
              <div
                key={ch.id}
                className="bg-[#F6F8FC] border border-indigo-950/8 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3"
              >
                <div>
                  <strong className="block text-sm text-slate-900">
                    {ch.name}
                  </strong>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-rose-500" /> {ch.city} ·{" "}
                    {ch.focus}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-xs font-extrabold">
                  {ch.donated} Donated
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {charityProduct && (
              <Link
                href={`/products/${charityProduct.id}`}
                onClick={() => store.setCharityModalOpen(false)}
                className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold px-5 py-3 rounded-full inline-flex items-center gap-2 transition shadow-md shadow-rose-500/25"
              >
                <span>Shop Charity Edition</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              href="/collections/all"
              onClick={() => store.setCharityModalOpen(false)}
              className="px-5 py-3 rounded-full border border-slate-200 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
            >
              Browse Full Store
            </Link>
          </div>
        </div>
      )}

      {showBackTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="fixed bottom-20 right-4 md:bottom-7 md:right-7 z-30 w-11 h-11 rounded-full bg-indigo-950 hover:bg-rose-500 text-white shadow-lg flex items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {store.toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[70] pointer-events-none px-4 w-full max-w-md flex justify-center"
        >
          <div className="bg-slate-900 text-white px-5 py-3 rounded-full text-xs sm:text-sm font-semibold shadow-xl flex items-center gap-2.5 border border-indigo-500/30">
            <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
            <span className="truncate">{store.toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
