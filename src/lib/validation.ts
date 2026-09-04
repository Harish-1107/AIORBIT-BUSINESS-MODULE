import { z } from "zod";

const nonEmpty = (label: string) => z.string().trim().min(1, `${label} is required`).max(500);
const optionalBoolean = z.preprocess(
  (value) => value === undefined ? undefined : value === "true" || value === true ? true : value === "false" || value === false ? false : value,
  z.boolean().optional(),
);

export const submissionSchema = z.object({
  name: nonEmpty("Tool name").max(120),
  website: z.string().trim().url("A valid website URL is required").max(500),
  function: nonEmpty("Business function").max(120),
  description: nonEmpty("Description").max(2000),
});

export const toolQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  function: z.string().trim().max(120).optional(),
  tag: z.string().trim().max(80).optional(),
  pricing: z.enum(["FREE", "FREEMIUM", "PAID"]).optional(),
  api: optionalBoolean,
  openSource: optionalBoolean,
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const toolDirectoryQuerySchema = z.object({
  q: z.string().trim().max(100).optional(),
  function: z.string().trim().max(120).optional(),
  tag: z.string().trim().max(80).optional(),
  pricing: z.enum(["FREE", "FREEMIUM", "PAID"]).optional(),
  api: optionalBoolean,
  openSource: optionalBoolean,
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(24),
  sort: z.enum(["name", "newest", "featured", "adoption"]).default("name"),
});

export const slugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug");
