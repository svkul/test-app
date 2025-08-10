"use client";

import { typedFetch } from "@/services/externalApi";
import { type TokenResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useTokenMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await typedFetch<TokenResponse>("/api/token", {
        method: "GET",
      });

      if (!res.success) throw new Error("Failed to get token");
      return res;
    },
    onSuccess: async (data) => {
      if (data.success) {
        router.refresh();
      }
    },
  });
}

export function useRemoveTokenMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await typedFetch<TokenResponse>("/api/token", {
        method: "DELETE",
      });

      if (!res.success) throw new Error("Failed to get token");
      return res;
    },
    onSuccess: async (data) => {
      if (data.success) {
        router.refresh();
      }
    },
  });
}
