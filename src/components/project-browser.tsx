"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Globe2, MapPin, Pause, Play, Check } from "lucide-react";
import { portfolio, type Market } from "@/data/portfolio";
import { shouldRotateProject } from "@/lib/project-rotation";
import { useMarket } from "./market-provider";
import { ProjectVisual } from "./project-visual";

export function ProjectBrowser() {
  const { market, setMarket } = useMarket();
  const [selectedSlug, setSelectedSlug] = useState("odoopilot");
  const [direction, setDirection] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const panelRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const variant = portfolio.markets[market];
  const projects = variant.projectOrder.map(slug => portfolio.projects.find(project => project.slug === slug)!);
  const activeIndex = projects.findIndex(project => project.slug === selectedSlug);
  const project = projects[activeIndex];
  const rotating = shouldRotateProject({ playing, hovered, focused, inView, pageVisible, reducedMotion });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (panelRef.current) observer.observe(panelRef.current);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  useEffect(() => {
    if (!rotating) return;
    const timer = setTimeout(() => {
      if (document.visibilityState !== "visible") return;
      setDirection(1);
      setSelectedSlug(variant.projectOrder[(activeIndex + 1) % variant.projectOrder.length]);
    }, portfolio.projectRotationMs);
    return () => clearTimeout(timer);
  }, [rotating, selectedSlug, activeIndex, variant.projectOrder]);
  function advance(step: number) { setDirection(step); setSelectedSlug(projects[(activeIndex + step + projects.length) % projects.length].slug); }
  function selectProject(slug: string) { setDirection(projects.findIndex(item => item.slug === slug) >= activeIndex ? 1 : -1); setSelectedSlug(slug); }
  return <section ref={panelRef} id="work" className="dashboard-card dashboard-projects" aria-labelledby="work-title" aria-roledescription="carousel" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); advance(event.key === "ArrowRight" ? 1 : -1); } }}>
    <div className="project-banner">SELECTED WORK / PRODUCT ENGINEERING</div>
    <div className="dashboard-card-heading"><h2 id="work-title">Selected work<span className="green-period">.</span></h2><div className="project-controls"><button aria-label="Previous project" onClick={() => advance(-1)}><ArrowLeft size={18} /></button><span>{String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span><button aria-label="Next project" onClick={() => advance(1)}><ArrowRight size={18} /></button>{!reducedMotion && <button aria-label={playing ? "Pause automatic project rotation" : "Play automatic project rotation"} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{playing ? <Pause size={14} /> : <Play size={14} />}</button>}</div></div>
    <div className="dashboard-market" role="group" aria-label="Choose market focus">{(["global", "saudi"] as Market[]).map(key => <button key={key} aria-pressed={market === key} onClick={() => { setMarket(key); setDirection(1); setSelectedSlug(portfolio.markets[key].projectOrder[0]); }}>{key === "global" ? <Globe2 size={13} /> : <MapPin size={13} />}{portfolio.markets[key].label}</button>)}</div>
    <p className="dashboard-market-message" aria-live="polite">{variant.message}</p>
    <div className="project-slide-frame" aria-live={rotating ? "off" : "polite"} aria-atomic="true"><AnimatePresence initial={false} mode="wait" custom={direction}>
    <motion.article key={project.slug} custom={direction} className="dashboard-project" variants={{ enter: (step: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : step * 36 }), center: { opacity: 1, x: 0 }, exit: (step: number) => ({ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : step * -36 }) }} initial="enter" animate="center" exit="exit" transition={{ duration: reducedMotion ? 0 : 0.26, ease: "easeInOut" }}>
      <Link href={`/projects/${project.slug}`} aria-label={`View ${project.name} case study`} className="dashboard-preview-link"><ProjectVisual project={project} /></Link>
      <div className="dashboard-project-title"><h3>{project.name}</h3>{project.slug === "odoopilot" && <span>FEATURED</span>}</div>
      <p className="dashboard-project-category">{project.category}</p><p className="dashboard-project-description">{project.summary}</p>
      <ul className="project-engineering">{project.highlights.map(detail => <li key={detail}><Check size={12} />{detail}</li>)}</ul>
      <div className="tags">{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
      <Link href={`/projects/${project.slug}`} className="text-link">View case study<ArrowUpRight size={17} /></Link>
    </motion.article></AnimatePresence></div>
    <div className="project-rotation-track" aria-hidden="true"><span key={`${selectedSlug}-${market}-${rotating}`} className={rotating ? "rotation-progress running" : "rotation-progress"} style={{ animationDuration: `${portfolio.projectRotationMs}ms` }} /></div>
    <div className="project-picker" role="group" aria-label="Select a project">{projects.map(item => <button key={item.slug} aria-pressed={selectedSlug === item.slug} onClick={() => selectProject(item.slug)}>{item.name}</button>)}</div>
  </section>;
}
