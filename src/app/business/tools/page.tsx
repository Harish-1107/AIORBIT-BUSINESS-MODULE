import Link from "next/link";
import { getTools } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ToolsPage() {
  const tools = await getTools();
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav"><Link className="brand" href="/"><i>✦</i>AIORBIT</Link><Link className="primary" href="/">Business AI</Link></header>
      <section className="section">
        <p className="eyebrow">DATABASE DIRECTORY</p>
        <h1 style={{ fontSize: 42, letterSpacing: "-.05em" }}>Business AI tools</h1>
        <p className="muted">Browse the tools currently curated in AI Orbit.</p>
        <div className="function-grid" style={{ marginTop: 32 }}>
          {tools.map((tool) => <Link className="function" href={`/business/tools/${tool.slug}`} key={tool.slug}><h3>{tool.name}</h3><p>{tool.description}</p><small>{tool.businessFunction.name} · {tool.pricing}</small></Link>)}
        </div>
      </section>
    </main>
  );
}
