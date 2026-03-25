const tasks = [];

const addBtn = document.getElementById("add-Task");
let taskInput = document.getElementById("input-field");
let tasksContainer = document.getElementById("tasks-container");
let editIndex = null;

addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let task = capitalizeFirstLetter(taskInput.value.trim());
  // 🚫 prevent empty updates
  if (task === "") return;

  if (editIndex !== null) {
    // ✅ REPLACE the old value
    tasks[editIndex].text = task;

    // ✅ reset edit mode
    editIndex = null;
  } else {
    // ✅ normal add
    tasks.push({ text: task, completed: false });
  }

  rendertask();
  taskInput.value = "";
});

function rendertask() {
  tasksContainer.innerHTML = tasks
    .map(
      (item, index) =>
        `
    <div id="list-item">
      <p class="${item.completed ? "completed" : ""}" id="tasked"> ${item.text}</p>


      <div class="btns">
        <button id="btn1" class="btn1" data-index="${index}"> Edit </button>
        <button id="btn2" class="btn2" data-index="${index}"> Delete </button>
        <button id="btn3" class="btn3" data-index="${index}"> Completed </button>
      </div>
    </div>`,
    )
    .join("");
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

tasksContainer.addEventListener("click", function (e) {
  const index = e.target.dataset.index;

  // DELETE
  if (e.target.classList.contains("btn2")) {
    tasks.splice(index, 1);
    rendertask();
  }

  // EDIT
  if (e.target.classList.contains("btn1")) {
    taskInput.value = tasks[index].text; // put value in input
    editIndex = index; // store index being edited
  }

  // ✅ COMPLETE
  if (e.target.classList.contains("btn3")) {
    tasks[index].completed = !tasks[index].completed; // toggle
    rendertask();
  }
});

const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", function () {
  tasks.length = 0; // ✅ clear the array
  editIndex = null; // ✅ reset any edit mode
  rendertask(); // ✅ re-render empty list
});
