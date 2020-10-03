let clockText = document.querySelector('.clock-box-time');
let localName = document.querySelector('.local-name-text');
let delStorage = document.querySelector('.del-storage');
let localText = document.querySelector('.local-name');
let listNode = document.querySelector(".list-ul");

function colockTime(){
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    clockText.innerHTML = `${hours < 10 ? `0${hours}`:`${hours}`}:${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

function nameEvent(event){
    let localNameValue = localName.value;
    if(event.keyCode==13 && localNameValue != ''){
        localStorage.setItem('name', localNameValue);
    }
    yourName();
}

function yourName(){
    const name = localStorage.getItem("name");
    const spanName = localText.getElementsByTagName('span')[0];

    if(name == null){
        localName.style.display = 'block';
    }else{
        localName.style.display = 'none';
        delStorage.style.display = 'block';
    }
    if(name != null){
        spanName.innerText = `Hello! ${name}`;
    }
}

function storageDel(){
    localStorage.clear();
    localName.style.display = 'block';
    localName.value = '';
    delStorage.style.display = 'none';
    localText.getElementsByTagName('span')[0].innerText = '';
}

delStorage.addEventListener('click', storageDel);

// to-do-list app
let toDoArr = [];
function deletEvent(event){
    let btn = event.target;
    let deli = btn.parentNode;
    listNode.removeChild(deli);

    let cleanTodos = toDoArr.filter(function(todo){
        return todo.id !== parseInt(deli.id);
    });
    console.log(cleanTodos);
    
    toDoArr = cleanTodos;
    localStorage.setItem('todo', JSON.stringify(toDoArr)); 
}

function toDoList(event){
    if(event.keyCode == 13){
        let toDoTextVal = document.querySelector('.to-do-text');
        let toDoText = toDoTextVal.value;
        let delBtn = document.createElement("button");
        delBtn.innerText = "X";
        delBtn.addEventListener("click", deletEvent);

        let newId = toDoArr.length + 1;
        let list = document.createElement("li");
        let node = document.createTextNode(toDoText);
        list.appendChild(delBtn);
        list.appendChild(node);
        list.id = newId;

        let elementor = document.querySelector(".list-ul");
        elementor.appendChild(list);
        let todoObj = {
            text : toDoText,
            id : newId 
        }
        toDoArr.push(todoObj);
        toDoTextVal.value = null ;
        localStorage.setItem('todo', JSON.stringify(toDoArr));  // localStorage 배열에 담기
    }
}

// local안에 있는 값을 다시 배열에 담아주기
function loadedToDosValue(){
    const loadedToDos = localStorage.getItem('todo');
    const parsedToDos = JSON.parse(loadedToDos);
    
    if(parsedToDos !== null){
        parsedToDos.forEach(function(parsedToDos) {
            toDoArr.push(parsedToDos);
            let list = document.createElement("li");
            let delBtn = document.createElement("button");
            delBtn.innerText = "X";
            delBtn.addEventListener("click", deletEvent);
            let node = document.createTextNode(parsedToDos.text);
            let newId = toDoArr.length;
            list.appendChild(delBtn);
            list.appendChild(node);
            list.id = newId;

            let elementor = document.querySelector(".list-ul");
            elementor.appendChild(list);
        });
    }
}

function init(){
    loadedToDosValue();
    colockTime();
    setInterval(colockTime,1000);
    yourName();
}

init();




