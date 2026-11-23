import React from "react";
import { Leaf, ShieldCheck, HeartHandshake, MessageCircleHeart } from "lucide-react";

const PROMISES = [
  {
    icon: Leaf,
    title: "Compostable Kraft Shipping",
    desc: "Zero plastic fillers · Free on orders $55+",
  },
  {
    icon: ShieldCheck,
    title: "Vet-Reviewed Craftsmanship",
    desc: "Food-grade ceramic, hemp & natural sap rubber",
  },
  {
    icon: HeartHandshake,
    title: "10% Rescue Grant Fund",
    desc: "Monthly micro-grants for neighborhood shelters",
  },
  {
    icon: MessageCircleHeart,
    title: "Live Care Advisors",
    desc: "Tailored nutrition & habitat tips 7 days a week",
  },
];

export default function TrustStrip(): React.JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROMISES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-emerald-950/8 p-4 flex items-center gap-3.5 shadow-xs hover:shadow-md hover:border-emerald-800/20 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EDF3EE] text-[#183A2E] flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#14261C] leading-tight">
                {title}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
