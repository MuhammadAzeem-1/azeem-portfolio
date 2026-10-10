import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Mail } from "lucide-react";
import { portfolio, type Project } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ScrollReveals } from "@/components/scroll-reveals";
import { ProjectVisual } from "@/components/project-visual";

export function generateStaticParams() { return portfolio.projects.map(p => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project: Project | undefined = portfolio.projects.find(p => p.slug === slug);
  return project ? { title: project.name, description: project.summary, ...(portfolio.siteUrl ? { alternates: { canonical: `/projects/${slug}` } } : {}) } : {};
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project: Project | undefined = portfolio.projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = portfolio.projects[(portfolio.projects.indexOf(project) + 1) % portfolio.projects.length];
  return <><ScrollReveals /><Navigation /><main id="main-content" className="container case-study"><Link className="text-link back-link" href="/#work"><ArrowLeft size={15} />Back to selected work</Link><div className="eyebrow section-eyebrow">PROJECT NOTES / {project.category.toUpperCase()}</div><h1>{project.name}<span className="gradient-text">.</span></h1><p className="case-intro">{project.summary}</p><div className="tags case-tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div><ProjectVisual project={project} large /><div className="case-layout"><section className="case-context"><div className="eyebrow section-eyebrow">THE PRODUCT</div><h2>Connecting the moving parts.</h2><p>{project.context}</p>{!project.screenshot && <div className="case-disclosure"><h3>Interface illustration</h3><p>The preview visualizes the product’s workflows. It is an original illustration rather than a product screenshot.</p></div>}</section><aside className="panel"><h2>Engineering focus</h2><ul className="case-highlights">{project.highlights.map(h => <li key={h}><Check size={16} />{h}</li>)}</ul></aside></div><div className="case-sections">{project.sections.map((section, i) => <section className="panel" key={section.title}><span className="eyebrow section-eyebrow">0{i + 1} / PRODUCT CAPABILITIES</span><h2>{section.title}</h2><p>{section.description}</p><ul>{section.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div><div className="case-bottom"><div><h2>Want to talk engineering?</h2><a className="text-link" href={`mailto:${portfolio.email}`}><Mail size={16} />Start a conversation<ArrowUpRight size={15} /></a></div><Link className="next-project" href={`/projects/${next.slug}`}><span>NEXT PROJECT</span><strong>{next.name}<ArrowRight size={20} /></strong></Link></div></main><div className="container"><Footer /></div></>;
}
