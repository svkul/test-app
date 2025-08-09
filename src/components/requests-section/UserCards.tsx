"use client";

import { Dispatch, SetStateAction } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

import { UsersResponse, type User } from "@/types";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { UserCard } from "./UserCard";

interface UserCardsProps {
  users: User[];
  totalUsers: number;
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

export const UserCards = ({
  users,
  totalUsers,
  countVal,
  setCount,
  isLoading,
  loadUsers,
}: UserCardsProps) => {
  const handleClick = () => {
    const newCountVal =
      +countVal +
      (process.env.NEXT_PUBLIC_USER_PER_PAGE
        ? +process.env.NEXT_PUBLIC_USER_PER_PAGE
        : 6);

    loadUsers({ count: newCountVal });
    setCount(newCountVal);
  };

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[18px] lg:gap-[30px] justify-items-stretch w-full",
          totalUsers <= +countVal ? "mb-[0px]" : "mb-[60px] sm:mb-[50px]"
        )}
      >
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      {totalUsers > +countVal && (
        <Button
          className="text-foreground"
          variant="yellow"
          size="yellow"
          onClick={handleClick}
          isLoading={isLoading}
        >
          Show more
        </Button>
      )}
    </>
  );
};
