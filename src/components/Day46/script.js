// DOM element references
const addTaskBtn = document.getElementById("addTodoBtn");
const removeTaskBtn = document.getElementById("removeTodoBtn");
const todoItem = document.getElementById("todoItem");
const inputTodo = document.getElementById("addTodo");

let todoList = JSON.parse(localStorage.getItem("todo")) || [];

// Function to render todos to the DOM
function renderTodos() {
  todoItem.innerHTML = ""; // Clear existing tasks
  todoList.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    // li.dataset.index = index; // Store index for potential future use
    todoItem.appendChild(li);
  });
}

// Function to add a task
function addTask() {
  const todoTask = inputTodo.value.trim();
  if (!todoTask) {
    alert("Please add some data");
    return;
  }

  todoList.push(todoTask);
  saveTodos();
  renderTodos();
  inputTodo.value = "";
}

// Function to save todos to localStorage
function saveTodos() {
  localStorage.setItem("todo", JSON.stringify(todoList));
}

// Function to remove last task
function removeTask() {
  if (todoList.length === 0) return alert("No tasks to remove");
  todoList.shift();
  saveTodos();
  renderTodos();
}

// Event listeners
addTaskBtn.addEventListener("click", addTask);
removeTaskBtn.addEventListener("click", removeTask);

// Initial rendering on page load
renderTodos();
