import { UseMutateFunction } from "@tanstack/react-query";

import { type UsersResponse, type Position } from "@/types";
import { SignUpForm } from "./SignUpForm";

interface SignUpSectionProps {
  isToken: boolean;
  positions: Position[];
  countVal: number;
  loadUsers: UseMutateFunction<
    UsersResponse,
    Error,
    {
      count: number;
    },
    unknown
  >;
}

export const SignUpSection = ({
  isToken,
  positions,
  countVal,
  loadUsers,
}: SignUpSectionProps) => {
  return (
    <section
      id="signUp"
      className="flex flex-col items-center justify-center py-[70px] mb-[30px]"
    >
      <h2 className="h1 mb-[50px] text-center">Working with POST request</h2>

      <SignUpForm
        isToken={isToken}
        positions={positions}
        countVal={countVal}
        loadUsers={loadUsers}
      />
    </section>
  );
};
