// Store Class: Handles Storage
class Store {
  // Get Tasks : gets the tasks from store
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      // if there is nothing in storage
      tasks = []; // create empty array
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks')); // convert them in array
    }
    return tasks;
  }

  // add the task to store
  static addTask(task) {
    const tasks = Store.getTasks(); // get tasks
    tasks.push(task); // add new task
    localStorage.setItem('tasks', JSON.stringify(tasks)); // convert them in string
    // document.querySelector('.tasks-left-num').textContent = tasks.length;
  }

  // remove a task from store
  static removeTask(description) {
    const tasks = Store.getTasks();
    let spliced;
    tasks.forEach((task, index) => {
      if (task.description === description) {
        spliced = tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].index >= spliced[0].index) {
        tasks[i].index -= 1;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // document.querySelector('.tasks-left-num').textContent = tasks.length;
  }

  // update status when user checks the checkbox
  static updateCompletionStatus(el) {
    const checkbox = el;
    const taskList = document.querySelector('.tasks');
    const tasks = Store.getTasks();
    const nodes = Array.prototype.slice.call(taskList.children);
    for (let i = 0; i < tasks.length; i += 1) {
      if (
        tasks[i].index === nodes.indexOf(checkbox.parentElement.parentElement)
      ) {
        if (!tasks[i].completed) {
          tasks[i].completed = true;
        } else if (tasks[i].completed) {
          tasks[i].completed = false;
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    }
  }

  // clear all completed tasks
  static clearCompleted() {
    // check in loacal storage
    let tasks = Store.getTasks();
    const remainingTasks = [];
    for (let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].completed === false) {
        remainingTasks.push(tasks[i]);
      }
    }
    localStorage.setItem('tasks', JSON.stringify(remainingTasks));
    tasks = Store.getTasks();
    for (let i = 0; i < tasks.length; i += 1) {
      tasks[i].index = i;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // update tasks
  static updateTask(description) {
    const tasks = Store.getTasks();
    const taskList = document.querySelector('.tasks');
    const nodes = Array.prototype.slice.call(taskList.children); // convert list in array
    for (let i = 0; i < tasks.length; i += 1) {
      // iterate over tasks to find completed tasks
      if (
        tasks[i].index
        === nodes.indexOf(description.parentElement.parentElement)
      ) {
        if (description.textContent !== tasks[i].description) {
          tasks[i].description = description.textContent;
        }
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export default Store;