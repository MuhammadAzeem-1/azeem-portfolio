"use client";

import { useEffect } from "react";

// Progressive enhancement: content remains visible without JavaScript.
export function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [...document.querySelectorAll<HTMLElement>(".dashboard-card, .case-study > h1, .case-intro, .case-study > .project-visual, .case-layout > *, .case-sections > .panel, .case-bottom")];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.classList.remove("scroll-pending");
        element.classList.add(element.matches(".project-visual") ? "preview-animated" : "card-revealed");
        observer.unobserve(element);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    const disable = () => {
      observer.disconnect();
      [...sections, ...document.querySelectorAll<HTMLElement>(".project-visual")].forEach(element => element.classList.remove("scroll-pending", "card-revealed", "preview-animated"));
    };
    const initialize = () => {
      disable();
      if (preference.matches) return;
      sections.forEach((element, index) => {
        element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 65}ms`);
        if (element.getBoundingClientRect().top >= window.innerHeight) element.classList.add("scroll-pending");
        observer.observe(element);
      });
      document.querySelectorAll(".project-visual").forEach(element => observer.observe(element));
    };
    const onFocus = (event: FocusEvent) => {
      const element = (event.target as Element).closest<HTMLElement>(".scroll-pending");
      if (element) {
        element.classList.remove("scroll-pending");
        observer.unobserve(element);
      }
    };
    initialize();
    // Carousel slides mount on demand; reveal each new interface as it becomes visible.
    const slides = new MutationObserver(() => {
      if (preference.matches) return;
      document.querySelectorAll(".project-slide-frame .project-visual:not(.preview-animated)").forEach(element => observer.observe(element));
    });
    document.querySelectorAll(".project-slide-frame").forEach(frame => slides.observe(frame, { childList: true, subtree: true }));
    preference.addEventListener("change", initialize);
    document.addEventListener("focusin", onFocus);
    return () => {
      disable();
      slides.disconnect();
      preference.removeEventListener("change", initialize);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
