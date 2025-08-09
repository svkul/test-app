"use client";

import { useScrollToElement } from "@/hooks/useScrollToElement";
import { useTokenMutation } from "@/hooks/useTokenMutation";

import { Button } from "../ui/button";

interface ActionProps {
  isToken: boolean;
}

export const Action = ({ isToken }: ActionProps) => {
  const { mutate: getToken, isPending } = useTokenMutation();
  const scrollTo = useScrollToElement();

  const handleSignIn = () => {
    getToken();
  };

  return (
    <>
      {isToken ? (
        <Button
          className="text-foreground"
          variant="yellow"
          size="yellow"
          onClick={() => scrollTo("signUp")}
        >
          Add user
        </Button>
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
  );
};
