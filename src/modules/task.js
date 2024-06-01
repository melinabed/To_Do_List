class Task {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  addToList(array) {
    array.push(this);

    return array;
  }

  changePriorityLevel() {
    switch (this.priority) {
      case "low":
        this.priority = "!";
        break;
      case "medium":
        this.priority = "!!";
        break;
      case "high":
        this.priority = "!!!";
    }
  }
}

export default Task;
