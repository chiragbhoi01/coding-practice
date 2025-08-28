import React, { useState, useMemo, useEffect } from "react";

type TodosField = {
  task: string;
  completed: boolean;
  id: number;
};

function TodoApp() {
  const [loading, setLoading] = useState<boolean>(true);
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodosField[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addTodo = () => {
    const trimmedTask = todo.trim();

    if (!trimmedTask || todos.some((t) => t.task.toLowerCase() === trimmedTask.toLowerCase())) {
      setError("Please enter a valid and unique task");
      return;
    }

    if (editId !== null) {
      setTodos((prev) =>
        prev.map((t) =>
          t.id === editId ? { ...t, task: trimmedTask } : t
        )
      );
      setEditId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        { task: trimmedTask, completed: false, id: Date.now() },
      ]);
    }
    setTodo("");
    setError(null);
  };

  const removeTodo = (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const startEditTodo = (id: number) => {
    const todoToEdit = todos.find((t) => t.id === id);
    if (!todoToEdit) return;
    setTodo(todoToEdit.task);
    setEditId(id);
    setError(null);
  };

  const toggleCompleted = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => a.task.localeCompare(b.task));
  }, [todos]);

  if (loading) {
    return (
      <h1 className="text-3xl font-bold text-center mt-10 text-blue-600">
        Loading... Todo App
      </h1>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-10 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Todo App
      </h1>
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add your task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>
      {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
      <ul className="divide-y divide-gray-200">
        {sortedTodos.map(({ id, task, completed }) => (
          <li key={id} className="flex justify-between items-center py-2">
            <span className={`flex-grow text-gray-900 font-medium ${completed ? "line-through text-gray-400" : ""}`}>
              {task}
            </span>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompleted(id)}
              className="ml-4 cursor-pointer"
            />
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => removeTodo(id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => startEditTodo(id)}
                className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
