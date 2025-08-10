import { HeroSection } from "@/components/hero-section/HeroSection";
import { UsersSection } from "@/components/user-section/UsersSection";
import { SignUpSection } from "@/components/sign-up-section/SignUpSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <UsersSection />
      <SignUpSection />
    </>
  );
}
