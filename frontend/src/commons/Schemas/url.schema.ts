import { z } from "zod";
import { UrlStatusEnum, UrlTypeEnum } from "@/commons/types/Url";

// Helper function to parse date strings
const parseDate = (value: string | Date | undefined): Date | undefined => {
  if (value instanceof Date) return value;
  if (typeof value === "string") {
    const parsedDate = new Date(value);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }
  return undefined;
};

const baseUrlSchema = z.object({
  original_url: z.string().url({ message: "Invalid URL format" }).optional(),
  logo_id: z.number().optional(),
  tag_id: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val), {
      message: "tag_id must be a valid number",
    })
    .optional(),
  url_type: z
    .enum(Object.keys(UrlTypeEnum) as [string, ...string[]], {
      required_error: "URL type is required",
      invalid_type_error: "Invalid URL type",
    })
    .optional(),
  expiration_date: z
    .union([z.string(), z.date(), z.undefined()])
    .transform(parseDate)
    .optional(),
  status: z
    .enum(Object.keys(UrlStatusEnum) as [string, ...string[]], {
      required_error: "URL Status is required",
      invalid_type_error: "Invalid URL status",
    })
    .default("ACTIVE"),
  is_deleted: z.boolean().default(false),
  associated: z.boolean().default(true),
});

export const createUrlSchema = baseUrlSchema.extend({
  original_url: z.string().url({ message: "Invalid URL format" }),
  is_pre_generated: z.boolean().default(false),
});

export const pregenerateUrlSchema = baseUrlSchema.extend({
  quantity: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val), {
      message: "Quantity must be a valid number",
    }),
  is_pre_generated: z.boolean().default(true),
});
