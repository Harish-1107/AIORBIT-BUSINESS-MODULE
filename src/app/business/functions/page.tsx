import Link from "next/link";
import { getBusinessFunctions } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function FunctionsPage() {
  const functions = await getBusinessFunctions();
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav"><Link className="brand" href="/"><i>✦</i>AIORBIT</Link><Link className="primary" href="/">Business AI</Link></header>
      <section className="section">
        <p className="eyebrow">BUSINESS FUNCTIONS</p>
        <h1 style={{ fontSize: 42, letterSpacing: "-.05em" }}>AI by business function</h1>
        <div className="function-grid" style={{ marginTop: 32 }}>
          {functions.map((item) => <Link href={`/business/functions/${item.slug}`} className="function" key={item.id}><strong style={{ color: "#aaa5ff", fontSize: 22 }}>{item.adoptionRate}%</strong><h3>{item.name}</h3><p>{item.description}</p><small>{item._count.tools} tools · Explore →</small></Link>)}
        </div>
      </section>
    </main>
  );
}
