import React from "react";

interface Props {
  searchVal: string;
  onSearchChange: (val: string) => void;
  onButton: () => void;
}

function SearchBar({ searchVal, onSearchChange, onButton }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={searchVal}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Search users..."
      />
      <button
        onClick={onButton}
        className="bg-blue-200 p-2 rounded-2xl cursor-pointer hover:bg-red-500"
      >
        Clear
      </button>
    </div>
  );
}

export default SearchBar;
