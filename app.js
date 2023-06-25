const addTodoInput = document.getElementById("newToDo");
const addTodoButton = document.querySelector(".addToDoBTN");

// Load Page
document.addEventListener("DOMContentLoaded", showTodos)

// keys Handle
document.addEventListener("keydown", keyHandler)

// elements
const ListItems = document.getElementById("list-items");

addTodoButton.addEventListener("click", newTodoHadeler);
function newTodoHadeler(event) {
    if (addTodoInput.value) {
        const Taskdetails = addTodoInput.value;
        addTodoInput.value = null;

        isLoad = false;
        CreateToDo(Taskdetails);
    } else {
        alert("inter something!")
    }
}

let IsLoad = false;
function CreateToDo(Taskdetails) {
    // create element
    const element = document.createElement("li");
    const TaskTitle = document.createElement("h2");
    const TaskStatus = document.createElement("img");
    const DeleteTask = document.createElement("img")

    // set values: 
    TaskTitle.innerText = Taskdetails;
    // set attribute
    TaskStatus.setAttribute("src", "./SVG/notAccepted.svg");
    TaskStatus.setAttribute("alt", "notAccept");
    TaskStatus.setAttribute("id", "uncompleted")
    TaskStatus.classList.add("status");
    DeleteTask.setAttribute("src", "./SVG/Close.svg");
    DeleteTask.setAttribute("alt", "delete task");
    DeleteTask.classList.add("delete");

    element.appendChild(TaskStatus);
    element.appendChild(TaskTitle);
    element.appendChild(DeleteTask);

    // set to document
    ListItems.appendChild(element);

    if (!isLoad) {
        AddTaskToLocalStorage(Taskdetails);
    }
}

function AddTaskToLocalStorage(TasksValue) {
    let GetTask = JSON.parse(localStorage.getItem("task"));
    (GetTask == null) ? GetTask = [] : null;
    GetTask.push(TasksValue);

    // Push to Localstorage
    localStorage.setItem("task", JSON.stringify(GetTask));
}

function DeleteTaskFromLocalStorage(TasksValue) {
    let GetTask = JSON.parse(localStorage.getItem("task"));
    const index = GetTask.indexOf(TasksValue);

    GetTask.splice(index, 1);

    // push to local storage
    localStorage.setItem("task", JSON.stringify(GetTask));
}

// delete & compelet handler
ListItems.addEventListener("click", event => {
    item = event.target;

    if (item.classList[0] == "delete") {
        itemValue = item.previousElementSibling.innerText;

        const parent = item.parentElement;
        parent.style.display = "none";

        DeleteTaskFromLocalStorage(itemValue);
    }
    else if (item.classList[0] == "status") {
        const parent = item.parentElement;
        const status = item.id;

        if (status == "uncompleted") {
            item.setAttribute("src", "./SVG/Accepted.svg");
            item.setAttribute("id", "completed");
            parent.classList.add("completed")
        } else if (status == "completed") {
            item.setAttribute("src", "./SVG/notAccepted.svg");
            item.setAttribute("id", "uncompleted");
            parent.classList.remove("completed");
        }
    }
});

function showTodos() {
    const GetTask = JSON.parse(localStorage.getItem("task"));

    isLoad = true;
    for (const iterator of GetTask) {
        CreateToDo(iterator);
    }
}

// key Handler
function keyHandler(event) {
    const key = event.key;
    if (key == "Enter") {
        if (addTodoInput.value) {
            isLoad = false;
            CreateToDo(addTodoInput.value);
            addTodoInput.value = null;
        } else {
            alert("inter something!")
        }
    }
}