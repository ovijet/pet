import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { StoreProvider } from "@/context/StoreContext";
import SiteShell from "@/components/common/SiteShell";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EverythingPet — Your Pet's World, All in One Place",
  description:
    "Purpose-driven online pet store for dogs, cats, reptiles, birds, fish & small pets. Covering operating costs while donating remaining profits to animal welfare.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${dmSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen">
        <StoreProvider>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
