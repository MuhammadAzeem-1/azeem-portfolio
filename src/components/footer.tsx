import { ArrowUpRight, Code2 } from "lucide-react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
export function Footer() {
  return <footer className="footer"><Link className="footer-brand" href="/"><Code2 size={18} />{portfolio.name}</Link><span>Thoughtfully engineered. Always learning.</span><a href={`mailto:${portfolio.email}`}>Let’s connect<ArrowUpRight size={14} /></a></footer>;
}
