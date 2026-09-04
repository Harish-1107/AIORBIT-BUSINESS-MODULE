"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SavedPage() {
  const [slugs, setSlugs] = useState<string[]>([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("ai-orbit:saved") ?? "[]");
      if (Array.isArray(stored)) {
        setSlugs(stored.map((value) => String(value).toLowerCase().replaceAll(" ", "-")));
      }
    } catch {
      setSlugs([]);
    }
  }, []);
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav"><Link className="brand" href="/"><i>✦</i>AIORBIT</Link><Link className="primary" href="/">Business AI</Link></header>
      <section className="section" style={{ maxWidth: 850 }}>
        <p className="eyebrow">YOUR LIBRARY</p><h1 style={{ fontSize: 44, letterSpacing: "-.05em" }}>Saved tools</h1>
        {slugs.length ? <div className="function-grid">{slugs.map((slug) => <Link className="function" href={`/business/tools/${slug}`} key={slug}><h3>{slug.replaceAll("-", " ")}</h3><p>Open the saved tool detail page.</p><small>View tool →</small></Link>)}</div> : <div className="function"><h3>No saved tools yet</h3><p>Use the heart action in the directory to build a shortlist.</p><Link className="primary" href="/#directory">Browse tools</Link></div>}
      </section>
    </main>
  );
}
