import { useState } from "react";
type TODOS = {
  task: string;
  id: number;
  completed: boolean;
  date: string;
};

export default function Todo53() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);
  const [editTodo, setEditTodo] = useState<string>("");
  const [getIdx, setGetIdx] = useState<null | number>(null);

  const getDate = () => {
    return new Date().toLocaleString();
  };

  const addTodo = () => {
    let trimTodo = todo.trim();
    if (!trimTodo || todos.some((t) => t.task === trimTodo)) {
      alert(trimTodo ? "Task already exists" : "Please fill in the task field");
      return;
    }
    const newTodo: TODOS = {
      id: Date.now(),
      task: trimTodo,
      completed: false,
      date: getDate(),
    };
    setTodos((prevTodo) => [...prevTodo, newTodo]);
    setTodo("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
    if (getIdx === id) {
      setGetIdx(null);
      setEditTodo("");
    }
  };

  const toggle = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const editTodos = (id: number, task: string) => {
    setGetIdx(id);
    setEditTodo(task);
  };

  const saveEdit = (id: number) => {
    const trimmed = editTodo.trim();
    if (
      !trimmed ||
      todos.some((t) => t.task === trimmed && t.id !== id)
    ) {
      alert(trimmed ? "Task already exists" : "Please fill in the task field");
      return;
    }
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, task: trimmed } : t
      )
    );
    setGetIdx(null);
    setEditTodo("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-6">
        Todo App Day 53 "02-Oct-2025"
      </h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="add task..."
          className="border border-gray-300 rounded px-3 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>
      <div>
        {todos.length === 0 ? (
          <h1 className="text-center text-gray-400 mb-4">
            please add some todos
          </h1>
        ) : (
          <div>
            {todos.map(({ task, id, completed, date }) => (
              <div
                key={id}
                className={`flex items-center gap-3 mb-3 border-b pb-2 ${completed ? "bg-green-100" : ""}`}
              >
                {getIdx === id ? (
                  <>
                    <input
                      type="text"
                      value={editTodo}
                      onChange={(e) => setEditTodo(e.target.value)}
                      className="border px-2 py-1 rounded w-2/3"
                    />
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => saveEdit(id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                      onClick={() => {
                        setGetIdx(null);
                        setEditTodo("");
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <strong className={`w-1/3 ${completed ? "line-through text-gray-500" : ""}`}>
                      {task}
                    </strong>
                    <span className="text-xs text-gray-500 w-1/3">{date}</span>
                    <input
                      type="checkbox"
                      checked={completed}
                      onChange={() => toggle(id)}
                      className="h-4 w-4 accent-blue-500"
                    />
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeTodo(id)}
                    >
                      removeTodo
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                      onClick={() => editTodos(id, task)}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
