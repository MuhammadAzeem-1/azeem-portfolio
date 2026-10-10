import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";
export const alt = `${portfolio.name} — Full-Stack Software Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "76px", background: "#080b10", color: "#f5f7fa", border: "1px solid #273142" }}><div style={{ display: "flex", fontSize: 24, color: "#b79aff", marginBottom: 58 }}>{portfolio.name} / FULL-STACK ENGINEER</div><div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -3 }}>Building intelligent software</div><div style={{ display: "flex", fontSize: 68, fontWeight: 700, letterSpacing: -3, color: "#38cfff", marginTop: 10 }}>for real-world problems.</div><div style={{ display: "flex", fontSize: 23, color: "#a1acba", marginTop: 60 }}>Full-stack engineering · Production SaaS · AI integrations</div></div>, size);
}
