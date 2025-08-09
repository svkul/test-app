import { useState } from "react";
import Image from "next/image";

import { type User } from "@/types";

export const UserCard = ({ photo, name, position, email, phone }: User) => {
  const [imgSrc, setImgSrc] = useState(photo || "/cover.svg");

  return (
    <div className="flex flex-col bg-user-card-background p-[20px] rounded-[10px] w-full text-center">
      <div className="m-auto rounded-[50%] overflow-hidden">
        <Image
          src={imgSrc}
          alt={name ?? "user image"}
          width={70}
          height={70}
          onError={() => {
            setImgSrc("/cover.svg");
          }}
        />
      </div>

      {name && <p className="p1 truncate mt-[20px]">{name}</p>}

      <div className="mt-[18px]">
        {position && <p className="p1 truncate">{position}</p>}

        {email && <p className="p1 truncate">{email}</p>}

        {phone && <p className="p1 truncate">{phone}</p>}
      </div>
    </div>
  );
};
