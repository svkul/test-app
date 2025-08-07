"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import { useScrollToElement } from "@/hooks/useScrollToElement";

export const Header = () => {
  const scrollTo = useScrollToElement();

  return (
    <header className="pt-[16px] pb-[13px] bg-header-background">
      <div className="container mx-auto flex justify-between items-center ">
        <Image src="/Logo.svg" alt="logo" width={104} height={26} />

        <nav className="flex items-center gap-[10px]">
          <Button
            className="text-foreground"
            variant="yellow"
            size="yellow"
            onClick={() => scrollTo("users")}
          >
            Users
          </Button>

          <Button
            className="text-foreground"
            variant="yellow"
            size="yellow"
            onClick={() => scrollTo("signUp")}
          >
            Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
};
