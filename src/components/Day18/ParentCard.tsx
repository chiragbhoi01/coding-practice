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
  const [currentPage, setCurrentPage] = useState<number>(1);

  const USERS_PER_PAGE = 6;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=20");
        const data = await response.json();
        setUsers(data.results || []);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const searchValue = (val: string) => setSearch(val);
  const sortData = (val: string) => setSort(val);

  // 🔎 search filter
  const filterUser = useMemo(() => {
    return users.filter((user) => {
      const query = search.toLowerCase();
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase()
      const phone = user.phone.toLowerCase()
      return (
        fullName.includes(query) || email.includes(query)
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
      sorted = sorted.filter((user) => user.gender === "male"); // mock online
    } else if (sort === "Offline") {
      sorted = sorted.filter((user) => user.gender === "female"); // mock offline
    }

    return sorted;
  }, [filterUser, sort]);

  // ✅ Pagination slice
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const end = start + USERS_PER_PAGE;
  const pageUsers = sorting.slice(start, end);

  // ✅ Pagination handlers
  const handleNextPage = () => {
    if (currentPage < Math.ceil(sorting.length / USERS_PER_PAGE)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  // ✅ Reset page when search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  const clearFilter = () => {
    setSearch("");
    setSort("All");
  };

  const totalPages = Math.ceil(sorting.length / USERS_PER_PAGE);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
        <>
          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {pageUsers.map((user) => (
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

          {/* ✅ Pagination bar */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              {/* Previous */}
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {/* Page numbers */}
              {pageNumbers.map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`px-3 py-1 rounded ${
                    num === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ParentCard;
