"use client";

import { Button } from "../ui/button";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import {
  useRemoveTokenMutation,
  useTokenMutation,
} from "@/hooks/useTokenMutation";

interface NavigationProps {
  isToken: boolean;
}

export const Navigation = ({ isToken }: NavigationProps) => {
  const { mutate: getToken, isPending } = useTokenMutation();
  const { mutate: removeToken, isPending: isRemovePending } =
    useRemoveTokenMutation();
  const scrollTo = useScrollToElement();

  const handleSignIn = () => {
    getToken();
  };

  const handleLogOut = () => {
    removeToken();
  };

  return (
    <nav className="flex items-center gap-[10px]">
      <Button
        className="text-foreground"
        variant="yellow"
        size="yellow"
        onClick={() => scrollTo("users")}
      >
        Users
      </Button>

      <>
        {isToken ? (
          <>
            <Button
              className="text-foreground"
              variant="yellow"
              size="yellow"
              onClick={() => scrollTo("signUp")}
            >
              Add user
            </Button>

            <Button
              className="text-foreground hidden sm:flex"
              variant="yellow"
              size="yellow"
              isLoading={isRemovePending}
              onClick={handleLogOut}
            >
              Log out
            </Button>
          </>
        ) : (
          <Button
            className="text-foreground"
            variant="yellow"
            size="yellow"
            isLoading={isPending}
            onClick={handleSignIn}
          >
            Sign Up
          </Button>
        )}
      </>
    </nav>
  );
};
