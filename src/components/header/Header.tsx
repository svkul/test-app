import Image from "next/image";
import { cookies } from "next/headers";

import { Navigation } from "./Navigation";

export const Header = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return (
    <header className="pt-[13px] pb-[12px] bg-header-background">
      <div className="container mx-auto flex justify-between items-center ">
        <Image src="/Logo.svg" alt="logo" width={104} height={26} />

        <Navigation isToken={Boolean(token)} />
      </div>
    </header>
  );
};
