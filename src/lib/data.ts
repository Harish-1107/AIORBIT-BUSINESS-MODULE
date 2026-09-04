import { prisma } from "@/lib/prisma";

export type DirectoryTool = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string | null;
  website: string;
  logoUrl?: string | null;
  pricing: "FREE" | "FREEMIUM" | "PAID";
  hasApi: boolean;
  isOpenSource: boolean;
  status?: "ACTIVE" | "PENDING" | "ARCHIVED";
  featured?: boolean;
  adoptionRate?: number;
  createdAt?: Date;
  businessFunction: { name: string; slug: string };
  tags: string[];
};

export const fallbackTools: DirectoryTool[] = [
  { name: "Jasper", slug: "jasper", description: "AI copilot for on-brand marketing content at scale.", website: "https://www.jasper.ai", pricing: "PAID", hasApi: true, isOpenSource: false, businessFunction: { name: "Marketing", slug: "marketing" }, tags: ["content-generation"] },
  { name: "Notion AI", slug: "notion-ai", description: "Write, summarize, and search across your team workspace.", website: "https://www.notion.so/product/ai", pricing: "FREEMIUM", hasApi: true, isOpenSource: false, businessFunction: { name: "Writing & Editing", slug: "writing-editing" }, tags: ["workspace"] },
  { name: "Intercom Fin", slug: "intercom-fin", description: "A customer service agent that resolves support conversations.", website: "https://www.intercom.com/fin", pricing: "PAID", hasApi: true, isOpenSource: false, businessFunction: { name: "Customer Service", slug: "customer-service" }, tags: ["ai-chatbot"] },
  { name: "Canva Magic Studio", slug: "canva-magic-studio", description: "Create campaign-ready designs with AI-powered creative tools.", website: "https://www.canva.com/magic-studio", pricing: "FREEMIUM", hasApi: false, isOpenSource: false, businessFunction: { name: "Design & Creative", slug: "design-creative" }, tags: ["image-generation"] },
  { name: "Clay", slug: "clay", description: "Go-to-market research and enrichment for outbound teams.", website: "https://www.clay.com", pricing: "FREEMIUM", hasApi: true, isOpenSource: false, businessFunction: { name: "Sales", slug: "sales" }, tags: ["enrichment"] },
  { name: "Zapier Agents", slug: "zapier-agents", description: "AI agents that automate work across your business apps.", website: "https://zapier.com/agents", pricing: "FREEMIUM", hasApi: true, isOpenSource: false, businessFunction: { name: "Operations", slug: "operations" }, tags: ["workflows"] },
  { name: "Grammarly", slug: "grammarly", description: "Writing assistance that makes every message clear and confident.", website: "https://www.grammarly.com", pricing: "FREEMIUM", hasApi: true, isOpenSource: false, businessFunction: { name: "Writing & Editing", slug: "writing-editing" }, tags: ["writing-assistant"] },
  { name: "HubSpot Breeze", slug: "hubspot-breeze", description: "AI tools embedded across marketing, sales, and service.", website: "https://www.hubspot.com/products/artificial-intelligence", pricing: "PAID", hasApi: true, isOpenSource: false, businessFunction: { name: "Marketing", slug: "marketing" }, tags: ["crm"] },
];

const fallbackFunctions = [
  { id: "writing-editing", name: "Writing & Editing", slug: "writing-editing", adoptionRate: 85, description: "Create sharper content, briefs, and communications.", _count: { tools: 2 } },
  { id: "design-creative", name: "Design & Creative", slug: "design-creative", adoptionRate: 83, description: "From early concepts to production-ready visual assets.", _count: { tools: 1 } },
  { id: "customer-service", name: "Customer Service", slug: "customer-service", adoptionRate: 64, description: "Resolve questions faster with intelligent assistance.", _count: { tools: 1 } },
  { id: "sales", name: "Sales", slug: "sales", adoptionRate: 57, description: "Research, personalize, and move deals forward.", _count: { tools: 1 } },
  { id: "marketing", name: "Marketing", slug: "marketing", adoptionRate: 52, description: "Plan campaigns and learn what resonates with customers.", _count: { tools: 2 } },
  { id: "operations", name: "Operations", slug: "operations", adoptionRate: 38, description: "Automate recurring work and make better decisions.", _count: { tools: 1 } },
];

export async function getTools(): Promise<DirectoryTool[]> {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { name: "asc" },
      include: { businessFunction: true, tags: { include: { tag: true } } },
    });
    return tools.map((tool) => ({
      id: tool.id,
      name: tool.name,
      slug: tool.slug,
      description: tool.description,
      longDescription: tool.longDescription,
      website: tool.website,
      logoUrl: tool.logoUrl,
      pricing: tool.pricing,
      hasApi: tool.hasApi,
      isOpenSource: tool.isOpenSource,
      status: tool.status,
      featured: tool.featured,
      adoptionRate: tool.businessFunction.adoptionRate,
      createdAt: tool.createdAt,
      businessFunction: { name: tool.businessFunction.name, slug: tool.businessFunction.slug },
      tags: tool.tags.map(({ tag }) => tag.name),
    }));
  } catch {
    return fallbackTools;
  }
}

export async function getTool(slug: string) {
  try {
    const tool = await prisma.tool.findUnique({
      where: { slug },
      include: {
        businessFunction: true,
        tags: { include: { tag: true } },
        examples: { orderBy: { createdAt: "desc" }, take: 6 },
        useCases: { orderBy: { createdAt: "desc" }, take: 6 },
      },
    });
    if (tool) {
      return {
        ...tool,
        businessFunction: { name: tool.businessFunction.name, slug: tool.businessFunction.slug },
        tags: tool.tags.map(({ tag }) => tag.name),
      };
    }

  } catch {
    // The public directory remains available when the database is unavailable.
  }
  return fallbackTools.find((tool) => tool.slug === slug);
}

export type DirectoryQuery = {
  q?: string;
  function?: string;
  tag?: string;
  pricing?: DirectoryTool["pricing"];
  api?: boolean;
  openSource?: boolean;
  page?: number;
  pageSize?: number;
  sort?: "name" | "newest" | "featured" | "adoption";
};

export async function getDirectoryTools(query: DirectoryQuery = {}) {
  const allTools = await getTools();
  const needle = query.q?.toLowerCase();
  const filtered = allTools.filter((tool) => {
    const matchesQuery = !needle || `${tool.name} ${tool.description} ${tool.longDescription ?? ""} ${tool.tags.join(" ")}`.toLowerCase().includes(needle);
    const matchesFunction = !query.function || tool.businessFunction.slug === query.function || tool.businessFunction.name.toLowerCase() === query.function.toLowerCase();
    const matchesTag = !query.tag || tool.tags.some((tag) => tag.toLowerCase() === query.tag?.toLowerCase());
    const matchesPricing = !query.pricing || tool.pricing === query.pricing;
    const matchesApi = query.api === undefined || tool.hasApi === query.api;
    const matchesOpenSource = query.openSource === undefined || tool.isOpenSource === query.openSource;
    return matchesQuery && matchesFunction && matchesTag && matchesPricing && matchesApi && matchesOpenSource;
  });
  const sorted = [...filtered].sort((a, b) => {
    if (query.sort === "newest") return (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0);
    if (query.sort === "featured") return Number(b.featured ?? false) - Number(a.featured ?? false) || a.name.localeCompare(b.name);
    if (query.sort === "adoption") return (b.adoptionRate ?? 0) - (a.adoptionRate ?? 0) || a.name.localeCompare(b.name);
    return a.name.localeCompare(b.name);
  });
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 24;
  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize),
    pagination: { page, pageSize, total: sorted.length, pageCount: Math.max(1, Math.ceil(sorted.length / pageSize)) },
  };
}

export async function getRelatedTools(slug: string) {
  const tool = await getTool(slug);
  if (!tool) return [];
  const { items } = await getDirectoryTools({ function: tool.businessFunction.slug, page: 1, pageSize: 7, sort: "featured" });
  return items.filter((item) => item.slug !== slug).slice(0, 6);
}

export async function getBusinessFunctions() {
  try {
    return await prisma.businessFunction.findMany({
      orderBy: { adoptionRate: "desc" },
      include: { _count: { select: { tools: true } } },
    });
  } catch {
    return fallbackFunctions;
  }
}

export async function getBusinessFunction(slug: string) {
  try {
    return await prisma.businessFunction.findUnique({
      where: { slug },
      include: {
        tools: { include: { tags: { include: { tag: true } } }, orderBy: { name: "asc" } },
        resources: { orderBy: { createdAt: "desc" }, take: 8 },
        examples: { orderBy: { createdAt: "desc" }, take: 8 },
        useCases: { orderBy: { createdAt: "desc" }, take: 8 },
        _count: { select: { tools: true } },
      },
    });
  } catch {
    const fallback = fallbackFunctions.find((item) => item.slug === slug);
    return fallback ? { ...fallback, icon: "✦", color: "#9b8cff", tools: fallbackTools.filter((tool) => tool.businessFunction.slug === slug), resources: [], examples: [], useCases: [] } : null;
  }
}
