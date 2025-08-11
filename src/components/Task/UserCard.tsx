import { useEffect, useState } from "react";

type APIUser = {
  name: { first: string; last: string };
  dob: { age: number };
};

export default function GetData() {
  const [users, setUsers] = useState<APIUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";

    const getData = async () => {
      try {
        let response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch");
        let data = await response.json();
        setUsers(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) return <h1>Loading Data ....</h1>;
  if (error) return <h2 className="text-red-500">{error}</h2>;

  return (
    <div className="flex flex-wrap gap-4">
      {users.map((u, i) => (
        <UserCard
          key={i}
          name={`${u.name.first} ${u.name.last}`}
          age={u.dob.age}
          isOnline={i % 2 === 0} // fake online status
        />
      ))}
    </div>
  );
}

type UserProps = {
  name: string;
  age: number;
  isOnline: boolean;
};

function UserCard({ name, age, isOnline }: UserProps) {
  return (
    <div className="bg-amber-300 p-4 w-64 rounded-2xl flex items-center gap-4 shadow-lg">
      <span
        className={`rounded-full h-5 w-5 ${isOnline ? "bg-green-700" : "bg-red-700"}`}
      ></span>
      <div>
        <h2 className="font-bold text-lg">{name}</h2>
        <p>Age: {age}</p>
        <p>{isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
}
