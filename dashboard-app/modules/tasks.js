import { saveData, loadData } from "./storage.js";

let tasks = [];

export function initTasks() {
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addTaskBtn");
  const clearBtn = document.getElementById("clearCompletedBtn");
  const list = document.getElementById("taskList");

  // Load saved tasks
  tasks = loadData("tasks");
  renderTasks();

  // Add task
  addBtn.onclick = () => {
    if (input.value.trim()) {
      tasks.push({ text: input.value.trim(), completed: false });
      saveData("tasks", tasks);
      renderTasks();
      input.value = "";
    }
  };

  // Clear completed
  clearBtn.onclick = () => {
    tasks = tasks.filter(t => !t.completed);
    saveData("tasks", tasks);
    renderTasks();
  };

  function renderTasks() {
    list.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.completed ? "completed" : "";

      // Checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.onchange = () => {
        tasks[index].completed = checkbox.checked;
        saveData("tasks", tasks);
        renderTasks();
      };

      // Task text
      const span = document.createElement("span");
      span.textContent = task.text;

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        saveData("tasks", tasks);
        renderTasks();
      };

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(delBtn);
      list.appendChild(li);
    });

    enableDragAndDrop();
  }

  function enableDragAndDrop() {
    list.querySelectorAll("li").forEach(li => {
      li.draggable = true;

      li.addEventListener("dragstart", () => li.classList.add("dragging"));
      li.addEventListener("dragend", () => {
        li.classList.remove("dragging");
        tasks = Array.from(list.children).map(li => {
          return {
            text: li.querySelector("span").textContent,
            completed: li.querySelector("input").checked
          };
        });
        saveData("tasks", tasks);
      });
    });

    list.addEventListener("dragover", e => {
      e.preventDefault();
      const dragging = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(list, e.clientY);
      if (afterElement == null) {
        list.appendChild(dragging);
      } else {
        list.insertBefore(dragging, afterElement);
      }
    });

    function getDragAfterElement(container, y) {
      const elements = [...container.querySelectorAll("li:not(.dragging)")];
      return elements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
  }
}
