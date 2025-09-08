import React, { useState } from "react";

type Todos = {
  todo: string;
  id: number | string;
  compeleted: boolean;
  date: string;
};

function Todo() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);

  const getDate = () => {
    return new Date().toLocaleString();  // Fixed date formatting
  };

  const addTodo = () => {
    if (!todo || todos.some((t) => t.todo === todo)) return;
    const newTodo: Todos = {
      id: Math.random(),
      todo: todo,
      compeleted: false,
      date: getDate(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodo("");
  };

  // Fixed function type signature
  const removeTodo = (id: number | string) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  // Optional: Toggle complete status
  const toggleCompleted = (id: number | string) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, compeleted: !t.compeleted } : t
      )
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="add task..."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Add task</button>
      </div>
      <div>
        {todos.map(({ id, compeleted, date, todo }) => (
          <div key={id}>
            <li>
              {todo} <span>({date})</span>
              <span>
                <input
                  type="checkbox"
                  checked={compeleted}
                  onChange={() => toggleCompleted(id)}
                />
              </span>
              <button onClick={() => removeTodo(id)}>remove todo</button>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todo;
