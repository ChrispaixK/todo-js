// Ui class : handles ui tasks
import Store from '../store.js';

class UI {
  static displayTasks() {
    const tasks = Store.getTasks(); // getting the tasks from local storage

    // looping over the stored taskks and add it to list
    tasks.forEach((task) => UI.addTasksToList(task));
  }

  static addTasksToList(task) {
    const list = document.querySelector('.tasks');

    const row = document.createElement('li');
    row.classList.add('task');

    row.innerHTML = `
          <div class="task-field">
              <input type="checkbox" class="task-checkbox" />
              <label class="task-description">${task.description}</label>
          </div>
          <div class="user-interaction">
          <i class="bi bi-pencil edit-btn"></i>
          <i class="bi bi-check2 update-btn"></i>
          <i class="bi bi-x remove-btn remove"></i>
          <div>`;

    list.appendChild(row);
  }

  // for removing task
  static removeTask(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.parentElement.remove();
    }
  }

  // to show Alert when added or Invalid
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    if (className === 'invalid') {
      div.innerHTML = '<i class="bi bi-x-circle"></i>';
    } else if (className === 'success') {
      div.innerHTML = '';
    }
    div.appendChild(document.createTextNode(message));
    const form = document.querySelector('.field-input-to-do');
    const btn = document.querySelector('.submit-btn');
    form.insertBefore(div, btn);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static updateTask(el) {
    const description = el.parentElement.parentElement.children[0].children[1];
    description.setAttribute('contentEditable', 'true');

    // to select the text that is editable
    const selectText = (ele) => {
      let sel;
      let range;
      // get element id
      if (window.getSelection && document.createRange) {
        // Browser compatibility
        sel = window.getSelection();
        if (sel.toString() === '') {
          // no text selection
          window.setTimeout(() => {
            range = document.createRange(); // range object
            range.selectNodeContents(ele); // sets Range
            sel.removeAllRanges(); // remove all ranges from selection
            sel.addRange(range); // add Range to a Selection.
          }, 1);
        }
      } else if (document.selection) {
        // older ie
        sel = document.selection.createRange();
        if (sel.text === '') {
          // no text selection
          range = document.body.createTextRange(); // Creates TextRange object
          range.moveToElementText(ele); // sets Range
          range.select(); // make selection.
        }
      }
    };

    // select the text that is editable
    selectText(description);
    description.parentElement.parentElement.classList.add('active');

    const editBtn = el;
    const updateBtn = el.nextElementSibling;
    // to remove edit btn
    editBtn.style.display = 'none';
    // to display update btn
    updateBtn.style.display = 'block';

    description.addEventListener('keypress', (keypressed) => {
      if (keypressed.key === 'Enter') {
        updateBtn.click();
        Store.updateTask(description);
      }
    });

    updateBtn.addEventListener('click', () => {
      description.setAttribute('contentEditable', 'false');
      description.parentElement.parentElement.classList.remove('active');
      // to remove edit btn
      editBtn.style.display = 'block';
      // to display update btn
      updateBtn.style.display = 'none';
    });
  }
}

export default UI;