import { Bot, Check, Command, LayoutDashboard, Layers, Search, Ship, Sparkles, Wrench } from "lucide-react";
import type { Project } from "@/data/portfolio";
import Image from "next/image";

// Original UI illustrations, deliberately not presented as real product screenshots.
export function ProjectVisual({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.screenshot) return <div className={`project-visual real-preview ${large ? "large" : ""}`}><Image src={project.screenshot.src} alt={project.screenshot.alt} width={project.screenshot.width} height={project.screenshot.height} sizes={large ? "(max-width: 600px) 100vw, 1200px" : "(max-width: 600px) 100vw, 450px"} /></div>;
  const ai = project.slug === "odoopilot";
  const maritime = project.slug === "dockops";
  return <div className={`project-visual ${project.accent} ${large ? "large" : ""}`} role="img" aria-label={`Illustrative ${project.name} interface, not a product screenshot`}>
    <div className="mock-window">
      <div className="mock-top"><span className="window-dots"><i /><i /><i /></span><span>{project.name.toLowerCase()} / workspace</span><Command size={10} /></div>
      <div className="mock-content">
        <div className="mock-sidebar"><div className="mock-logo">{ai ? <Sparkles size={15} /> : maritime ? <Ship size={15} /> : <Wrench size={15} />}</div><LayoutDashboard size={12} /><Layers size={12} /><Search size={12} /><span className="mock-avatar">MA</span></div>
        <div className="mock-main">
          <div className="mock-heading"><span>{ai ? "Your business, connected." : maritime ? "Operations overview" : "Workshop overview"}</span><span className="mock-live">● Live</span></div>
          {ai ? <><div className="mock-prompt"><Bot size={16} /><div>How can I help your workflow?<span>Explore documents. Connect your ERP.</span></div></div><div className="mock-messages"><span /><span /><span /></div><div className="mock-tools"><span><Layers size={10} />Documents</span><span><Check size={10} />Odoo connected</span></div><div className="mock-input">Ask your workspace…<span>↑</span></div></> : <><div className="mock-stats">{["Scheduling", maritime ? "Assignments" : "Inventory", "Workflows"].map(t => <div key={t}><span>{t}</span><i /><small>Overview ↗</small></div>)}</div><div className="mock-table"><div className="mock-table-label">{maritime ? "Workforce schedule" : "Service schedule"}<span>This week</span></div>{[0, 1, 2].map(i => <div className="mock-row" key={i}><span className="mock-row-avatar" /><span className="mock-row-line" /><span className="mock-row-pill" /><Check size={10} /></div>)}</div></>}
        </div>
      </div>
    </div>
    <span className="illustration-label">ILLUSTRATIVE INTERFACE</span>
  </div>;
}
