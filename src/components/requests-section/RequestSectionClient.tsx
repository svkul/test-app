"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { type UsersResponse, type PositionsResponse } from "@/types";
import { UsersSection } from "./UsersSection";
import { SignUpSection } from "./SignUpSection";

interface RequestSectionClientProps {
  isToken: boolean;
  positionsResponse: PositionsResponse | null;
  usersResponse: UsersResponse | null;
  positionsError: string | null;
  usersError: string | null;
}

export const RequestSectionClient = ({
  isToken,
  positionsResponse,
  positionsError,
  usersResponse,
  usersError,
}: RequestSectionClientProps) => {
  const [usersList, setUserList] = useState(usersResponse?.users || []);
  const [totalUserVal, setTotalUsers] = useState(
    usersResponse?.total_users || 0
  );
  const [countVal, setCount] = useState(
    process.env.NEXT_PUBLIC_USER_PER_PAGE
      ? +process.env.NEXT_PUBLIC_USER_PER_PAGE
      : 6
  );

  const { mutate: loadUsers, isPending: isLoading } = useMutation<
    UsersResponse,
    Error,
    { count: number }
  >({
    mutationFn: async ({ count }: { count: number }) => {
      const res = await fetch(`/api/users?count=${count}`);

      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setUserList(data.users);
        setCount(data.count);
        setTotalUsers(data.total_users);
      }
    },
  });

  return (
    <>
      <UsersSection
        users={usersList}
        totalUsers={totalUserVal}
        error={usersError}
        countVal={countVal}
        setCount={setCount}
        isLoading={isLoading}
        loadUsers={loadUsers}
      />

      <SignUpSection
        isToken={isToken}
        positions={
          !positionsResponse || positionsError
            ? []
            : positionsResponse.positions
        }
        countVal={countVal}
        loadUsers={loadUsers}
      />
    </>
  );
};
