import { ja } from "date-fns/locale";
import Task from "./task";

const Dom = (() => {
  //All elements besides header and sidebar will be generated
  const content = document.querySelector(".content");

  const addNewTaskButton = document.querySelector("#add-new-task");
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");
  const cancelTaskButton = document.querySelector("#cancel-task");

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const dueDate = document.querySelector("#dueDate");
  const priority = document.querySelector("#priority");

  let reminders = [];

  const addTask = () => {
    let task = new Task(
      title.value,
      description.value,
      dueDate.value,
      priority.value
    );

    task.addToList(reminders);
    task.changePriorityLevel();
    task.formatDate();

    addToLocalStorage(reminders);

    console.log(reminders);
  };

  const renderTasks = (reminders) => {
    const taskItemsContainer = document.querySelector(".task-container");
    taskItemsContainer.innerHTML = "";

    for (let i = 0; i < reminders.length; i++) {
      let index = reminders[i];

      const task = document.createElement("div");
      task.classList.add("task");

      const checkContainer = document.createElement("div");
      checkContainer.classList.add("check-container");

      const checkedTask = document.createElement("input");
      checkedTask.type = "radio";
      checkedTask.id = "check-task";
      checkContainer.appendChild(checkedTask);

      const taskInfo = document.createElement("div");
      taskInfo.classList.add("task-info-container");

      const titleDiv = document.createElement("div");
      titleDiv.textContent = index.title;
      titleDiv.setAttribute("id", "title-div");
      titleDiv.classList.add("item-checked");
      taskInfo.appendChild(titleDiv);

      const descriptionDiv = document.createElement("div");
      descriptionDiv.textContent = index.description;
      descriptionDiv.setAttribute("id", "descrip-div");
      descriptionDiv.classList.add("item-checked");
      taskInfo.appendChild(descriptionDiv);

      const dueDateDiv = document.createElement("div");
      dueDateDiv.textContent = index.dueDate;
      dueDateDiv.setAttribute("id", "due-date-div");
      dueDateDiv.classList.add("item-checked");
      taskInfo.appendChild(dueDateDiv);

      const priorityDiv = document.createElement("span");
      priorityDiv.textContent = index.priority;
      priorityDiv.setAttribute("id", "priority-div");
      priorityDiv.classList.add("item-checked");
      titleDiv.prepend(priorityDiv);

      //Dom Manip For the task buttons

      const taskButtons = document.createElement("div");
      taskButtons.classList.add("task-buttons");

      const editButton = document.createElement("button");
      //editButton.textContent = "Edit";
      editButton.setAttribute("id", "edit-button");
      taskButtons.appendChild(editButton);

      const deleteButton = document.createElement("button");
      //deleteButton.textContent = "Delete";
      deleteButton.setAttribute("id", "delete-button");
      taskButtons.appendChild(deleteButton);

      //Delete Button Click Listener
      //Bug Needs to Fixed (local storage is deleting wrong item)
      deleteButton.addEventListener("click", (index) => {
        reminders.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(reminders));
        taskItemsContainer.removeChild(task);
      });

      task.appendChild(checkContainer);
      task.appendChild(taskInfo);
      task.appendChild(taskButtons);

      taskItemsContainer.appendChild(task);
      content.appendChild(taskItemsContainer);
    }
  };

  const addToLocalStorage = (reminders) => {
    localStorage.setItem("todos", JSON.stringify(reminders));
    renderTasks(reminders);
  };

  const getFromLocalStorage = () => {
    const reference = localStorage.getItem("todos");
    if (reference) {
      reminders = JSON.parse(reference);
      renderTasks(reminders);
    }
  };

  addNewTaskButton.addEventListener("click", () => {
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    addTask();
    form.reset();
    dialog.close();
  });

  cancelTaskButton.addEventListener("click", () => {
    form.reset();
    dialog.close();
  });

  /**

  document.querySelector("#check-task").addEventListener("input", () => {
    let items = document.querySelectorAll(".item-checked");
    items.forEach((item) => (item.style.textDecoration = "line-through"));
  });

   */

  return { getFromLocalStorage };
})();

export default Dom;
