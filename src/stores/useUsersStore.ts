import { create } from "zustand";

import { type UsersResponse, type User } from "@/types";
import { typedFetch } from "@/services/externalApi";

interface UsersState {
  users: User[];
  total_users: number;
  count: number;
  isLoading: boolean;
  error: string | null;
  loadUsers: (count: number) => Promise<void>;
  initialize: (initData: {
    users: User[];
    total_users: number;
    count: number;
  }) => void;
}

export const useUsersStore = create<UsersState>((set) => ({
  users: [],
  total_users: 0,
  count: 0,
  isLoading: false,
  error: null,
  loadUsers: async (count) => {
    set({ isLoading: true, error: null });
    try {
      const data = await typedFetch<UsersResponse>(`/api/users?count=${count}`);

      if (data.success) {
        set({
          users: data.users,
          total_users: data.total_users,
          count: data.count,
          isLoading: false,
        });
      } else {
        set({ error: "Failed to load users", isLoading: false });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Unknown error",
        isLoading: false,
      });
    }
  },
  initialize: (initData) => {
    set({
      users: initData.users,
      total_users: initData.total_users,
      count: initData.count,
    });
  },
}));
