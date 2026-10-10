"use client";
import { createContext, useContext, useState } from "react";
import type { Market } from "@/data/portfolio";
const MarketContext = createContext<{ market: Market; setMarket: (market: Market) => void }>({ market: "global", setMarket: () => {} });
export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [market, setMarket] = useState<Market>("global");
  return <MarketContext.Provider value={{ market, setMarket }}>{children}</MarketContext.Provider>;
}
export function useMarket() { return useContext(MarketContext); }
