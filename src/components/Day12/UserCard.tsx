import { useEffect, useMemo, useState } from "react";

interface UserType {
  name: { first: string; last: string };
  email: string;
  picture: { large: string };
}

function UserCard() {
  const [user, setUser] = useState<UserType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";
    const fetchUser = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUser(data.results);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const searchUsers = useMemo(() => {
    return user.filter((people) => {
      const first = people.name.first
        .toLowerCase()
        .includes(search.toLowerCase());
      const last = people.name.last
        .toLowerCase()
        .includes(search.toLowerCase());
      return first || last;
    });
  }, [search, user]);

  if (error) return <h1 className="text-red-400">{error}</h1>;

  return (
    <div>
      <input
        type="text"
        placeholder="Search user"
        className="bg-blue-200 rounded-3xl p-2 placeholder:text-gray-600"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {searchUsers.map((person, idx) => (
            <Card
              key={`${person.name.first}-${idx}`}
              name={`${person.name.first} ${person.name.last}`}
              email={person.email}
              image={person.picture.large}
              isOnline={idx % 2 === 0}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default UserCard;

type CardProps = {
  image: string;
  name: string;
  email: string;
  isOnline: boolean;
};

function Card({ image, email, name, isOnline }: CardProps) {
  return (
    <div className="bg-orange-300 p-4 rounded-2xl flex items-center gap-4 my-2">
      <img src={image} alt={name} className="w-16 h-16 rounded-full" />
      <div>
        <div>Name: {name}</div>
        <div>Email: {email}</div>
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full h-4 w-4 ${
              isOnline ? "bg-green-800" : "bg-red-800"
            }`}
          ></span>
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
      </div>
    </div>
  );
}
