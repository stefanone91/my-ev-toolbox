import axios from "axios";
import { useEffect, useState } from "react";
import { Vehicle, VehiclePartial } from "./models";

export function useGetVehiclesQuery(search: string | undefined) {
  const [data, setData] = useState<VehiclePartial[] | undefined>([]);
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<"idle" | "pending" | "fulfilled" | "error">("idle");

  useEffect(() => {
    const searchAll = async () => {
      try {
        setStatus("pending");
        const queryParams = new URLSearchParams({ ...(search ? { search } : {}) });
        const { data } = await axios.get<VehiclePartial[]>(`/api/vehicles?${queryParams}`);
        setData(data);
        setStatus("fulfilled");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || e || "Unknown error");
      }
    };
    searchAll();
  }, [search]);

  return {
    data,
    isFetching: status === "pending",
    isSuccess: status === "fulfilled",
    isError: status === "error",
    error,
  };
}

export function useGetVehicleQuery(id: string | undefined) {
  const [status, setStatus] = useState<"idle" | "pending" | "fulfilled" | "error">("idle");
  const [data, setData] = useState<Vehicle | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!id) {
      return;
    }
    const search = async () => {
      try {
        setStatus("pending");
        let { data } = await axios.get<Vehicle>(`/api/vehicles/${id}`);
        setData(data);
        setStatus("fulfilled");
      } catch (e: any) {
        setStatus("error");
        setError(e?.message || e || "Unknown error");
      }
    };
    search();
  }, [id]);

  return {
    data,
    isFetching: status === "pending",
    isSuccess: status === "fulfilled",
    isError: status === "error",
    error,
  };
}
