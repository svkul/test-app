import Image from "next/image";
import { cookies } from "next/headers";

import { Action } from "./Action";

export const HeroSection = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <section className="mx-auto relative min-h-[500px] lg:min-h-[650px] max-w-[1170px] flex items-center justify-center overflow-hidden mb-[70px]">
      <Image
        src="/hero.jpeg"
        alt="Hero background"
        fill
        className="object-cover object-center z-0"
        priority
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-10 text-center text-white flex flex-col items-center flex-1 max-w-[320px] sm:max-w-[380px]">
        <h1 className="h1 mb-[21px] -mt-[25px] sm:mt-[0px]">
          Test assignment for front-end developer
        </h1>

        <p className="p1 mb-[32px]">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they&apos;ll be building web interfaces with accessibility
          in mind. They should also be excited to learn, as the world of
          Front-End Development keeps evolving.
        </p>

        <Action isToken={Boolean(token)} />
      </div>
    </section>
  );
};
