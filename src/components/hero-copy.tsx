"use client";

import { ArrowDown, ArrowUpRight, Globe2, MapPin } from "lucide-react";
import { portfolio, resumeHref, resumeLabel } from "@/data/portfolio";
import { useMarket } from "./market-provider";

export function HeroCopy() {
  const { market } = useMarket();
  const positioning = portfolio.markets[market];
  const LocationIcon = market === "saudi" ? MapPin : Globe2;
  return <>
    <div className="hero-eyebrow"><span className="status-dot" />{portfolio.name}<span className="hero-role">{portfolio.role}</span></div>
    <h1 id="hero-title">{portfolio.heroTitle.opening}<br /><span className="hero-gradient">{portfolio.heroTitle.middle}</span><br />{portfolio.heroTitle.accent}</h1>
    <p className="hero-introduction">{portfolio.introduction}</p>
    <div className="hero-actions"><a href="#work" className="button primary">Explore my work<ArrowDown size={17} /></a><a className="button secondary" href={resumeHref(market)}>{resumeLabel(market)}<ArrowUpRight size={17} /></a></div>
    <div className="hero-positioning" aria-live="polite"><LocationIcon size={15} /><div><strong>{positioning.label}</strong><span>{positioning.message}</span></div></div>
  </>;
}
