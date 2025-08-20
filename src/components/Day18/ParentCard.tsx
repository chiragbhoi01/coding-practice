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

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=100");
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

  // ✅ Search filter
  const filterUser = useMemo(() => {
    const query = search.toLowerCase();
    return users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const email = user.email.toLowerCase();
      return fullName.includes(query) || email.includes(query);
    });
  }, [users, search]);

  // ✅ Sorting logic
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
      sorted = sorted.filter((user) => user.gender === "male"); // mock
    } else if (sort === "Offline") {
      sorted = sorted.filter((user) => user.gender === "female"); // mock
    }

    return sorted;
  }, [filterUser, sort]);

  // ✅ Pagination
  const totalPages = Math.ceil(sorting.length / USERS_PER_PAGE);
  const start = (currentPage - 1) * USERS_PER_PAGE;
  const pageUsers = sorting.slice(start, start + USERS_PER_PAGE);

  // ✅ Pagination helpers
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  const jumpToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // ✅ Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, sort]);

  // ✅ Clear filters
  const clearFilter = () => {
    setSearch("");
    setSort("All");
  };

  // ✅ Ellipsis pagination logic
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);
    return pages;
  };

  const resultInfo = `Page ${currentPage} of ${totalPages} — showing ${pageUsers.length} of ${sorting.length} results`;

  if (error) return <h1 className="text-red-500 text-5xl">{error}</h1>;

  return (
    <>
      {/* 🔎 Search & Sort */}
      <SearchBar
        onButtonChange={clearFilter}
        onSearchChange={setSearch}
        value={search}
        getSortData={setSort}
        selectValue={sort}
      />

      {loading ? (
        <h1>Loading......</h1>
      ) : (
        <>
          {/* 🧑‍💻 User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {pageUsers.map((user) => (
              <Card
                key={user.login.uuid}
                name={`${user.name.first} ${user.name.last}`}
                email={user.email}
                image={user.picture.medium}
                phone={user.phone}
                gender={user.gender}
                isOnline={user.gender === "male"}
              />
            ))}
          </div>

          {/* 📌 Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
              <button
                onClick={() => jumpToPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                {"<<"}
              </button>

              <button
                onClick={() => jumpToPage(currentPage - 2)}
                disabled={currentPage <= 2}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                -2
              </button>

              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>

              {/* Dynamic page numbers with ellipsis */}
              {getPageNumbers().map((num, idx) =>
                typeof num === "number" ? (
                  <button
                    key={idx}
                    onClick={() => jumpToPage(num)}
                    className={`px-3 py-1 rounded ${
                      num === currentPage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {num}
                  </button>
                ) : (
                  <span key={idx} className="px-3 py-1 text-gray-500">…</span>
                )
              )}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>

              <button
                onClick={() => jumpToPage(currentPage + 2)}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                +2
              </button>

              <button
                onClick={() => jumpToPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-300 disabled:opacity-50"
              >
                {">>"}
              </button>
            </div>
          )}

          <div className="text-xl font-bold text-gray-600 mt-2 text-center">
            {resultInfo}
          </div>
        </>
      )}
    </>
  );
}

export default ParentCard;
