import{ useState, useEffect } from 'react'

export default function Day3() {
    const [todo, setTodo] = useState("")
    const [ todos , setTodos] = useState([])

    const addTodo = () => {
        if(todo && todo !== ""){
            setTodos([todo,...todos])
            setTodo("")
            
        }
        
    }
    const deleteTodo = (index) =>{
        const updatedTodos = todos.filter((_,idx)=> idx !== index)
        setTodos(updatedTodos)
    }
    

    useEffect(()=>{
        localStorage.setItem("Todos" , JSON.stringify(todos))
    },[todos])
    
    useEffect(()=>{
         let setLocal = localStorage.getItem("Todos")
        if(setLocal){
            setTodos(JSON.parse(setLocal))
        }
    },[])
    return (
        <>
            <>
                <h1>Todo App</h1>
                <input type='text' placeholder='Add Task....' value={todo} onChange={(e) => setTodo(e.target.value)} />
                <br/>
                <button onClick={ addTodo} >Add Todo</button>
                
                {todos === 0 ? <h2>Please add task</h2> : (
                    <div>
                        <h2>Todos List</h2>
                        {todos.map((todoList ,index) =>(
                           <div key={index}>
                            <li  >{todoList}</li>
                            <button  onClick={()=> deleteTodo(index)    }>Delete Todo</button>
                            </div>
                        ))}
                    </div>
                )}

            </>
        </>
    )
}