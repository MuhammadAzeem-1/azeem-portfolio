"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Code2, Menu, X } from "lucide-react";
import { portfolio, resumeHref, resumeLabel } from "@/data/portfolio";
import { useMarket } from "./market-provider";

const links = [["Work", "work"], ["Expertise", "expertise"], ["Experience", "experience"], ["About", "about"], ["Contact", "contact"]];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const { market } = useMarket();
  return <header className="nav-shell" onKeyDown={event => { if (event.key === "Escape") { setOpen(false); event.currentTarget.querySelector<HTMLButtonElement>(".menu-toggle")?.focus(); } }}>
    <nav className="navigation" aria-label="Main navigation">
      <Link className="brand" href="/" aria-label={`${portfolio.name} home`}><span className="brand-symbol"><Code2 size={23} /></span><span>{portfolio.name}<span className="brand-caption">ENGINEER / BUILDER</span></span></Link>
      <div className="desktop-links">{links.map(([label, id]) => <Link key={id} href={`/#${id}`}>{label}</Link>)}</div>
      <a className="nav-resume" href={resumeHref(market)}>{resumeLabel(market)}<ArrowUpRight size={15} /></a>
      <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div id="mobile-navigation" className="mobile-links">{links.map(([label, id]) => <Link onClick={() => setOpen(false)} key={id} href={`/#${id}`}>{label}<ArrowUpRight size={16} /></Link>)}</div>}
  </header>;
}
