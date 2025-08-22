import { useState } from "react";

// Type definition for a single to-do item
type Todos = {
  id: number;
  todo: string;
  completed: boolean;
};

function MakeTodo() {
  // State to hold the current to-do item being entered in the input field
  const [todo, setTodo] = useState<string>("");

  // State to hold the array of all to-do items
  const [todos, setTodos] = useState<Todos[]>([]);

  // State to store the ID of the to-do item being edited, or null if no item is being edited
  const [editId, setEditId] = useState<number | null>(null);

  // State to store the edited text of a to-do item
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  // Function to add a new to-do item
  const addTodo = () => {
    const trimmedTodo = todo.trim(); // Remove leading/trailing whitespace

    // Prevent adding empty or duplicate to-dos
    if (trimmedTodo === "" || todos.some((t) => t.todo === trimmedTodo)) {
      setTodo(""); // Clear the input field even if it's a duplicate
      return;
    }

    // Add the new to-do to the 'todos' array
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), todo: trimmedTodo, completed: false }, // Use Date.now() for unique ID
    ]);

    setTodo(""); // Clear the input field
  };

  // Function to delete a to-do item
  const deleteTodo = (id: number) => {
    // Filter out the to-do item with the matching ID
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  // Function to toggle the completion status of a to-do item
  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Function to start editing a to-do item
  const startEdit = (id: number, text: string) => {
    setEditId(id); // Set the ID of the item being edited
    setEditedTodoText(text); // Set the initial text for editing
  };

  // Function to save the edited to-do item
  const saveEdit = (id: number) => {
    const trimmedEditedText = editedTodoText.trim();

    // Prevent saving empty or duplicate to-do text
    if (
      trimmedEditedText === "" ||
      todos.some((t) => t.todo === trimmedEditedText && t.id !== id)
    ) {
      setEditedTodoText(""); // Clear the input field
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, todo: trimmedEditedText } : t
      )
    );
    setEditId(null); // Exit editing mode
    setEditedTodoText(""); // Clear the edited text
  };

  return (
    <div>
      <h1>My To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder="Add Todo...."
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {editId === t.id ? (
              <>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                />
                <button onClick={() => saveEdit(t.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(t.id)}
                />
                <span
                  style={{
                    // This style remains to apply line-through for completed items, as it's functional
                    textDecoration: t.completed ? "line-through" : "none",
                  }}
                >
                  {t.todo}
                </span>
                <button onClick={() => startEdit(t.id, t.todo)}>Edit</button>
                <button onClick={() => deleteTodo(t.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MakeTodo;
