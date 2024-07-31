import { client } from "@/features/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const skip = parseInt(searchParams.get("skip") || "0", 0);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search");

  const vehicles = await client //
    .db("my-ev-toolbox")
    .collection("vehicles")
    .aggregate([
      ...(search
        ? [
            {
              $search: {
                index: "brand_model_variant_search",
                text: {
                  query: search,
                  path: {
                    wildcard: "*",
                  },
                },
              },
            },
          ]
        : []),
      {
        $project: {
          _id: 1,
          brand: 1,
          model: 1,
          variant: 1,
          deliveryStart: 1,
        },
      },
    ])
    .skip(skip)
    .limit(limit)
    .toArray();

  return Response.json(vehicles);
}
