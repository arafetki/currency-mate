import { z } from "zod";

export const CurrencySchema = z.object({
  name: z.string(),
  short_code: z.string(),
  symbol: z.string(),
});

export type Currency = z.infer<typeof CurrencySchema>;
