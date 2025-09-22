interface SearchInputProps {
  searchValue: (value: string) => void;
  search: string;
}
export default function SearchInput({ searchValue, search }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search your task"
      onChange={(e) => searchValue(e.target.value)}
      value={search}
      className="mb-4 p-2 border rounded w-full"
    />
  );
}
