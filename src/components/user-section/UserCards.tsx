"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { type UsersResponse } from "@/types";
import { cn } from "@/lib/utils";

import { SignUpSection } from "@/components/sign-up-section/SignUpSection";

import { Button } from "../ui/button";

import { UserCard } from "./UserCard";

export const UserCards = ({ total_users, users }: UsersResponse) => {
  const [usersList, setUserList] = useState(users);
  const [totalUserVal, setTotalUsers] = useState(total_users);
  const [countVal, setCount] = useState(
    process.env.NEXT_PUBLIC_USER_PER_PAGE
      ? +process.env.NEXT_PUBLIC_USER_PER_PAGE
      : 6
  );

  const { mutate: loadUsers, isPending } = useMutation({
    mutationKey: ["loadUsers", countVal],
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
          " grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[18px] lg:gap-[30px] justify-items-stretch w-full",
          totalUserVal <= +countVal ? "mb-[0px]" : "mb-[60px] sm:mb-[50px]"
        )}
      >
        {usersList.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      {totalUserVal > +countVal && (
        <Button
          className="text-foreground"
          variant="yellow"
          size="yellow"
          onClick={handleClick}
          isLoading={isPending}
        >
          Show more
        </Button>
      )}
    </>
  );
};
