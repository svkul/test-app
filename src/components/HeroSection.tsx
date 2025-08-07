"use client";

import Image from "next/image";

import { Button } from "./ui/button";
import { useScrollToElement } from "@/hooks/useScrollToElement";

export const HeroSection = () => {
  const scrollTo = useScrollToElement();

  return (
    <section className="container mx-auto relative min-h-[650px] flex items-center justify-center overflow-hidden mb-[70px]">
      <Image
        src="/hero.jpeg"
        alt="Hero background"
        fill
        className="object-cover object-center z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-10 text-center text-white flex flex-col items-center flex-1 max-w-[380px]">
        <h1 className="h1 mb-[21px]">
          Test assignment for front-end developer
        </h1>

        <p className="p1 mb-[32px]">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they&apos;ll be building web interfaces with accessibility
          in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </p>

        <Button
          className="text-foreground"
          variant="yellow"
          size="yellow"
          onClick={() => scrollTo("signUp")}
        >
          Sign Up
        </Button>
      </div>
    </section>
  );
};
