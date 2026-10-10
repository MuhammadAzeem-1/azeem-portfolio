"use client";
import { useEffect } from "react";
import { ScrollReveals } from "./scroll-reveals";

// Keeps the page server-rendered; only entrance and anchor feedback need browser state.
export function HomepageEffects() {
  useEffect(() => {
    let pending: ReturnType<typeof setTimeout> | undefined;
    let cleanupGlow: ReturnType<typeof setTimeout> | undefined;
    let onScrollEnd: (() => void) | undefined;
    let glowing: HTMLElement | null = null;

    function highlight(hash: string, waitForScroll = false) {
      const section = document.getElementById(hash.slice(1));
      if (!section?.classList.contains("dashboard-card")) return;
      clearTimeout(pending);
      clearTimeout(cleanupGlow);
      if (onScrollEnd) window.removeEventListener("scrollend", onScrollEnd);
      glowing?.classList.remove("section-spotlight");
      document.querySelectorAll<HTMLAnchorElement>(".desktop-links a, .mobile-links a").forEach(link => {
        if (new URL(link.href).hash === hash) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      const illuminate = () => {
        clearTimeout(pending);
        if (onScrollEnd) window.removeEventListener("scrollend", onScrollEnd);
        section.classList.remove("scroll-pending");
        section.classList.remove("card-revealed");
        section.classList.remove("section-spotlight");
        void section.offsetWidth;
        section.classList.add("section-spotlight");
        glowing = section;
        cleanupGlow = setTimeout(() => section.classList.remove("section-spotlight"), 2600);
      };
      if (waitForScroll && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        onScrollEnd = illuminate;
        window.addEventListener("scrollend", onScrollEnd, { once: true });
        pending = setTimeout(illuminate, 700);
      } else illuminate();
    }
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname && url.hash) highlight(url.hash, true);
    }
    const onHashChange = () => highlight(window.location.hash, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("hashchange", onHashChange);
    if (window.location.hash) highlight(window.location.hash);
    return () => {
      clearTimeout(pending);
      clearTimeout(cleanupGlow);
      if (onScrollEnd) window.removeEventListener("scrollend", onScrollEnd);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("hashchange", onHashChange);
      glowing?.classList.remove("section-spotlight");
    };
  }, []);
  return <><ScrollReveals /><div className="homepage-background" aria-hidden="true"><div className="background-grid" /><div className="background-haze haze-one" /><div className="background-haze haze-two" /></div></>;
}
