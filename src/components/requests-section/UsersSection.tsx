import { Dispatch, SetStateAction } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

import { UsersResponse, type User } from "@/types";

import { UserCards } from "./UserCards";

interface UsersSectionProps {
  users: User[];
  totalUsers: number;
  error: string | null;
  countVal: number;
  setCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  loadUsers: UseMutateFunction<
    UsersResponse,
    Error,
    {
      count: number;
    },
    unknown
  >;
}

export const UsersSection = ({
  users,
  totalUsers,
  error,
  countVal,
  setCount,
  isLoading,
  loadUsers,
}: UsersSectionProps) => {
  return (
    <section
      id="users"
      className="flex flex-col items-center justify-center py-[70px]"
    >
      <h2 className="h1 mb-[50px] text-center">Working with GET request</h2>

      {error ? (
        <p>Something went wrong :(</p>
      ) : (
        <UserCards
          users={users}
          totalUsers={totalUsers}
          setCount={setCount}
          countVal={countVal}
          isLoading={isLoading}
          loadUsers={loadUsers}
        />
      )}
    </section>
  );
};
