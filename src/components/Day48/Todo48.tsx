import { useState } from "react";

type TODOS = {
  id: number;
  task: string;
  completed: boolean;
};
function Todo48() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TODOS[]>([]);

  const addTodo = () => {
    if (!todo || todos.some((t) => t.task === todo))
      return alert("fill correct task");
    const newTodo: TODOS = { id: Math.random(), task: todo, completed: false };
    setTodos((prevTodo) => [...prevTodo, newTodo]);
    setTodo("");
  };
  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };
  const toggle = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="add your add"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Add Task</button>
      </div>
      <div>
        {todos.length <= 0 ? (
          <h1>Please Add Your Todo</h1>
        ) : (
          todos.map(({ task, id }) => (
            <div key={id}>
              <strong>{task}</strong>
              <input type="checkbox" />
              <button onClick={() => removeTodo(id)}>Remove Todo</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Todo48;
