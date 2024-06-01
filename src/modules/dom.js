import Task from "./task";

const Dom = (() => {
  //All elements besides header and sidebar will be generated
  const content = document.querySelector(".content");

  const addNewTaskButton = document.querySelector("#add-new-task");
  const dialog = document.querySelector("dialog");
  const form = document.querySelector("form");

  const title = document.querySelector("#title");
  const description = document.querySelector("#description");
  const dueDate = document.querySelector("#dueDate");
  const priority = document.querySelector("#priority");

  function addTask() {
    let reminders = [];

    let task = new Task(
      title.value,
      description.value,
      dueDate.value,
      priority.value
    );
    task.addToList(reminders);
    task.changePriorityLevel();

    console.log(reminders);

    let cardContainer = document.createElement("div");

    for (let i = 0; i < reminders.length; i++) {
      let index = reminders[i];

      const titleDiv = document.createElement("div");
      titleDiv.textContent = index.title;
      cardContainer.appendChild(titleDiv);

      const descriptionDiv = document.createElement("div");
      descriptionDiv.textContent = index.description;
      cardContainer.appendChild(descriptionDiv);

      const dueDateDiv = document.createElement("div");
      dueDateDiv.textContent = index.dueDate;
      cardContainer.appendChild(dueDateDiv);

      const priorityDiv = document.createElement("div");
      priorityDiv.textContent = index.priority;
      cardContainer.appendChild(priorityDiv);
    }

    content.appendChild(cardContainer);
  }

  addNewTaskButton.addEventListener("click", () => {
    dialog.showModal();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    addTask();
    form.reset();
    dialog.close();
  });

  return {
    content,
    addNewTaskButton,
    dialog,
    form,
    title,
    description,
    dueDate,
    priority,
  };
})();

export default Dom;
