// ===== 1. Select HTML Elements =====
const themeBtn = document.getElementById("themeBtn");
const welcomeBtn = document.getElementById("welcomeBtn");
const body = document.body;
// ===== 2. Dark and Light Theme =====
let darkMode = false;
themeBtn.addEventListener("click", function () {
  darkMode = !darkMode;
  if (darkMode) {
    body.style.setProperty("--bg", "#171526");
    body.style.setProperty("--text", "#f5f2ff");
    body.style.setProperty("--muted", "#c0bbd5");
    body.style.setProperty("--card", "rgba(38, 34, 58, 0.92)");
    body.style.setProperty("--border", "rgba(190, 170, 255, 0.2)");
    body.style.setProperty("--shadow", "0 12px 35px rgba(0, 0, 0, 0.18)");
    themeBtn.textContent = "☀ Light Mode";
  } else {
    body.style.setProperty("--bg", "#f5f3ff");
    body.style.setProperty("--text", "#201a3b");
    body.style.setProperty("--muted", "#77738e");
    body.style.setProperty("--card", "rgba(255, 255, 255, 0.82)");
    body.style.setProperty("--border", "rgba(118, 87, 255, 0.14)");
    body.style.setProperty("--shadow", "0 12px 35px rgba(65, 43, 130, 0.09)");
    themeBtn.textContent = "🌙 Dark Mode";
  }
});
// ===== 3. Get Started Button =====
welcomeBtn.addEventListener("click", function () {
  const taskSection = document.getElementById("tasks");
  if (taskSection) {
    taskSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
  welcomeBtn.textContent = "Let's Do This! ✔";
});
// ===== 4. Feature Card Interaction =====
const featureCards = document.querySelectorAll(".feature-card");
featureCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const title = card.querySelector("h2").textContent;
    alert(title + "- Coming soon! 🚀");
  });
});
console.log("LifeHub is ready! ✨");
// ===== 5. LIFEHUB TASK MANAGER =====
// HTML elements =====
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

// Browser theke ager saved tasks naoa =====
let task = [];
try {
  tasks = JSON.parse(localStorage.getItem("lifehubTasks") || "[]");
  if (!Array.isArray(tasks)) {
    tasks = [];
  }
} catch (error) {
  task = [];
}
// ===== Show Tasks on the page ===== *//
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }
    //*====task checkbox=====*//
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    //*=====task text======*//
    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    //*=====Delete Button=====*//
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-task";
    deleteBtn.textContent = "🗑";
    //*=====Add elements to the task=====*//
    li.append(checkbox, span, deleteBtn);
    //*=====newest task appers first====*//
    taskList.append(li);
  });
  //*=====Update task count=====*//
  taskCount.textContent =
    tasks.length + (tasks.length === 1 ? "task" : "tasks");
  //*=====Show message if there are no tasks=====*//
  emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}
//*====== 6. Save tasks in the browser ======*//
function saveTasks() {
  localStorage.setItem("lifehubTasks", JSON.stringify(tasks));
}
//*===== 7. Add a new task =====*//
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    return;
  }
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };
  //*====Put the newest task at the beginning====*//
  tasks.unshift(newTask);
  saveTasks();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
});
//*===== 8. Run when a task is completed or deleted====*//
taskList.addEventListener("change", function (event) {
  if (event.target.classList.contains("task-checkbox")) {
    const li = event.target.closest(".task-item");
    const index = Array.from(taskList.children).indexOf(li);
    //*====Find the task using its displayed position====*//
    const displayedTask = tasks[index];
    if (displayedTask) {
      displayedTask.completed = event.target.checked;
      saveTasks();
      renderTasks();
    }
  }
});
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-task")) {
    const li = event.target.closest(".task-item");
    const index = Array.from(taskList.children).indexOf(li);
    if (index !== -1) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  }
});
//*=====Display saved tasks when the page opens====*//
renderTasks();
