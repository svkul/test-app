import { SignUpForm } from "./SignUpForm";

export const SignUpSection = () => {
  return (
    <section
      id="signUp"
      className="container mx-auto flex flex-col items-center justify-center py-[70px] mb-[30px]"
    >
      <h2 className="h1 mb-[50px]">Working with POST request</h2>

      <SignUpForm />
    </section>
  );
};
