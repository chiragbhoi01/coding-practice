// FilterTodo.tsx
import { useCallback, useState, useEffect } from "react";

type Todo = {
  id: string | number;
  task: string;
  completed: boolean;
};

type FilterProps = {
  todos?: Todo[];
  onFiltered: (filteredTodos: Todo[]) => void;
};

export default function FilterTodo({ todos = [], onFiltered }: FilterProps) {
  const [filter, setFilter] = useState<string>("A-Z");

  const filterTodos = useCallback(() => {
    let filtered = [...todos];

    switch (filter) {
      case "A-Z":
        filtered.sort((a, b) => a.task.localeCompare(b.task));
        break;
      case "Z-A":
        filtered.sort((a, b) => b.task.localeCompare(a.task));
        break;
      case "Completed":
        filtered = filtered.filter((t) => t.completed);
        break;
      case "Pending":
        filtered = filtered.filter((t) => !t.completed);
        break;
    }

    onFiltered(filtered);
  }, [filter, todos, onFiltered]);

  useEffect(() => {
    filterTodos();
  }, [filter, todos, filterTodos]);

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="px-3 py-2 border rounded mb-4"
      >
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Completed">Completed</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
  );
}
