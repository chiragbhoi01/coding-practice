interface FilterProps {
  onFilterChange: (filterValue: string) => void;
}
export default function FilterItem({ onFilterChange }: FilterProps) {
  return (
    <div className="mb-4">
      <select
        onChange={(e) => onFilterChange(e.target.value)}
        
        className="p-2 border rounded"
      >
        <option disabled>
          Select Filter
        </option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}
