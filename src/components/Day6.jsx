import React, { useEffect, useState } from 'react';

function Day6() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState("");

    // Load todos from localStorage when app starts
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (Array.isArray(storedTodos)) {
            setTodos(storedTodos);
        }
    }, []);

    // Save todos to localStorage when they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = () => {
        if (todo === "" || todos.some((t) => t.text === todo)) return;
        setTodos([{ text: todo, completed: false }, ...todos]);
        setTodo("");
    };

    const removeTodo = (index) => {
        const updatedTodos = todos.filter((_, idx) => idx !== index);
        setTodos(updatedTodos);
    };

    const editTodo = (index) => {
        setEditIndex(index);
        setEditText(todos[index].text);
    };

    const saveTodo = () => {
        const updatedTodos = todos.map((todo, idx) =>
            idx === editIndex ? { ...todo, text: editText } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditText("");
    };

    const toggleTodo = (index) => {
        setTodos(todos.map((todo, idx) =>
            idx === index ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    return (
        <>
            <div className='bg-blue-100 flex justify-center text-2xl py-20 min-h-screen'>
                <div>
                    <h1 className='font-bold text-center mb-5'>Todo App</h1>
                    <div className='my-10'>
                        <InputField
                            type="text"
                            placeholder='Add Your Task...'
                            className='rounded-xl border-2 text-xl p-3'
                            value={todo}
                            event={(e) => setTodo(e.target.value)}
                        />
                        <button
                            className='rounded-xl ml-5 bg-red-200 px-5 py-3 hover:bg-red-400'
                            onClick={addTodo}
                        >
                            Add Task
                        </button>
                    </div>

                    {todos.length > 0 && (
                        <ul className='space-y-4'>
                            {todos.map((item, index) => (
                                <li key={index} className='flex items-center space-x-4'>
                                    {editIndex === index ? (
                                        <>
                                            <InputField
                                                value={editText}
                                                event={(e) => setEditText(e.target.value)}
                                            />
                                            <button onClick={saveTodo} className='text-green-700 text-xl'>✅</button>
                                        </>
                                    ) : (
                                        <>
                                            <span
                                                className={`text-xl ${item.completed ? "line-through text-red-500" : ""}`}
                                            >
                                                {item.text}
                                            </span>
                                            <input
                                                type="checkbox"
                                                onChange={() => toggleTodo(index)}
                                                checked={item.completed}
                                            />
                                            <button onClick={() => editTodo(index)} className='text-blue-500 text-xl'>✏️</button>
                                            <button onClick={() => removeTodo(index)} className='text-red-600 text-xl'>🗑️</button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}

export default Day6;

// Reusable Input component
const InputField = ({
    type = "text",
    value,
    className,
    event,
    ...props
}) => {
    return (
        <input
            type={type}
            value={value}
            className={`${className} text-xl border px-3 py-2 rounded-lg`}
            onChange={event}
            {...props}
        />
    );
};
