const todoInput = document.getElementById("todoInput");
const descriptionInput = document.getElementById("descriptionInput");
const goalDaysInput = document.getElementById("goalDaysInput");
const addButton = document.getElementById("addButton");
const todoList = document.getElementById("todoList");

addButton.addEventListener("click", () => {
    const taskName = todoInput.value.trim();
    const description = descriptionInput.value.trim();
    const goalDays = parseInt(goalDaysInput.value);

    if (taskName !== "") {
        const taskElement = document.createElement("li");
        taskElement.classList.add("task");
        const dueDate = calculateDueDate(goalDays);

        taskElement.innerHTML = `
      <div class="task-content">
        <h3>${taskName}</h3>
        <p class="task-description">${description}</p>
        <p class="due-date">Due: ${dueDate}</p>
        <p class="completion-status">Status: <span class="incomplete">Incomplete</span></p>
      </div>
      <div class="buttons">
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
        <input type="checkbox" class="complete-checkbox">
      </div>
    `;

        todoList.appendChild(taskElement);

        todoInput.value = "";
        descriptionInput.value = "";
        goalDaysInput.value = "";
    }
});

todoList.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    const taskContent = taskElement.querySelector(".task-content");
    const taskNameElement = taskContent.querySelector("h3");
    const descriptionElement = taskContent.querySelector(".task-description");
    const completionStatusElement = taskContent.querySelector(".completion-status span");

    if (event.target.classList.contains("delete-button")) {
        taskElement.remove();
    } else if (event.target.classList.contains("edit-button")) {
        if (event.target.textContent === "Edit") {
            taskNameElement.contentEditable = "true";
            descriptionElement.contentEditable = "true";
            taskNameElement.classList.add("editable");
            descriptionElement.classList.add("editable");

            event.target.textContent = "Save";
            event.target.classList.remove("edit-button");
            event.target.classList.add("save-button");
        } else {
            taskNameElement.contentEditable = "false";
            descriptionElement.contentEditable = "false";
            taskNameElement.classList.remove("editable");
            descriptionElement.classList.remove("editable");

            event.target.textContent = "Edit";
            event.target.classList.remove("save-button");
            event.target.classList.add("edit-button");
        }
    } else if (event.target.classList.contains("save-button")) {
        taskNameElement.contentEditable = "false";
        descriptionElement.contentEditable = "false";
        taskNameElement.classList.remove("editable");
        descriptionElement.classList.remove("editable");

        event.target.textContent = "Edit";
        event.target.classList.remove("save-button");
        event.target.classList.add("edit-button");
    } else if (event.target.classList.contains("complete-checkbox")) {
        if (event.target.checked) {
            completionStatusElement.textContent = "Completed";
            completionStatusElement.classList.add("completed");
        } else {
            completionStatusElement.textContent = "Incomplete";
            completionStatusElement.classList.remove("completed");
        }
    }
});

function calculateDueDate(days) {
    const today = new Date();
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + days);
    return dueDate.toDateString();
}
