import { env } from "@/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${env.CURRENCY_BEACON_BASE_API_URL}/currencies?api_key=${env.CURRENCY_BEACON_API_KEY}`,
    );
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(errorBody);
    }
    const data = await response.json();
    const currencies = data["response"];
    if (!Array.isArray(currencies)) {
      throw new Error("Invalid API response");
    }

    const transformedCurrencies = currencies.map((currency) => ({
      id: currency["id"],
      name: currency["name"],
      shortCode: currency["short_code"],
      symbol: currency["symbol"],
    }));

    return NextResponse.json(
      {
        data: transformedCurrencies,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          "The server encountered an error and couldn't process you request",
      },
      { status: 500 },
    );
  }
}
