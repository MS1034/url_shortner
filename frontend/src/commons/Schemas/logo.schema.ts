import { z } from "zod";

export const brandLogoSchema = z.object({
  logo_id: z.number().int(),
  user_id: z.string().optional(),
  logo_path: z.string(),
  expiration_date: z.date().optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
  deleted_at: z.date().optional(),
  is_deleted: z.boolean(),
  file: z.instanceof(File).optional(),
  blurHash: z.string().optional(),
});
