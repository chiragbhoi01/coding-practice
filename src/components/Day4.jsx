import { useState, useEffect } from 'react';

export default function Day4() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() === '') return;
    setTodos([{ text: todo.trim(), completed: false }, ...todos]);
    setTodo('');
  };

  const removeTodo = (index) => {
    const updatedTodos = todos.filter((_, idx) => idx !== index);
    setTodos(updatedTodos);
  };

  const toggleCheck = (index) => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Todo App Day 4</h1>
      <div>
        Add Your Todo:
        <input
          type="text"
          placeholder="Add task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <br />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {todos.length === 0 ? (
        <h2>Please Add Tasks</h2>
      ) : (
        <>
          <h2>Todos List (total: {todos.length})</h2>
          {todos.map((todoList, index) => (
            <div key={index}>
              <ul>
                <li
                  style={{
                    textDecoration: todoList.completed ? 'line-through' : 'none',
                  }}
                >
                  {todoList.text}
                </li>
                <input
                  type="checkbox"
                  checked={todoList.completed}
                  onChange={() => toggleCheck(index)}
                />
              </ul>
              <button onClick={() => removeTodo(index)}>❌</button>
            </div>
          ))}
        </>
      )}
    </>
  );
}
