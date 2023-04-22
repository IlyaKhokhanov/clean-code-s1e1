//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const taskInput = document.querySelector(".add-task__input");
const addButton = document.querySelector(".add-task__btn");
const todoList = document.querySelector(".todo__list");
const completedList = document.querySelector(".completed__list");

//New task list item
function createTodoItem(taskString) {
  let listItem = document.createElement("li");
  listItem.classList.add("item");

  let checkBox = document.createElement("input");
  checkBox.classList.add("item__checkbox");
  checkBox.type = "checkbox";

  let label = document.createElement("label");
  label.classList.add("item__label", "task");
  label.innerText = taskString;

  let editInput = document.createElement("input");
  editInput.classList.add("item__input", "task");
  editInput.type = "text";

  let editButton = document.createElement("button");
  editButton.classList.add("item__edit-btn", "btn");
  editButton.innerText = "Edit";

  let deleteButton = document.createElement("button");
  deleteButton.classList.add("item__delete-btn", "btn");

  let deleteButtonImg = document.createElement("img");
  deleteButtonImg.classList.add("item__delete-img")
  deleteButtonImg.src = "./remove.svg";
  deleteButton.append(deleteButtonImg);

  listItem.append(checkBox);
  listItem.append(label);
  listItem.append(editInput);
  listItem.append(editButton);
  listItem.append(deleteButton);

  return listItem;
}

function addTask() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  let listItem = createTodoItem(taskInput.value);

  //Append listItem to todoList
  todoList.append(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;

  let editInput = listItem.querySelector(".item__input");
  let label = listItem.querySelector(".item__label");
  let editBtn = listItem.querySelector(".item__edit-btn");
  let containsClass = listItem.classList.contains("edit-mode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("edit-mode");
}

//Delete task.
function deleteTask() {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
function taskCompleted() {
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedList.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  let listItem = this.parentNode;
  todoList.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

function ajaxRequest() {
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  let checkBox = taskListItem.querySelector(".item__checkbox");
  let editButton = taskListItem.querySelector(".item__edit-btn");
  let deleteButton = taskListItem.querySelector(".item__delete-btn");

  //Bind editTask to edit button.
  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
}

//cycle over todoList ul list items
//for each list item
for (let i = 0; i < todoList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(todoList.children[i], taskCompleted);
}

//cycle over completedList ul list items
for (let i = 0; i < completedList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedList.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
