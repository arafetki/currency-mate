import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    CURRENCY_BEACON_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CURREANCY_BEACON_BASE_API_URL: z.string().url(),
  },
  // For Next.js >= 13.4.4, you can just reference process.env:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CURREANCY_BEACON_BASE_API_URL:
      process.env.NEXT_PUBLIC_CURREANCY_BEACON_BASE_API_URL,
  },
  emptyStringAsUndefined: true,
});