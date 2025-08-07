import { Button } from "./ui/button";
import { UserCard } from "./UserCard";

export const UsersSection = () => {
  return (
    <section
      id="users"
      className="container mx-auto flex flex-col items-center justify-center py-[70px]"
    >
      <h2 className="h1 mb-[50px]">Working with GET request</h2>

      <div className="mb-[50px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px] justify-items-center">
        {Array.from({ length: 6 }).map((_, i) => (
          <UserCard key={i} />
        ))}
      </div>

      <Button className="text-foreground" variant="yellow" size="yellow">
        Show more
      </Button>
    </section>
  );
};
