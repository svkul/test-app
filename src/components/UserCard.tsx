import Image from "next/image";

export const UserCard = () => {
  return (
    <div className="flex flex-col gap-[20px] bg-user-card-background p-[20px] rounded-[16px] w-full text-center">
      <Image src="/Logo.svg" alt="logo" width={70} height={70} />

      <p className="p1 truncate">
        Salvador Stewart Flynn Thomas Salva Salvedsd
      </p>

      <div>
        <p className="p1 truncate">Frontend Developer Frontend</p>

        <p className="p1 truncate">frontend_developer@gmail.com</p>

        <p className="p1 truncate">+38 (098) 278 44 24</p>
      </div>
    </div>
  );
};
