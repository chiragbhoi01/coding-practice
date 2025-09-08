// TodoApp.tsx
import { useState, useEffect } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import FilterTodo from "./FilterTodo";

type Todo = {
  id: string | number;
  task: string;
  completed: boolean;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [todo, setTodo] = useState<string>("");
  const [todoIdx, setTodoIdx] = useState<null | string | number>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    const trimmedTodo = todo.trim();
    if (trimmedTodo === "" || todos.some((t) => t.task === trimmedTodo)) return;
    const newTodo: Todo = {
      id: Math.random(),
      task: trimmedTodo,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setTodo("");
  };

  const removeTodo = (id: number | string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id: number | string, task: string) => {
    setTodoIdx(id);
    setTodo(task);
  };

  const saveTodo = () => {
    if (todoIdx === null) return;
    const trimmedTodo = todo.trim();
    if (trimmedTodo === "") return;

    setTodos((prev) =>
      prev.map((t) => (t.id === todoIdx ? { ...t, task: trimmedTodo } : t))
    );
    setTodoIdx(null);
    setTodo("");
  };

  const toggle = (id: number | string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Todo App
      </h1>

      <TodoInput
        todo={todo}
        setTodo={setTodo}
        addTodo={addTodo}
        saveTodo={saveTodo}
        todoIdx={todoIdx}
      />

      {todos.length === 0 ? (
        <h1 className="text-center font-semibold text-lg p-8 text-gray-500">
          Add Your Task
        </h1>
      ) : (
        <FilterTodo todos={todos} onFiltered={setFilteredTodos} />
      )}

      <TodoList
        todos={filteredTodos}
        toggle={toggle}
        editTodo={editTodo}
        removeTodo={removeTodo}
      />
    </div>
  );
}
