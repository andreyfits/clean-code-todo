//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.querySelector(".task-row-wrapper button");
const todoList = document.getElementById("incompleteTasks");
const completedList = document.getElementById("completed-tasks");

const createTaskElement = function (taskText) {
  const listItem = document.createElement("li");

  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("img");

  // innerText, not innerHTML: user text must not be parsed as markup
  label.innerText = taskText;
  label.className = "task";

  checkbox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteIcon.src = "./remove.svg";
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const listItem = createTaskElement(newTaskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = "";
};

const toggleEditMode = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editButton = listItem.querySelector(".edit");
  const isEditMode = listItem.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editButton.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editButton.innerText = "Save";
  }

  listItem.classList.toggle("editMode");
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const parentList = listItem.parentNode;
  parentList.removeChild(listItem);
};

const toggleTaskCompleted = function () {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
};

const bindTaskEvents = function (listItem) {
  const checkbox = listItem.querySelector("input[type=checkbox]");
  const editButton = listItem.querySelector("button.edit");
  const deleteButton = listItem.querySelector("button.delete");

  editButton.onclick = toggleEditMode;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTaskCompleted;
};

addTaskButton.addEventListener("click", addTask);

// Tasks written in index.html are not created by createTaskElement
// and still need their event handlers.
[...todoList.children, ...completedList.children].forEach(bindTaskEvents);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
