"use client";

import { useEffect } from "react";

import { useUsersStore } from "@/stores/useUsersStore";
import { type UsersResponse } from "@/types";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

import { UserCard } from "./UserCard";

export const UserCards = ({ total_users, users }: UsersResponse) => {
  const {
    users: storeUsers,
    total_users: storeTotal,
    count: storeCount,
    isLoading,
    loadUsers,
    initialize,
  } = useUsersStore();

  const handleClick = () => {
    const perPage = process.env.NEXT_PUBLIC_USER_PER_PAGE
      ? Number(process.env.NEXT_PUBLIC_USER_PER_PAGE)
      : 6;

    loadUsers(storeCount + perPage);
  };

  useEffect(() => {
    if (storeCount === 0 && users.length > 0) {
      const count = process.env.NEXT_PUBLIC_USER_PER_PAGE
        ? +process.env.NEXT_PUBLIC_USER_PER_PAGE
        : 6;
      initialize({ users, total_users, count });
    }
  }, [initialize, storeCount, users, total_users]);

  return (
    <>
      <div
        className={cn(
          " grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[18px] lg:gap-[30px] justify-items-stretch w-full",
          storeTotal <= storeCount ? "mb-[0px]" : "mb-[60px] sm:mb-[50px]"
        )}
      >
        {storeUsers.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      {storeTotal > storeCount && (
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
