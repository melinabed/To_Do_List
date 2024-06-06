import { format, parseISO } from "date-fns";

class Task {
  constructor(title, description, dueDate, priority, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  //Pushes contructor properties in a to be determined array
  addToList(array) {
    array.push(this);

    return array;
  }

  //Changes the string of Priority value depending on the level
  changePriorityLevel() {
    switch (this.priority) {
      case "low":
        this.priority = "! ";
        break;
      case "medium":
        this.priority = "!! ";
        break;
      case "high":
        this.priority = "!!! ";
    }
  }

  //Formats the dueDate in standard MM/dd/yyyy
  formatDate() {
    this.dueDate = format(parseISO(this.dueDate), "MM/dd/yyyy");
    return;
  }
}

export default Task;
