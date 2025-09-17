import { useState } from "react";

type Todos = {
  id: number | string;
  task: string;
  completed: boolean;
};

function Day45() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todos[]>([]);

  const addTodo = () => {
    if (!todo || todos.some((t) => t.task === todo)) return;
    const newTodo: Todos = {
      task: todo,
      id: Math.random(),
      completed: false,
    };
    setTodos((prevTodo) => [...prevTodo, newTodo]);
    setTodo("");
  };
  const removeTodo = (id: number | string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleCheckBox = (id: string | number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div>
      <h1>Todo App Date 17 Revision</h1>
      <div>
        <input
          className="border-1 border-amber-900 rounded-2xl"
          type="text"
          placeholder="add task "
          value={todo}
          onChange={(e) => setTodo(e.target.value.trim())}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <div>
        {todos.length == 0 ? (
          <h1>Please Add Todod</h1>
        ) : (
          todos.map(({ task, id, completed }) => (
            <div key={id}>
              <li>{task}</li>
              <li>
                <input type="checkbox" onChange={() => toggleCheckBox(id)} />
              </li>
              <li>
                <button onClick={() => removeTodo(id)}>Remove todo</button>
              </li>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default Day45;
