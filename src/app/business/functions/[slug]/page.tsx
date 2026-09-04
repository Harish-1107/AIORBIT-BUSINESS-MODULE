import Link from "next/link";
import { notFound } from "next/navigation";
import { getBusinessFunction } from "@/lib/data";
import { slugSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export default async function BusinessFunctionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slugSchema.safeParse(slug).success) notFound();
  const item = await getBusinessFunction(slug);
  if (!item) notFound();
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav"><Link className="brand" href="/"><i>✦</i>AIORBIT</Link><Link className="primary" href="/business/functions">All functions</Link></header>
      <section className="section">
        <Link href="/business/functions" style={{ color: "#aaa5ff", fontSize: 12 }}>← Back to functions</Link>
        <p className="eyebrow" style={{ marginTop: 38 }}>{item.name.toUpperCase()}</p>
        <h1 style={{ fontSize: 44, letterSpacing: "-.05em", margin: 0 }}>{item.icon} AI for {item.name}</h1>
        <p className="muted" style={{ maxWidth: 620, fontSize: 16, marginTop: 14 }}>{item.description}</p>
        <div className="function-grid" style={{ marginTop: 38 }}>
          {item.tools.map((tool) => <Link className="function" href={`/business/tools/${tool.slug}`} key={tool.slug}><h3>{tool.name}</h3><p>{tool.description}</p><small>{tool.pricing} · View tool →</small></Link>)}
        </div>
        {item.resources.length > 0 && <><p className="eyebrow" style={{ marginTop: 52 }}>LEARN</p><h2>Resources</h2><div className="function-grid">{item.resources.map((resource) => <a className="function" href={resource.url} target="_blank" rel="noreferrer" key={resource.slug}><h3>{resource.title}</h3><p>{resource.description}</p><small>{resource.type} ↗</small></a>)}</div></>}
        {item.examples.length > 0 && <><p className="eyebrow" style={{ marginTop: 52 }}>IN PRACTICE</p><h2>Business examples</h2><div className="function-grid">{item.examples.map((example) => <article className="function" key={example.slug}><h3>{example.title}</h3><p>{example.summary}</p><small>{example.useCase ? "Use case included" : "Example"}</small></article>)}</div></>}
        {item.useCases.length > 0 && <><p className="eyebrow" style={{ marginTop: 52 }}>WORKFLOWS</p><h2>Common use cases</h2><div className="function-grid">{item.useCases.map((useCase) => <article className="function" key={useCase.slug}><h3>{useCase.title}</h3><p>{useCase.description}</p><small>Use case</small></article>)}</div></>}
      </section>
    </main>
  );
}
