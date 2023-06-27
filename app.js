const addTodoInput = document.getElementById("newToDo");
const addTodoButton = document.querySelector(".addToDoBTN");

// Load Page
document.addEventListener("DOMContentLoaded", showTodos)

// keys Handle
document.addEventListener("keydown", keyHandler)

// elements list
const ListItems = document.getElementById("list-items");

addTodoButton.addEventListener("click", newTodoHadeler);
function newTodoHadeler(event) {
    if (addTodoInput.value) {
        const Taskdetails = addTodoInput.value;
        addTodoInput.value = null;

        isLoad = false;
        CreateToDo(Taskdetails, "unfinished");
    } else {
        alert("Please write something!");
    }
}

let IsLoad = false;
function CreateToDo(Taskdetails, status) {
    // create element
    const element = document.createElement("li");
    const TaskTitle = document.createElement("h2");
    const TaskStatus = document.createElement("img");
    const DeleteTask = document.createElement("img")

    // set todo values: 
    TaskTitle.innerText = Taskdetails;
    // set style for todo item
    if (status == "completed") {
        // set attribute
        TaskStatus.setAttribute("src", "./SVG/Accepted.svg");
        TaskStatus.setAttribute("id", "completed");
        element.classList.add("completed");
    } else if (status == "unfinished") {
        // set attribute
        TaskStatus.setAttribute("src", "./SVG/notAccepted.svg");
        TaskStatus.setAttribute("id", "unfinished");
        element.classList.remove("completed");
    }

    // TaskStatus.setAttribute("id", "unfinished");
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
    let GetTask = JSON.parse(localStorage.getItem("ToDos"));
    (GetTask == null) ? GetTask = [] : null;

    const TODO = {
        title: TasksValue,
        status: "unfinished"
    };
    GetTask.push(TODO);

    // Push to Localstorage
    localStorage.setItem("ToDos", JSON.stringify(GetTask));
}

function DeleteTaskFromLocalStorage(TasksValue) {
    let GetTask = JSON.parse(localStorage.getItem("ToDos"));

    GetTask.forEach((todo, index) => {
        if (todo['title'] == TasksValue) {
            GetTask.splice(index, 1);
        }
    });

    // push to local storage
    localStorage.setItem("ToDos", JSON.stringify(GetTask));
}

// delete & status element handler
ListItems.addEventListener("click", event => {
    const item = event.target;

    if (item.classList[0] == "delete") {
        itemValue = item.previousElementSibling.innerText;

        const parent = item.parentElement;
        parent.style.display = "none";

        DeleteTaskFromLocalStorage(itemValue);
    }
    else if (item.classList[0] == "status") {
        let GetTask = JSON.parse(localStorage.getItem("ToDos"));

        const parent = item.parentElement;
        const status = item.id;

        if (status == "unfinished") {
            item.setAttribute("src", "./SVG/Accepted.svg");
            item.setAttribute("id", "completed");
            parent.classList.add("completed");

            changeStatus(item, "completed")
        } else if (status == "completed") {
            item.setAttribute("src", "./SVG/notAccepted.svg");
            item.setAttribute("id", "unfinished");
            parent.classList.remove("completed");

            changeStatus(item, "unfinished");
        }
    }

    function changeStatus(element, status) {
        const GetTask = JSON.parse(localStorage.getItem("ToDos"));
        const title = element.nextElementSibling.innerText;

        // change status from Local Storage
        GetTask.forEach(todo => {
            if (todo['title'] == title) {
                todo['status'] = status;
            }
        });

        // push to local storage
        localStorage.setItem("ToDos", JSON.stringify(GetTask));
    }
});

function showTodos() {
    const GetTask = JSON.parse(localStorage.getItem("ToDos"));

    isLoad = true;
    GetTask.forEach(todo => {
        const title = todo['title'];
        const status = todo['status'];

        // console.log(`on show todo: ${title}, ${status}`);
        CreateToDo(title, status);
    });
}

// key Handler
function keyHandler(event) {
    const key = event.key;
    if (key == "Enter") {
        if (addTodoInput.value) {
            isLoad = false;
            CreateToDo(addTodoInput.value, "unfinished");
            addTodoInput.value = null;
        } else {
            alert("inter something!")
        }
    }
}