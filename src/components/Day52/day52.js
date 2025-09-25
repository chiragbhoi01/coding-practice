let todoValue = document.getElementById("todoValue");
let deleteTodo = document.getElementById("deleteTodo");
let addTodo = document.getElementById("addTodo");
let todoList = document.getElementById("todoList");
let todos = [];


function loadTodos() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";
    if (!todos || todos.length === 0) {
        
        return;
    }
    todos.forEach((task) => {
        let li = document.createElement("li");
        li.innerText = task;
        todoList.appendChild(li);
    });
}

function localSave() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodos() {
    let todoVal = todoValue.value?.trim();
    if (!todoVal) {
        alert("please add some todo or fill");
        return;
    }
    todos.push(todoVal);
    todoValue.value = "";
    renderTodos();
    localSave();
}

function deleteTodos() {
    if (todos.length === 0) {
        alert("todos already empty");
        return;
    }
    todos.pop();
    renderTodos();
    localSave();
}

addTodo.addEventListener("click", addTodos);
deleteTodo.addEventListener("click", deleteTodos);
window.addEventListener("DOMContentLoaded", loadTodos);
