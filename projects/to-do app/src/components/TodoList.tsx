// TodoList.tsx
import Button from "./Button";

type Todo = {
  id: string | number;
  task: string;
  completed: boolean;
};

type TodoListProps = {
  todos: Todo[];
  toggle: (id: string | number) => void;
  editTodo: (id: string | number, task: string) => void;
  removeTodo: (id: string | number) => void;
};

export default function TodoList({ todos, toggle, editTodo, removeTodo }: TodoListProps) {
  return (
    <ul className="space-y-4">
      {todos.map(({ task, completed, id }) => (
        <li
          key={id}
          className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm"
        >
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggle(id)}
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span
              className={`text-lg ${
                completed ? "line-through text-gray-400" : "text-gray-800"
              }`}
            >
              {task}
            </span>
          </label>
          <div className="space-x-2">
            <Button
              onClick={() => editTodo(id, task)}
              className="bg-yellow-400 hover:bg-yellow-500"
            >
              Edit
            </Button>
            <Button
              onClick={() => removeTodo(id)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
