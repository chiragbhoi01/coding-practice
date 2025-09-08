// TodoInput.tsx
import Button from "./Button";

type TodoInputProps = {
  todo: string;
  setTodo: (val: string) => void;
  addTodo: () => void;
  saveTodo: () => void;
  todoIdx: string | number | null;
};

export default function TodoInput({ todo, setTodo, addTodo, saveTodo, todoIdx }: TodoInputProps) {
  return (
    <div className="flex space-x-4 mb-6">
      <input
        type="text"
        placeholder="Add your task..."
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <Button
        onClick={todoIdx === null ? addTodo : saveTodo}
        className="bg-indigo-600 hover:bg-indigo-700 font-semibold"
      >
        {todoIdx === null ? "Add Task" : "Save"}
      </Button>
    </div>
  );
}
