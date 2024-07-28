const inputBox = document.querySelector('.input')
const addBtn = document.querySelector('.button-plus')
const todolist = document.querySelector('.todos')



let editTodo = null;

//Function to add Todo...

const addToDo = function(){
    const inputValue = inputBox.value.trim();
    if(inputValue.length <= 0){
        alert("You mjust write something in your to do!");
        return false;
    }
    if(addBtn.innerHTML === `<i class=" ed fa-solid fa-pen-to-square"></i>`){
        editTodo.target.parentElement.previousElementSibling.innerHTML = inputValue;
        editlocalTodo(inputValue);
        addBtn.innerHTML = `<i class="fa-solid fa-plus-circle"></i>`;
        inputBox.value = "";
    }
    else{

        const li = document.createElement('li')
        const p =document.createElement('p')
        p.innerHTML = inputValue;
        li.appendChild(p);
        todolist.appendChild(li)
        inputBox.value = "";

        const editBtn = document.createElement('button')
        editBtn.classList.add('edit')
        editBtn.innerHTML = `<i class=" ed fa-solid fa-pen-to-square"></i>`
        li.appendChild(editBtn)
      

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.innerHTML = `<i class=" del fa-solid fa-trash"></i>`
        li.appendChild(deleteBtn)
   

        savelocalTodo(inputValue)
    }
}

//Function to update (edit/delete) Todo..

const updateTodo =function(e){
   if(e.target.classList.contains('del')){
    todolist.removeChild(e.target.parentElement.parentElement);
    deletelocalTodo(e.target.parentElement.parentElement)
   }
   if(e.target.classList.contains('ed')){
    inputBox.value = e.target.parentElement.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.innerHTML= `<i class=" ed fa-solid fa-pen-to-square"></i>`
    editTodo = e;
    
   }
}


//Function to save local Todo...

const savelocalTodo= (todo)=> {
     let todos = [];
     if(localStorage.getItem("todos") === null){
        todos=[]
     }
     else{
     todos=JSON.parse(localStorage.getItem("todos"));
     }
     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));

}

//Function to get local todos...

const getlocalTodo = ()=>{
    let todos = [];
     if(localStorage.getItem("todos") === null){
        todos=[]
     }
     else{
     todos=JSON.parse(localStorage.getItem("todos"));
     todos.forEach(todo => {
        
        const li = document.createElement('li')
        const p =document.createElement('p')
        p.innerHTML = todo;
        li.appendChild(p);
        todolist.appendChild(li)
        inputBox.value = "";

        const editBtn = document.createElement('button')
        editBtn.classList.add('edit')
        editBtn.innerHTML = `<i class=" ed fa-solid fa-pen-to-square"></i>`
        li.appendChild(editBtn)
      

        const deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.innerHTML = `<i class=" del fa-solid fa-trash"></i>`
        li.appendChild(deleteBtn)
   

     });
     }

}


//Function to delete local todos...

const deletelocalTodo = (todo) =>{
    let todos = [];
     if(localStorage.getItem("todos") === null){
        todos=[]
     }
     else{
     todos=JSON.parse(localStorage.getItem("todos"));
     }

     let todoText = todo.children[0].innerHTML;
     let todoIndex= todos.indexOf(todoText);
     todos.splice(todoIndex,1);
     localStorage.setItem("todos",JSON.stringify(todos))
     console.log(todoIndex)
    //  console.log(todoText.children[0].innerHTML);


}


const editlocalTodo= (todo)=>{
let todos = JSON.parse(localStorage.getItem("todos"));
let todoIndex = todos.indexOf(todo);
todos[todoIndex] = inputBox.value;
localStorage.setItem("todos", JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getlocalTodo)

addBtn.addEventListener('click',addToDo);
todolist.addEventListener('click',updateTodo)
