import React, { useState } from 'react'

const Day5 = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editIndex, setEditIndex] = useState(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (todo.trim() === "" || todos.some(t => t.text === todo)) return
    setTodos([{ text: todo, completed: false }, ...todos])
    setTodo("")
  }

  const removeTodo = (index) => {
    setTodos(todos.filter((_, idx) => index !== idx))
  }

  const completedTodo = (index) => {
    setTodos(todos.map((todo, idx) =>
      idx === index ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const todoEdit = (index) => {
    setEditIndex(index)
    setEditText(todos[index].text)
    // console.log(editText)
  }

  const saveEdit = () => {
    const updatedTodos = todos.map((todo, idx) =>
      idx === editIndex ? { ...todo, text: editText } : todo
    )
    setTodos(updatedTodos)
    setEditIndex(null)
    setEditText("")
  }

  return (
    <>
      <div className='flex justify-center bg-red-200 text-5xl'>
        <div>
          <h1 className='text-center'>Todo App</h1>
          <div className='mt-5 bg-amber-200'>
            <label htmlFor="todo">Todo: </label>
            <input
              type="text"
              name="todo"
              value={todo}
              placeholder='Add Task...'
              onChange={(e) => setTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
          </div>
        </div>
      </div>

      <div className='bg-orange-300 text-5xl'>
        {todos.length === 0 ? (
          <h2 className='text-center'>Please Add Your Task</h2>
        ) : (
          <div className='text-center'>
            <div className='flex justify-arround justify-center'><h2>Your Task</h2> <h3 className='ml-10'><select name="" id=""><option value="">filter</option></select></h3></div>
            {todos.map((todo, index) => (
              <div className='flex text-2xl justify-center items-center gap-4 mt-4' key={index}>
                {editIndex === index ? (
                  <>
                    <input
                      className='text-xl p-2'
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={saveEdit}>✅</button>
                  </>
                ) : (
                  <>
                    <li className={`p-2 text-3xl rounded-2xl ${todo.completed ? "line-through bg-red-400" : "bg-green-300"}`}>
                      {todo.text}
                    </li>
                    <input
                      className='mx-5'
                      type='checkbox'
                      checked={todo.completed}
                      onChange={() => completedTodo(index)}
                    />
                    <button onClick={() => removeTodo(index)}>🗑️</button>
                    <button onClick={() => todoEdit(index)}>✏️</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Day5
