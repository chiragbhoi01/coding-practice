import React, { useEffect, useState, useMemo } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";

interface UserInterface {
  name: { first: string; last: string };
  gender: string;
  email: string;
  phone: string;
  picture: { large: string };
  location: { postcode: number | string };
}

function UserCard() {
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<"A-Z" | "Z-A" | "Online" | "Offline">("A-Z");

  // child → parent
  const getSearchValue = (searchValue: string) => {
    setSearch(searchValue);
  };

  // fetch data on mount
  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setUsers(Array.isArray(data.results) ? data.results : [data.results]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return fullName.includes(search.toLowerCase());
    });
  }, [users, search]);

  // Sorted users
  const sortedUsers = useMemo(() => {
    let sorted = [...filteredUsers];

    if (sortOrder === "A-Z") {
      sorted.sort((a, b) => a.name.first.localeCompare(b.name.first));
    } else if (sortOrder === "Z-A") {
      sorted.sort((a, b) => b.name.first.localeCompare(a.name.first));
    } else if (sortOrder === "Online") {
      sorted.sort((a, b) => Number(b.gender === "male") - Number(a.gender === "male"));
    } else if (sortOrder === "Offline") {
      sorted.sort((a, b) => Number(a.gender === "male") - Number(b.gender === "male"));
    }

    return sorted;
  }, [filteredUsers, sortOrder]);

  return (
    <>
      <SearchBar onSearchChange={getSearchValue} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as typeof sortOrder)}
            className="mb-4 border p-2 rounded"
          >
            <option value="A-Z">Sort A-Z</option>
            <option value="Z-A">Sort Z-A</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>

          {sortedUsers.map((user, idx) => (
            <Card
              key={idx}
              name={`${user.name.first} ${user.name.last}`}
              email={user.email}
              gender={user.gender}
              phone={user.phone}
              pincode={user.location.postcode}
              image={user.picture.large}
              isOnline={user.gender === "male"} // just a mock for now
            />
          ))}
        </>
      )}
    </>
  );
}

export default UserCard;
