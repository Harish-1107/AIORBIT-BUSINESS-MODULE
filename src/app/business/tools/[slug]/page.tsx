import Link from "next/link";
import { notFound } from "next/navigation";
import { fallbackTools, getTool } from "@/lib/data";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return fallbackTools.map(({ slug }) => ({ slug }));
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) notFound();
  const features = tool.tags.length ? tool.tags : ["Business-ready workflows", "Team collaboration", "Practical automation"];
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav">
        <Link className="brand" href="/"><i>✦</i>AIORBIT</Link>
        <nav><Link className="active" href="/">Business AI</Link><a>Leaderboard</a><a>Resources</a></nav>
      </header>
      <section style={{ maxWidth: 1000, margin: "auto", padding: "48px 24px 100px" }}>
        <Link href="/#directory" style={{ color: "#aaa5ff", fontSize: 12 }}>← Back to Business AI</Link>
        <div style={{ display: "flex", gap: 22, padding: "42px 0", borderBottom: "1px solid #252931" }}>
          <div style={{ width: 82, height: 82, borderRadius: 18, display: "grid", placeItems: "center", fontSize: 36, fontWeight: 800, background: "linear-gradient(140deg,#9664ff,#5941d6)" }}>{tool.name[0]}</div>
          <div>
            <p className="eyebrow">{tool.businessFunction.name.toUpperCase()} · AI TOOL</p>
            <h1 style={{ fontSize: 44, letterSpacing: "-.05em", margin: "0 0 10px" }}>{tool.name}</h1>
            <p style={{ color: "#9aa1ad", fontSize: 16, lineHeight: 1.6, maxWidth: 650 }}>{tool.description}</p>
            <a className="primary" href={tool.website} target="_blank" rel="noreferrer">Visit website ↗</a>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 240px", gap: 70, paddingTop: 48 }}>
          <article>
            <h2>Overview</h2>
            <p style={{ color: "#969daa", lineHeight: 1.75 }}>A curated business-AI recommendation for teams that want to spend less time on repetitive work and more time on high-value outcomes.</p>
            <h2 style={{ marginTop: 36 }}>Key capabilities</h2>
            <ul style={{ listStyle: "none", padding: 0, lineHeight: 2.4, color: "#c3c7cf" }}>{features.map((feature) => <li key={feature}><b style={{ color: "#9b8cff", marginRight: 10 }}>✦</b>{feature}</li>)}</ul>
          </article>
          <aside style={{ background: "#101217", border: "1px solid #282c34", borderRadius: 12, padding: 18, height: "max-content" }}>
            <small style={{ color: "#777e8b", letterSpacing: ".1em" }}>PRICING</small>
            <p className={tool.pricing.toLowerCase()} style={{ fontWeight: 700 }}>● {tool.pricing}</p>
            <hr style={{ borderColor: "#242830" }} />
            <small style={{ color: "#777e8b", letterSpacing: ".1em" }}>AVAILABILITY</small>
            <p>{tool.hasApi ? "Web app · API available" : "Web app"}</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
