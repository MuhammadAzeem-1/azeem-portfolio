import Image from "next/image";
import { ArrowUpRight, Atom, Braces, Check, Code2, Database, Globe2, Layers, Mail, MapPin, Server, Sparkles, Zap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { ProjectBrowser } from "@/components/project-browser";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomepageEffects } from "@/components/homepage-effects";
import { HeroCopy } from "@/components/hero-copy";
import { LinkedInIcon, GitHubIcon } from "@/components/social-icons";

const stackIcons = [Atom, Braces, Code2, Server, Database, Layers];
export default function Home() {
  const names = portfolio.name.split(" ");
  return <><HomepageEffects /><Navigation /><main id="main-content" className="container dashboard">
    <section id="about" className="dashboard-card dashboard-about" aria-labelledby="hero-title"><HeroCopy /></section>
    <ProjectBrowser />
    <section className="dashboard-card dashboard-profile" aria-label="Profile and social links">
      <div className="profile-avatar">{portfolio.portrait ? <Image src={portfolio.portrait} alt={portfolio.name} width={180} height={180} sizes="180px" /> : <><span>{portfolio.initials}</span><Code2 size={22} /></>}</div>
      <h2>{portfolio.name}</h2><p>{portfolio.role}</p><span className="profile-location"><Globe2 size={14} />Remote & relocation</span>
      <div className="profile-links">{portfolio.github && <a href={portfolio.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><GitHubIcon className="social-logo" /><span className="sr-only">GitHub</span></a>}<a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><LinkedInIcon className="social-logo" /><span className="sr-only">LinkedIn</span></a><a href={`mailto:${portfolio.email}`} aria-label="Email Muhammad Azeem" title="Email"><Mail className="social-logo" /><span className="sr-only">Email</span></a></div>
    </section>
    <section className="dashboard-card dashboard-stack" aria-labelledby="stack-title"><h2 id="stack-title">Core stack</h2><div className="core-stack-grid">{portfolio.coreStack.map((technology, index) => { const Icon = stackIcons[index]; return <div key={technology.name}><Icon size={31} style={{ color: technology.color }} strokeWidth={1.6} /><span>{technology.name}</span></div>; })}</div><p className="stack-note">From the interface<br />to the infrastructure.</p></section>
    <section className="dashboard-card dashboard-identity" aria-labelledby="identity-title"><span className="identity-kicker"><Code2 size={14} /> THINK. BUILD. REFINE.</span><h2 id="identity-title">{names.slice(0, -1).join(" ")}<span>{names.at(-1)}<Zap className="identity-bolt" strokeWidth={1.2} aria-hidden="true" /></span></h2><p>{portfolio.about}</p><div className="engineering-path"><span>Interface</span><span aria-hidden="true">→</span><span>Systems</span><span aria-hidden="true">→</span><span>Intelligence</span></div></section>
    <section id="experience" className="dashboard-card dashboard-journey" aria-labelledby="experience-title"><div className="dashboard-card-heading"><h2 id="experience-title">Professional journey</h2><Layers size={19} /></div><div className="timeline">{portfolio.experience.map(job => <div key={job.company} className={`timeline-item ${job.current ? "current" : ""}`}><span className="timeline-dot" /><div className="job-heading"><h3>{job.role}</h3>{job.current && <span className="present-badge">Present</span>}</div><p className="company">{job.company}</p><p className="job-dates">{job.dates}</p></div>)}</div><div className="journey-footnote"><Code2 size={18} /><span>Clear interfaces.<br /><strong>Connected systems.</strong></span></div></section>
    <section id="expertise" className="dashboard-card dashboard-expertise" aria-labelledby="expertise-title"><div className="dashboard-card-heading"><h2 id="expertise-title"><Sparkles size={20} />Engineering expertise</h2></div><div className="capability-list">{portfolio.expertise.map((item, i) => <div key={item.title}><span className="capability-number">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.technologies.join(" · ")}</p></div><ArrowUpRight size={15} /></div>)}</div></section>
    <section className="dashboard-card dashboard-availability" aria-labelledby="availability-title"><div className="dashboard-card-heading"><h2 id="availability-title"><Globe2 size={20} />Thinking globally</h2></div><p>{portfolio.availabilityDescription}</p><div className="market-list">{portfolio.targetMarkets.map((target, i) => <div key={target}>{i === 0 ? <Globe2 size={17} /> : <MapPin size={17} />}<span>{target}</span><Check size={14} /></div>)}</div></section>
    <section className="dashboard-card dashboard-philosophy" aria-labelledby="philosophy-title"><h2 id="philosophy-title"><Zap size={19} />Development philosophy</h2><p>{portfolio.philosophy}</p><div className="values"><span>Ownership</span><span>Collaboration</span><span>Integrity</span></div></section>
    <section id="contact" className="dashboard-card dashboard-contact" aria-labelledby="contact-title"><h2 id="contact-title"><Mail size={20} />Get in touch</h2><p>{portfolio.contactDescription}</p><a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email}<ArrowUpRight size={17} /></a></section>
  </main><div className="container"><Footer /></div></>;
}
