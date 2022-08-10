// main elements
let mainSection = document.getElementById("main");
let toggler = document.getElementById("toggler");
let taskCreator = document.getElementById("create");
let taskDiscInp = document.getElementById("task-disc");
let taskArea = document.getElementById("tasks-area");

// nav elemnts
let remains = document.getElementById("task-remains");
let tabs = document.querySelectorAll(".tab");
let clearComp = document.getElementById("clear");

let activeTab = "All";

// function to add click event on nav elemnts
function addClickEvent() {
  tabs.forEach((e) => {
    e.addEventListener("click", (e) => {
      tabs.forEach((e) => {
        e.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      activeTab = e.currentTarget.textContent;
      filterTasks();
    });
  });
}
addClickEvent();

// function to create new task
function createTask() {
  taskCreator.onclick = () => {
    if (taskDiscInp.value.length >= 1) {
      // create the main div
      let taskHolder = document.createElement("div");
      taskHolder.classList.add("new-task", "All", "Active");
      // create the bullet
      let handler = document.createElement("div");
      handler.className = "task-handel";
      // create checked img
      let checked = document.createElement("img");
      checked.className = "checked";
      checked.src = "images/icon-check.svg";
      // create taks body
      let taskBody = document.createElement("div");
      taskBody.className = "task-body";
      // create task Discription elemnt
      let taskDisc = document.createElement("p");
      taskDisc.className = "task-name";
      taskDisc.textContent = taskDiscInp.value;
      // create the deletion button
      let deleteTask = document.createElement("button");
      deleteTask.className = "delete-Task";
      deleteTask.textContent = "X";

      // check the task value

      if (!checkActiveTask()) {
        return;
      } else {
        // appending the elemnts
        handler.append(checked);
        taskBody.append(taskDisc);
        taskHolder.append(handler, taskBody, deleteTask);
        taskArea.prepend(taskHolder);
      }
      // change the count of active tasks
      getActiveTasks();
    }
    taskDiscInp.value = "";
  };
}
createTask();

// function to delete the task
function deleteTask() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "delete-Task") {
      e.target.parentElement.remove();
    }
    // change the count of active tasks
    getActiveTasks();
  });
}
deleteTask();

// function to count the active tasks
function getActiveTasks() {
  let activeTasks = document.querySelectorAll(".new-task.Active");
  remains.textContent = `${activeTasks.length} items left`;
}
getActiveTasks();

// function to consider the task as completed one
function completedTask() {
  document.addEventListener("click", (e) => {
    if (e.target.className === "task-handel") {
      e.target.parentElement.classList.remove("Active");
      e.target.parentElement.classList.add("Completed");

      // change the count of active tasks
      getActiveTasks();
      // filter tasks Fun
      filterTasks();
    }
  });
}
completedTask();

// function to delete all completed tasks
function deleteCompleted() {
  clearComp.onclick = () => {
    let completedTasks = document.querySelectorAll(".new-task.Completed");
    completedTasks.forEach((task) => {
      task.remove();
    });
  };
}
deleteCompleted();

// function to change theem
function toggleTheem() {
  toggler.onclick = () => {
    mainSection.classList.toggle("light");
    if (mainSection.classList.contains("light")) {
      toggler.src = "images/icon-moon.svg";
    } else toggler.src = "images/icon-sun.svg";
  };
}
toggleTheem();

// filter tasks
function filterTasks() {
  let allTasks = document.querySelectorAll(".new-task");
  allTasks.forEach((e) => {
    if (e.classList.contains(activeTab)) e.style.display = "flex";
    else e.style.display = "none";
  });
}

// function to check if the task already active or not
function checkActiveTask() {
  let activeTask = document.querySelectorAll(".new-task.Active .task-name");
  let R = true;
  if (activeTask.length >= 1) {
    activeTask.forEach((e) => {
      if (e.textContent.toLowerCase() === taskDiscInp.value.toLowerCase()) {
        R = false;
      }
    });
  }
  return R;
}
