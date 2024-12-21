import { z } from "zod";
import { CurrencySchema } from "@/schemas/currency";

export const CurrencyConversionFormSchema = z.object({
  amount: z.number().positive(),
  baseCurrency: CurrencySchema,
  foreignCurrency: CurrencySchema,
});

export type CurrencyConversionFormData = z.infer<
  typeof CurrencyConversionFormSchema
>;
