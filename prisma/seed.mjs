import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const databaseUrl = z.string().url("DATABASE_URL must be a valid database URL").parse(process.env.DATABASE_URL);
const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

const functions = [
  ["Writing & Editing", "writing-editing", 85, "Create sharper content, briefs, and communications.", "✍", "#9b8cff"],
  ["Design & Creative", "design-creative", 83, "From early concepts to production-ready visual assets.", "✦", "#ed72b5"],
  ["Customer Service", "customer-service", 64, "Resolve questions faster with intelligent assistance.", "◌", "#51cfe2"],
  ["Sales", "sales", 57, "Research, personalize, and move deals forward.", "↗", "#f3ad4d"],
  ["Marketing", "marketing", 52, "Plan campaigns and learn what resonates with customers.", "◎", "#55d19f"],
  ["Operations", "operations", 48, "Automate recurring work and make better decisions.", "⌁", "#8b8cff"],
  ["Finance", "finance", 41, "Forecast, reconcile, and explain financial performance.", "$", "#58c8a0"],
  ["People & HR", "people-hr", 36, "Support hiring, onboarding, and employee development.", "♙", "#f08cae"],
];

const tools = [
  ["Jasper", "jasper", "AI copilot for on-brand marketing content at scale.", "Create and govern high-volume campaign content with a shared brand voice.", "https://www.jasper.ai", "PAID", true, false, "Marketing", ["content-generation", "marketing", "copywriting"], true],
  ["Notion AI", "notion-ai", "Write, summarize, and search across your team workspace.", "Turn team knowledge into drafts, project updates, and answers without leaving the workspace.", "https://www.notion.so/product/ai", "FREEMIUM", true, false, "Writing & Editing", ["workspace", "knowledge-management", "writing-assistant"], true],
  ["Intercom Fin", "intercom-fin", "A customer service agent that resolves support conversations.", "An AI agent that answers questions from your help center and hands off complex conversations.", "https://www.intercom.com/fin", "PAID", true, false, "Customer Service", ["ai-chatbot", "support", "customer-success"], true],
  ["Canva Magic Studio", "canva-magic-studio", "Create campaign-ready designs with AI-powered creative tools.", "Generate editable visual concepts and resize them for every campaign channel.", "https://www.canva.com/magic-studio", "FREEMIUM", false, false, "Design & Creative", ["image-generation", "design", "presentations"], false],
  ["Clay", "clay", "Go-to-market research and enrichment for outbound teams.", "Combine data providers and AI research to build precise prospecting workflows.", "https://www.clay.com", "FREEMIUM", true, false, "Sales", ["enrichment", "prospecting", "sales"], true],
  ["Zapier Agents", "zapier-agents", "AI agents that automate work across your business apps.", "Create governed agents that take action across the apps your teams already use.", "https://zapier.com/agents", "FREEMIUM", true, false, "Operations", ["workflows", "automation", "agents"], true],
  ["Grammarly", "grammarly", "Writing assistance that makes every message clear and confident.", "Keep customer, sales, and internal communication consistent across every channel.", "https://www.grammarly.com", "FREEMIUM", true, false, "Writing & Editing", ["writing-assistant", "editing", "productivity"], false],
  ["HubSpot Breeze", "hubspot-breeze", "AI tools embedded across marketing, sales, and service.", "Bring content, CRM insights, and customer assistance into one go-to-market platform.", "https://www.hubspot.com/products/artificial-intelligence", "PAID", true, false, "Marketing", ["crm", "marketing", "sales"], true],
  ["Figma AI", "figma-ai", "Generate, rename, and prototype design work faster in Figma.", "Accelerate product discovery while keeping designers in control of the canvas.", "https://www.figma.com/ai", "FREEMIUM", false, false, "Design & Creative", ["design", "prototyping", "product"], true],
  ["Zendesk AI", "zendesk-ai", "Intelligent triage and resolution for support teams.", "Route intent, suggest replies, and automate common service requests with guardrails.", "https://www.zendesk.com/ai", "PAID", true, false, "Customer Service", ["support", "ai-chatbot", "automation"], false],
  ["Salesforce Einstein", "salesforce-einstein", "Predictive insights and generative assistance for CRM teams.", "Help sellers prioritize accounts and draft relevant customer follow-ups.", "https://www.salesforce.com/einstein", "PAID", true, false, "Sales", ["crm", "sales", "forecasting"], true],
  ["Linear AI", "linear-ai", "Keep product teams moving with issue intelligence.", "Summarize issues, draft updates, and find patterns across product work.", "https://linear.app/ai", "PAID", false, false, "Operations", ["project-management", "productivity", "workspace"], false],
  ["Open WebUI", "open-webui", "Self-hosted interface for private AI workflows.", "Run a flexible, open-source AI workspace with your own models and data controls.", "https://github.com/open-webui/open-webui", "FREE", false, true, "Operations", ["open-source", "self-hosted", "ai-chatbot"], false],
  ["Perplexity", "perplexity", "Research answers with cited sources for business teams.", "Move from a question to a sourced brief quickly with web-grounded search.", "https://www.perplexity.ai", "FREEMIUM", true, false, "Writing & Editing", ["research", "search", "knowledge-management"], true],
  ["Runway", "runway", "Generative video tools for creative production.", "Prototype and produce campaign video concepts without a full production cycle.", "https://runwayml.com", "PAID", true, false, "Design & Creative", ["video-generation", "creative", "image-generation"], false],
  ["Ramp Intelligence", "ramp-intelligence", "Automate spend controls and finance operations.", "Surface anomalies, explain spend, and streamline finance requests.", "https://ramp.com", "PAID", true, false, "Finance", ["finance", "automation", "analytics"], false],
  ["Glean", "glean", "Enterprise search and knowledge assistance.", "Give every employee a secure, useful answer from the company’s knowledge.", "https://www.glean.com", "PAID", true, false, "People & HR", ["enterprise-search", "knowledge-management", "productivity"], true],
  ["Ashby", "ashby", "Recruiting analytics and workflow automation.", "Help recruiting teams source, interview, and learn from hiring funnel data.", "https://www.ashbyhq.com", "PAID", true, false, "People & HR", ["recruiting", "analytics", "automation"], false],
];

const resources = [
  ["AI adoption scorecard", "ai-adoption-scorecard", "A practical checklist for evaluating readiness, risk, and impact.", "https://example.com/resources/ai-adoption-scorecard", "GUIDE", true, "Operations"],
  ["Writing workflow playbook", "writing-workflow-playbook", "Templates for turning a blank page into a reviewed business brief.", "https://example.com/resources/writing-workflow-playbook", "PLAYBOOK", true, "Writing & Editing"],
  ["Customer support automation guide", "customer-support-automation", "How to automate repetitive support while protecting customer trust.", "https://example.com/resources/customer-support-automation", "GUIDE", false, "Customer Service"],
  ["AI ROI measurement basics", "ai-roi-measurement", "Choose useful baselines and measure outcomes beyond model usage.", "https://example.com/resources/ai-roi-measurement", "GUIDE", false, "Finance"],
];

const examples = [
  ["Campaign brief in half the time", "campaign-brief-half-time", "A marketing team turns research into a reviewed campaign brief in one afternoon.", "Research, draft, review, and publish with a governed content workflow.", "Marketing", "jasper"],
  ["Support triage without backlog growth", "support-triage-without-backlog", "A support team resolves repetitive questions while escalating edge cases.", "Classify conversations, suggest answers, and learn from human handoffs.", "Customer Service", "intercom-fin"],
  ["Private knowledge assistant", "private-knowledge-assistant", "An operations team launches a self-hosted assistant for internal documentation.", "Index approved documents and answer recurring process questions securely.", "Operations", "open-webui"],
  ["Weekly forecast narrative", "weekly-forecast-narrative", "Finance leaders get a concise narrative around changes in spend and forecast.", "Reconcile source data, surface anomalies, and explain the drivers.", "Finance", "ramp-intelligence"],
];

const useCases = [
  ["Account research brief", "account-research-brief", "Create a sourced account brief before a discovery call.", "Sales", "clay"],
  ["Help center answer drafting", "help-center-answer-drafting", "Draft a consistent answer from approved support documentation.", "Customer Service", "zendesk-ai"],
  ["Close-process checklist", "close-process-checklist", "Turn recurring finance close steps into an accountable workflow.", "Finance", "ramp-intelligence"],
  ["Onboarding knowledge path", "onboarding-knowledge-path", "Give new hires a guided path through trusted internal knowledge.", "People & HR", "glean"],
];

const submissions = [
  ["OtterPilot", "https://otter.ai", "Operations", "Meeting notes and action items for distributed teams."],
  ["Mistral Le Chat", "https://chat.mistral.ai", "Writing & Editing", "A fast conversational assistant for research and drafting."],
];

async function main() {
  for (const [name, slug, adoptionRate, description, icon, color] of functions) {
    await prisma.businessFunction.upsert({
      where: { slug },
      update: { name, adoptionRate, description, icon, color },
      create: { name, slug, adoptionRate, description, icon, color },
    });
  }

  for (const [name, slug, description, longDescription, website, pricing, hasApi, isOpenSource, functionName, tagNames, featured] of tools) {
    const businessFunction = await prisma.businessFunction.findUniqueOrThrow({ where: { name: functionName } });
    const tool = await prisma.tool.upsert({
      where: { slug },
      update: { name, description, longDescription, website, pricing, hasApi, isOpenSource, businessFunctionId: businessFunction.id, status: "ACTIVE", featured },
      create: { name, slug, description, longDescription, website, pricing, hasApi, isOpenSource, businessFunctionId: businessFunction.id, status: "ACTIVE", featured },
    });
    await prisma.toolTag.deleteMany({ where: { toolId: tool.id } });
    for (const tagName of tagNames) {
      const tag = await prisma.tag.upsert({ where: { name: tagName }, update: {}, create: { name: tagName } });
      await prisma.toolTag.create({ data: { toolId: tool.id, tagId: tag.id } });
    }
  }

  for (const [title, slug, description, url, type, featured, functionName] of resources) {
    const businessFunction = await prisma.businessFunction.findUniqueOrThrow({ where: { name: functionName } });
    await prisma.learningResource.upsert({
      where: { slug },
      update: { title, description, url, type, featured, businessFunctionId: businessFunction.id },
      create: { title, slug, description, url, type, featured, businessFunctionId: businessFunction.id },
    });
  }

  for (const [title, slug, summary, details, functionName, toolSlug] of examples) {
    const businessFunction = await prisma.businessFunction.findUniqueOrThrow({ where: { name: functionName } });
    const tool = await prisma.tool.findUniqueOrThrow({ where: { slug: toolSlug } });
    await prisma.businessExample.upsert({
      where: { slug },
      update: { title, summary, details, useCase: details, businessFunctionId: businessFunction.id, toolId: tool.id },
      create: { title, slug, summary, details, useCase: details, businessFunctionId: businessFunction.id, toolId: tool.id },
    });
  }

  for (const [title, slug, description, functionName, toolSlug] of useCases) {
    const businessFunction = await prisma.businessFunction.findUniqueOrThrow({ where: { name: functionName } });
    const tool = await prisma.tool.findUniqueOrThrow({ where: { slug: toolSlug } });
    await prisma.useCase.upsert({
      where: { slug },
      update: { title, description, businessFunctionId: businessFunction.id, toolId: tool.id },
      create: { title, slug, description, businessFunctionId: businessFunction.id, toolId: tool.id },
    });
  }

  for (const [name, website, businessFunction, description] of submissions) {
    const existing = await prisma.toolSubmission.findFirst({ where: { website } });
    const data = { name, website, businessFunction, description, status: "PENDING" };
    if (existing) await prisma.toolSubmission.update({ where: { id: existing.id }, data });
    else await prisma.toolSubmission.create({ data });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
