"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useTokenMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/token", { method: "GET" });
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (!res.ok) throw new Error("Failed to get token");
      return res.json();
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
      const res = await fetch("/api/token", { method: "DELETE" });
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (!res.ok) throw new Error("Failed to get token");
      return res.json();
    },
    onSuccess: async (data) => {
      if (data.success) {
        router.refresh();
      }
    },
  });
}
