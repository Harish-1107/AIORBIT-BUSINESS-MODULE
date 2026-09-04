"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const functions = ["Writing & Editing", "Design & Creative", "Customer Service", "Sales", "Marketing", "Operations", "Finance", "People & HR"];

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const response = await fetch("/api/submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? "Unable to submit this tool right now.");
      return;
    }
    form.reset();
    setSubmitted(true);
  }
  return (
    <main style={{ minHeight: "100vh", background: "#050506", color: "#f7f7f8" }}>
      <header className="nav"><Link className="brand" href="/"><i>✦</i>AIORBIT</Link><Link className="primary" href="/">Business AI</Link></header>
      <section className="section" style={{ maxWidth: 720 }}>
        <Link href="/" style={{ color: "#aaa5ff", fontSize: 12 }}>← Back to directory</Link>
        <p className="eyebrow" style={{ marginTop: 38 }}>CONTRIBUTE TO AI ORBIT</p>
        <h1 style={{ fontSize: 44, letterSpacing: "-.05em", margin: 0 }}>Submit an AI tool</h1>
        <p className="muted" style={{ marginTop: 12 }}>Share a tool that helps teams work better. Every submission is reviewed before publishing.</p>
        {submitted ? <div className="function" style={{ marginTop: 32 }}><h3>Thanks for the submission.</h3><p>We’ll review your tool and email you when it’s ready to publish.</p><Link className="primary" href="/">Return to directory</Link></div> : <form className="modal" style={{ position: "relative", width: "100%", marginTop: 32 }} onSubmit={submit}><label>Tool name<input name="name" required placeholder="e.g. Acme AI" /></label><label>Website URL<input name="website" required type="url" placeholder="https://" /></label><label>Business function<select name="function" required defaultValue=""><option disabled value="">Select a function</option>{functions.map((item) => <option key={item}>{item}</option>)}</select></label><label>What does it do?<textarea name="description" required placeholder="Tell us about the tool and its use case." /></label>{error && <p style={{ color: "#ff9eaa", margin: 0 }}>{error}</p>}<button className="primary" type="submit">Submit for review →</button></form>}
      </section>
    </main>
  );
}
