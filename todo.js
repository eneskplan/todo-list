const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

const todoForm = document.querySelector("#todo-form") //form
const todoInput = document.querySelector("#todo") //input

const list = document.querySelector(".list-group") // list
const filterInput = document.querySelector("#filter") //filter input
const clearAllBtn = document.querySelector("#clear-todos") // clear


eventListeners()

function eventListeners(){
    todoForm.addEventListener("submit" , addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filterInput.addEventListener("keyup",filterTodos);
    clearAllBtn.addEventListener("click", clearAllTodos);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger","Lütfen bir to do giriniz");
    }
    else if (sameTodos()){
        showAlert("danger","Halihazırda böyle bir todo var !")
        todoInput.value="";
    }
    else{
        addTodoUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...")
    }

    e.preventDefault();
}

function sameTodos(){
    const newTodo = todoInput.value.trim();
    const todos = getTodosFromStorage();
    return todos.includes(newTodo);
}

function clearAllTodos(){
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        // list.innerHTML = ""; case : slow
        while(list.firstElementChild !=null) {
            list.removeChild(list.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            //bulamadı

            listItem.setAttribute("style","display : none !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    })
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
        showAlert("success","Başarıyla silindi !")
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
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

function getTodosFromStorage(){
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos ;
}

function addTodoToStorage(newTodo){
   let todos = getTodosFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos", JSON.stringify(todos));
}