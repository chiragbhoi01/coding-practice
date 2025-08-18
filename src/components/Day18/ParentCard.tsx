import { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import Card from "./Card";

interface UserInterface {
  name: { first: string; last: string };
  email: string;
  gender: string;
  phone: string;
  picture: { medium: string };
  login: { uuid: string }; 
}

function ParentCard() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("All");

  const sortData = (val: string) => {
    setSort(val);
  };

  useEffect(() => {
    const url = "https://randomuser.me/api/?results=10";

    const fetchUsers = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const newUsers = Array.isArray(data.results)
          ? data.results
          : [data.results];
        setUsers(newUsers);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const searchValue = (getSearchValue: string) => {
    setSearch(getSearchValue);
  };

  // 🔎 search filter
  const filterUser = useMemo(() => {
    return users.filter((user) => {
      const toSmall = search.toLowerCase();
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      return (
        fullName.includes(toSmall) || user.email.toLowerCase().includes(toSmall)
      );
    });
  }, [users, search]);

  // 🔽 sorting logic
  const sorting = useMemo(() => {
    let sorted = [...filterUser];

    if (sort === "A-Z") {
      sorted.sort((a, b) =>
        a.name.first.localeCompare(b.name.first, "en", { sensitivity: "base" })
      );
    } else if (sort === "Z-A") {
      sorted.sort((a, b) =>
        b.name.first.localeCompare(a.name.first, "en", { sensitivity: "base" })
      );
    } else if (sort === "Online") {
      sorted = sorted.filter((user) => user.gender === "male");
    } else if (sort === "Offline") {
      sorted = sorted.filter((user) => user.gender === "female");
    }

    return sorted;
  }, [filterUser, sort]);

  const clearFilter = () => {
    setSearch("");
    setSort("All");
  };

  if (error) return <h1 className="text-red-500 text-5xl">{error}</h1>;

  return (
    <>
      <SearchBar
        onButtonChange={clearFilter}
        onSearchChange={searchValue}
        value={search}
        getSortData={sortData}
        selectValue={sort}
      />

      {loading ? (
        <h1>Loading......</h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sorting.map((user) => (
            <Card
              key={user.login.uuid}
              name={`${user.name.first} ${user.name.last}`}
              email={user.email}
              image={user.picture.medium}
              phone={user.phone}
              gender={user.gender}
              isOnline={user.gender === "male"} // ✅ mock online/offline
            />
          ))}
        </div>
      )}
    </>
  );
}

export default ParentCard;
