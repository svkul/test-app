import { UserCards } from "./UserCards";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const count = process.env.NEXT_PUBLIC_USER_PER_PAGE
  ? Number(process.env.NEXT_PUBLIC_USER_PER_PAGE)
  : 6;

export const UsersSection = async () => {
  let usersResponse = null;
  let error = null;

  try {
    const res = await fetch(`${baseUrl}/api/users?count=${count}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    usersResponse = await res.json();
  } catch (e) {
    error = e instanceof Error ? e.message : "Unknown error";
  }

  return (
    <section
      id="users"
      className="container mx-auto flex flex-col items-center justify-center py-[70px]"
    >
      <h2 className="h1 mb-[50px] text-center">Working with GET request</h2>

      {error || !usersResponse?.success ? (
        <p>Something went wrong :(</p>
      ) : (
        <UserCards {...usersResponse} />
      )}
    </section>
  );
};
