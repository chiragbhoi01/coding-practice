import React from "react";

type SearchType = {
  onSearchChange: (val: string) => void;
  getSortData: (val: string) => void;
  value: string;
  onButtonChange: () => void;
  selectValue:string
};

function SearchBar({
  onSearchChange,
  value,
  onButtonChange,
  getSortData,
  selectValue,
}: SearchType) {
  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Search users..."
        onChange={(e) => onSearchChange(e.target.value)}
        value={value}
        className="border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
      />

      <button
        onClick={onButtonChange}
        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
      >
        Clear Filter
      </button>

      <select
        onChange={(e) => getSortData(e.target.value)}
        value={selectValue}
        className="border px-3 py-2 rounded-lg shadow-sm"
      >
        <option value="All">All</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>
    </div>
  );
}

export default SearchBar;
