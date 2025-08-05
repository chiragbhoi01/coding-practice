import { useState } from "react";

type TodoType = {
  id: number;
  task: string;
  completed: boolean;
  time: string;
  dates: string;
};

export default function Day8() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editTodo, setEditTodo] = useState<string>("");
  const [getIndex, setGetIndex] = useState<number | null>(null);

  const getTime = () =>
    new Date().toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  const getDate = () =>
    new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

  const addTodo = () => {
    if (todo === "" || todos.some((t) => t.task === todo)) return;

    setTodos([
      {
        id: Date.now(),
        task: todo,
        completed: false,
        time: getTime(),
        dates: getDate(),
      },
      ...todos,
    ]);
    setTodo("");
  };

  const removeTodo = (id: number) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodo);
  };

  const checkMarkTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const todoEdit = (id: number) => {
    const taskToEdit = todos.find((t) => t.id === id);
    if (taskToEdit) {
      setGetIndex(id);
      setEditTodo(taskToEdit.task);
    }
  };

  const saveTodo = (id: number) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id
        ? { ...todo, task: editTodo, time: getTime(), dates: getDate() }
        : todo
    );
    setTodos(updatedTodo);
    setGetIndex(null);
    setEditTodo("");
  };
  const handleSort = (e) => {
    const value = e.target.value;
    let sortedTodos = [...todos]; // clone original to avoid mutation

    if (value === "A to Z") {
      sortedTodos.sort((a, b) => a.task.localeCompare(b.task));
    } else if (value === "Date") {
      sortedTodos.sort((a, b) => a.dates.localeCompare(b.dates));
    } else if (value === "Time") {
      sortedTodos.sort((a, b) => a.time.localeCompare(b.time));
    }

    setTodos(sortedTodos);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
  <div className="bg-white rounded-xl shadow-lg p-6">
    <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">
      📝 Todo App
    </h1>

    {/* Add Todo */}
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        type="text"
        placeholder="Add your task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={addTodo}
        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
      >
        ➕ Add Todo
      </button>
    </div>

    {/* Sort */}
    {todos.length > 0 && (
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Todo List</h2>
        <select
          onChange={handleSort}
          className="p-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="filter">🔽 Sort by</option>
          <option value="Date">📅 Date</option>
          <option value="Time">⏰ Time</option>
          <option value="A to Z">🔤 A to Z</option>
        </select>
      </div>
    )}

    {/* Todo List */}
    {todos.length === 0 ? (
      <p className="text-center text-lg text-red-500">No Todos Added Yet</p>
    ) : (
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md transition hover:shadow-lg"
          >
            {getIndex === todo.id ? (
              <>
                <input
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="w-full p-2 mb-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                  onClick={() => saveTodo(todo.id)}
                  className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 rounded-md"
                >
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-lg font-medium ${
                      todo.completed ? "line-through text-red-500" : "text-gray-800"
                    }`}
                  >
                    {todo.task}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => checkMarkTodo(todo.id)}
                      className="bg-yellow-400 hover:bg-yellow-300 text-white px-2 py-1 rounded-md"
                    >
                      {todo.completed ? "❌ Uncheck" : "✔️ Check"}
                    </button>
                    <button
                      onClick={() => todoEdit(todo.id)}
                      className="bg-blue-400 hover:bg-blue-300 text-white px-2 py-1 rounded-md"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => removeTodo(todo.id)}
                      className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-md"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  ⏰ {todo.time} | 📅 {todo.dates}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
</main>

  );
}
