"use client";

import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";

interface Props {
  tokenFromServer: string | null;
  children: ReactNode;
}

export default function QueryProvider({ tokenFromServer, children }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    if (tokenFromServer) {
      setToken(tokenFromServer);
    }
  }, [tokenFromServer, setToken]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
