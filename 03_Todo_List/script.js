const input = document.getElementById("input-box");
const tasks = document.getElementById("tasks");
const alertContainer = document.getElementById("alert-container");
const cancelAlert = document.getElementById("cancel");
const symbol = document.getElementById("symbol");
const icon = document.querySelector(".icon");
const filters = document.querySelector(".filters");
const clearAll = document.querySelector(".clearAll");
const addButton = document.getElementById("add-button");

let filter = "All";

function showAlert(message) {
    const alertMessage = alertContainer.querySelector(".msg");
    alertMessage.textContent = message;
    alertContainer.style.display = 'block';

    if(message === "Type Something") {
        alertContainer.style.backgroundColor = 'rgba(255, 226, 173, 0.5)';
        symbol.innerHTML = '<ion-icon name="alert-circle"></ion-icon>';
        icon.style.color = 'orange';  
        alertMessage.style.color = 'orange';
        cancelAlert.style.color = 'orange';
    }
    else if(message === "Added task to the list") {
        alertContainer.style.backgroundColor = 'rgba(129, 196, 129, 0.5)';
        symbol.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
        icon.style.color = 'green';  
        alertMessage.style.color = 'green';
        cancelAlert.style.color = 'green';
    }
    else if(message === "Deleted a task from the list") {
        alertContainer.style.backgroundColor = 'rgba(255, 183, 175, 0.5)';
        symbol.innerHTML = '<ion-icon name="close-circle"></ion-icon>';
        icon.style.color = 'red';  
        alertMessage.style.color = 'red';
        cancelAlert.style.color = 'red';
    }
    else if(message === "Completed the task") {
        alertContainer.style.backgroundColor = 'lightblue';
        symbol.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
        icon.style.color = 'rgb(85, 85, 207)';  
        alertMessage.style.color = 'rgb(85, 85, 207)';
        cancelAlert.style.color = 'rgb(85, 85, 207)';
    }
    else if(message === "Restored the task") {
        alertContainer.style.backgroundColor = 'lightblue';
        symbol.innerHTML = '<ion-icon name="reload-circle"></ion-icon>';
        icon.style.color = 'rgb(85, 85, 207)';  
        alertMessage.style.color = 'rgb(85, 85, 207)';
        cancelAlert.style.color = 'rgb(85, 85, 207)';
    }
    else {
        alertContainer.style.backgroundColor = 'white';
        symbol.innerHTML = '';
    }

    setTimeout(() => {
        alertContainer.style.display = 'none';
    }, 2000);

    cancelAlert.addEventListener("click", () => {
        alertContainer.style.display = 'none';
    })
}

function addTask(event) {
    event.preventDefault();

    if(input.value === '') {
        showAlert("Type Something");
        return;
    }

    if(addButton.textContent === 'Update') {
        const taskItems = document.querySelectorAll(".task-item");

        for (const task of taskItems) {
            if (task.classList.contains("editing")) {
                task.classList.remove("checked");
                task.innerHTML = `${input.value} <ion-icon class="edit-icon" name="create"></ion-icon> <ion-icon class="delete-icon" name="close-circle"></ion-icon>`;
                task.classList.remove("editing");
                showAlert("Task updated"); 
                addButton.textContent = "Add task"; 
                input.value = ''; 
                saveData(); 
                alertContainer.style.backgroundColor = 'rgba(129, 196, 129, 0.5)';
                symbol.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon>';
                icon.style.color = 'green';  
                alertMessage.style.color = 'green';
                cancelAlert.style.color = 'green';
                return;
            }
        }
    }

    const task = document.createElement("li");
    task.innerHTML = `${input.value} <ion-icon class="edit-icon" name="create"></ion-icon> <ion-icon class="delete-icon" name="close-circle"></ion-icon>`;
    task.classList.add("task-item");

    tasks.insertAdjacentElement("afterbegin", task);

    showAlert("Added task to the list");

    input.value = '';

    saveData();
}

addButton.addEventListener("click", addTask);

tasks.addEventListener("click", function(e) {
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle("checked");
        if(e.target.classList.contains("checked")) {
            showAlert("Completed the task");
        }
        else {
            showAlert("Restored the task");
        }
        reordertasks();
        saveData();
    }
    else if(e.target.classList.contains("delete-icon")) {
        e.target.parentElement.remove();    
        showAlert("Deleted a task from the list");
        saveData();
    }
    else if(e.target.classList.contains("edit-icon")) {
        console.log("Clicked on edit-icon");
        let parentNode = e.target.parentNode;
        let parentNodeText = parentNode.textContent;
        console.log(parentNodeText);
        input.value = parentNodeText;
        addButton.textContent = "Update";
        parentNode.classList.add("editing");
    }
})

function reordertasks() {
    const checkedTasks = tasks.getElementsByClassName("checked");
    const uncheckedTasks = tasks.getElementsByClassName("unchecked");

    for(const task of checkedTasks) {
        tasks.appendChild(task);
    }

    for(const task of uncheckedTasks) {
        tasks.appendChild(task);
    }
}

function saveData() {
    localStorage.setItem("data", tasks.innerHTML);
}

function showTasks() {
    tasks.innerHTML = localStorage.getItem("data");
}

showTasks();

filters.addEventListener("click", (e) => {
    if(e.target.tagName === 'LI') {
        const filterItems = filters.querySelectorAll("li");
        filterItems.forEach((item) => {
            item.classList.remove("active");
        })
        filter = e.target.textContent;
        e.target.classList.add("active");
        filterTasks();
    }
})

function filterTasks() {
    const taskItems = document.querySelectorAll(".task-item");

    taskItems.forEach((task) => {
        switch(filter) {
            case "All":
                task.style.display = 'block';
                break;
            case "Pending":
                if(!task.classList.contains("checked")) {
                    task.style.display = 'block';
                }
                else {
                    task.style.display = 'none';
                }
                break;
            case "Completed":
                if(task.classList.contains("checked")) {
                    task.style.display = 'block';
                }
                else {
                    task.style.display = 'none';
                }
                break;
        }
    })
}

clearAll.addEventListener("click", () => {
    if(confirm("Are you sure you want to clear all tasks?")) {
        localStorage.clear();
        tasks.innerHTML = '';
    }
})