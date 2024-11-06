let todoList = [];

let taskList = document.querySelector("#taskList")
let addTaskBtn = document.querySelector('#addTaskBtn')
let openBtn = document.querySelector("#trashIcon")
let closeBtn = document.querySelector("#closeTrashBtn")
let modal = document.querySelector("#trashModal")
let trashList = document.querySelector('#trashList')

openBtn.onclick = () => {
    modal.style.display = 'flex'
    renderTrash()
}
closeBtn.onclick = () => modal.style.display = 'none'

function render() {
    taskList.innerHTML = "";

    todoList.forEach(element => {
        if (element.isDeleted === false) {
            let item = `
            <li>${element.title}
            <button onClick='removeItem(${element.id})' style="background-color:red">X</button>
            </li>
            `;

            taskList.insertAdjacentHTML("beforeend", item);
        }
    });
}
render()

function removeItem(todoId) {
    todoList.find((todo) => todo.id === todoId).isDeleted = true
    render()
    renderTrash()
}
function restoreItem(todoId) {
    todoList.find((todo) => todo.id === todoId).isDeleted = false
    render()
    renderTrash()
}


function addTodo() {
    let inputValue = document.querySelector("#taskInput").value

    if (inputValue.trim()) {
        let newTodo = {
            id: Math.random(),
            isDeleted: false,
            title: inputValue
        }

        todoList.push(newTodo)
        document.querySelector("#taskInput").value = ""
        render()

    }
}

addTaskBtn.onclick = () => addTodo();

function renderTrash() {
    trashList.innerHTML = "";

    todoList.forEach(element => {
        if (element.isDeleted === true) {
            let item = `
            <li>${element.title}
            <button onClick="restoreItem(${element.id})"> Restore </button>
            </li>
            `;

            trashList.insertAdjacentHTML("beforeend", item);
        }
    });
}


