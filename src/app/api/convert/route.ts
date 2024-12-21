import { env } from "@/env";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const queryParams = Object.fromEntries(searchParams.entries());
  const currencyConversionAPIUrl = new URL(
    `${env.CURRENCY_BEACON_BASE_API_URL}/convert`,
  );
  Object.entries(queryParams).forEach(([key, value]) => {
    currencyConversionAPIUrl.searchParams.append(key, value);
  });
  try {
    const response = await fetch(currencyConversionAPIUrl.toString());
    if (!response.ok) {
      console.log(`API request failed with status: ${response.status}`);
      return NextResponse.json(
        {
          error:
            "The request could not be processed due to an error. Please ensure the request is correctly formatted and contains valid data.",
        },
        { status: 400 },
      );
    }
    const data = await response.json();

    return NextResponse.json({ data: data["response"] }, { status: 200 });
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
