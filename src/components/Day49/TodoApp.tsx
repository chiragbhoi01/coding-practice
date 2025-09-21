import { useEffect, useState } from "react";

type TODOS = {
  task: string;
  id: number;
  completed: boolean;
};

export default function TodoApp() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);
  const [editId, setEditId] = useState<null | number>(null);
  const [editTodo, setEditTodo] = useState<string>("");

  const addTodo = () => {
    const trimmedTodo = todo.trim();
    if (!trimmedTodo || todos.some((t) => t.task === trimmedTodo)) return;
    const newTodo: TODOS = {
      id: Math.random(),
      task: trimmedTodo,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (editId === id) {
      setEditId(null);
      setEditTodo("");
    }
  };

  const toggle = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (id: number, currentTask: string) => {
    setEditId(id);
    setEditTodo(currentTask);
  };

  const saveEdit = () => {
    if (editTodo.trim() === "") return;
    if (todos.some((t) => t.task === editTodo.trim() && t.id !== editId))
      return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === editId ? { ...todo, task: editTodo.trim() } : todo
      )
    );
    setEditId(null);
    setEditTodo("");
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditTodo("");
  };
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Todo App
      </h1>
      <div className="flex mb-6">
        {editId === null ? (
          <>
            <input
              type="text"
              placeholder="Add your task..."
              onChange={(e) => setTodo(e.target.value)}
              value={todo}
              className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Edit your task..."
              onChange={(e) => setEditTodo(e.target.value)}
              value={editTodo}
              className="flex-grow p-3 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={saveEdit}
              className="bg-green-600 text-white px-4 hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 ml-2 rounded-r hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
      <div>
        {todos.length === 0 ? (
          <h2 className="text-center text-gray-500">Add Your Task</h2>
        ) : (
          todos.map(({ task, id, completed }) => (
            <div
              key={id}
              className="flex items-center justify-between mb-3 p-3 border border-gray-200 rounded"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggle(id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span
                  className={
                    completed ? "line-through text-gray-400" : "text-gray-800"
                  }
                >
                  {task}
                </span>
              </label>

              <div className="space-x-2">
                <button
                  onClick={() => startEdit(id, task)}
                  className="text-yellow-600 hover:text-yellow-800 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => removeTodo(id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
