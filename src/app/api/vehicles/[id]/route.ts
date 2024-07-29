import { client } from "@/features/database";
import { Vehicle } from "@/features/vehicles";
import { ObjectId } from "mongodb";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const vehicle = await client //
    .db("my-ev-toolbox")
    .collection<Omit<Vehicle, "_id">>("vehicles")
    .findOne({ _id: new ObjectId(id) });

  return Response.json(vehicle);
}
