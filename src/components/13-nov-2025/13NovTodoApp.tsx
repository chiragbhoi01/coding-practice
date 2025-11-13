import React, { useEffect, useState } from "react";

interface TODOS {
  todo: string;
  id: number;
  completed: boolean;
  date: string;
}

function TodoAppNov() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);
  const addTodo = () => {
    const trimTodo = todo.trim();
    if (!trimTodo || todos.some((t) => t.todo === trimTodo))
      return alert("Please Add Valid Todo");
    const newTodo: TODOS = {
      id: Math.random(),
      todo: trimTodo,
      completed: false,
      date: "no add date",
    };
    setTodos((prevTodo) => [...prevTodo, newTodo]);
    setTodo("");
    console.log(todos);

  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id))
  }
  const toggle = (id: number) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="please add your task"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {
          todos.length === 0 ? <h2>PLease Add Some Todod</h2> : (
            <>
              {todos.map(({ id, todo, completed }) => (
                <div key={id}>
                  <li>
                    <strong>{todo}</strong>
                    <input type="checkbox" onChange={() => toggle(id)} />
                    <button onClick={() => removeTodo(id)}>Remove Todo</button>
                    <button>Edit Todo</button>
                  </li>
                </div>
              ))}
            </>
          )
        }
      </div>
    </div>
  );
}

export default TodoAppNov;
