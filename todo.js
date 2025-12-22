const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const todoForm = document.querySelector("#todo-form") //form
const todoInput = document.querySelector("#todo") //input

const list = document.querySelector(".list-group") // list
const filterInput = document.querySelector("#filter") //filter input
const clearAllBtn = document.querySelector("#clear-todos") // clear


eventListeners()

function eventListeners(){
    todoForm.addEventListener("submit" ,addTodo);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger","Lütfen bir to do giriniz");
    }
    else{
        addTodoUI(newTodo);
        showAlert("success","Todo başarıyla eklendi...")
    }

    e.preventDefault();
}

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function(){
        alert.remove();
    },1000);
}

function addTodoUI(newTodo){
    // link item
    const listItem = document.createElement("li");
    listItem.className ="list-group-item d-flex justify-content-between"
    // link
    const link = document.createElement("a");
    link.href ="#";
    link.className ="delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    // text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    list.appendChild(listItem)
    todoInput.value="";
}