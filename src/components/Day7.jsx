import { useState } from 'react';

export default function Day7() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');

    const addTodo = () => {
        if (todo === '' || todos.some((t) => t.text === todo)) return;

        const date = new Date().toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        setTodos([{ text: todo, completed: false, date }, ...todos]);
        setTodo('');
    };

    const deleteTodo = (index) => {
        const updatedTodos = todos.filter((_, idx) => idx !== index);
        setTodos(updatedTodos);
    };

    const editTodo = (index) => {
        setEditIndex(index);
        setEditText(todos[index].text);
    };

    const saveTodo = () => {
        const date = new Date().toLocaleString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });

        const updatedTodos = todos.map((item, idx) =>
            idx === editIndex ? { ...item, text: editText, date } : item
        );
        setTodos(updatedTodos);
        setEditIndex(null);
        setEditText('');
    };

    const toggleCompleted = (index) => {
        const updatedTodos = todos.map((item, idx) =>
            idx === index ? { ...item, completed: !item.completed } : item
        );
        setTodos(updatedTodos);
    };

    return (
        <main className="bg-amber-200 min-h-screen flex justify-center">
            <div>
                <div className="m-5">
                    <h1 className="bg-red-300 p-5 rounded-xl text-2xl hover:bg-red-500 text-center">
                        Todo App By Marshal
                    </h1>

                    <div className="my-5 bg-blue-50 p-5 rounded-3xl flex items-center">
                        <Input
                            placeholder="Add your todo"
                            onChange={(e) => setTodo(e.target.value)}
                            value={todo}
                            className="flex-grow"
                        />
                        <Button onClick={addTodo}>Add Todo</Button>
                    </div>
                </div>

                <div>
                    <h2 className="bg-red-300 p-2 rounded-xl text-xl text-center">Todo List</h2>

                    {todos.length === 0 ? (
                        <div className="text-red-600 text-2xl bg-amber-300 rounded-2xl p-3 text-center my-5">
                            Add Your Todos
                        </div>
                    ) : (
                        <ul className="space-y-4 mt-5">
                            {todos.map((item, index) => (
                                <li key={index} className="flex items-center space-x-4 bg-white rounded-xl p-3">
                                    <input
                                        type="checkbox"
                                        checked={item.completed}
                                        onChange={() => toggleCompleted(index)}
                                        className="w-5 h-5"
                                    />

                                    {editIndex === index ? (
                                        <>
                                            <Input
                                                value={editText}
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="flex-grow"
                                            />
                                            <Button onClick={saveTodo}>Save</Button>
                                        </>
                                    ) : (
                                        <>
                                            <div
                                                className={`text-xl flex-grow flex justify-between items-center gap-4 ${
                                                    item.completed ? 'line-through text-red-500' : ''
                                                }`}
                                            >
                                                <span className="bg-blue-400 p-2 rounded-xl">{item.text}</span>
                                                <span className="bg-pink-400 p-2 rounded-xl text-sm">{item.date}</span>
                                            </div>
                                            <Button onClick={() => editTodo(index)}>Edit</Button>
                                            <Button onClick={() => deleteTodo(index)}>Delete</Button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    );
}

// Input component
const Input = ({ type = 'text', placeholder, className = '', ...props }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`rounded-xl p-2 mr-5 border ${className}`}
            {...props}
        />
    );
};

// Button component
const Button = ({ children, type = 'button', className = '', ...props }) => {
    return (
        <button
            className={`cursor-pointer rounded-xl p-2 bg-blue-700 text-amber-50 hover:bg-blue-400 ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};
