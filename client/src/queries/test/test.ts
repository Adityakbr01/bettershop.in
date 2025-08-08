// queries/test/test.ts
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { PingResponse } from "@/types/api";

const fetchPing = async (): Promise<PingResponse> => {
  const res = await api.get<PingResponse>("/ping");
  return res.data;
};

export const usePing = () => {
  return useQuery<PingResponse, Error>({
    queryKey: ["ping"],
    queryFn: fetchPing
  });
};
