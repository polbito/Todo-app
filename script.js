const form = document.getElementById("form");
const input = document.getElementById("task-input");
const tasks = document.getElementById("tasks");
const clear_completed = document.getElementById("clear-completed");


if (localStorage.length === 0 ) {
    window.localStorage.setItem("tasks", '[]');
}
if (JSON.parse(localStorage.getItem("tasks")).length === 0) {
    const tasks_info = document.querySelector(".tasks-info");
    tasks_info.style.cssText = "border-radius: 10px;"
}


function addTaskToArray(task_content) {
    const task = {
      id: Date.now(),
      title: task_content,
      completed: false,
    };
    array_of_tasks;
    array_of_tasks.push(task);
    
    addDataToLocalStorage(array_of_tasks);
    
}
function addTaskToPageHtml(task_content) {
    
    let div = document.createElement("div");
    div.className = "task";
    
    let span = document.createElement("span");
    span.className = "task-completed";
    let p = document.createElement("p");
    p.className = "task-content";
    let p_content = document.createTextNode(task_content);
    p.append(p_content);
    let delete_icon = document.createElement("i");
    delete_icon.className = "fa-solid fa-xmark remove";
    delete_icon.style.cssText = `position: absolute;right: 15px;bottom: 11px;font-size: 21px;`

    tasks.append(div);
    div.append(span);
    div.append(p);
    div.append(delete_icon);

    LeftTasks();
}
function addDataToLocalStorage(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function RemoveElementLocalStorage(task_content){
    array_of_tasks = array_of_tasks.filter((task) => task.title != task_content);
    addDataToLocalStorage(array_of_tasks);
    LeftTasks();
}
function CompletedTask(task_content) {
    for (let i=0;i<array_of_tasks.length;i++) {
        if(array_of_tasks[i].title === task_content){
            array_of_tasks[i].completed = true;
            addDataToLocalStorage(array_of_tasks);
        }
    }
}

function LeftTasks(){
    const left_tasks = document.getElementById("n-left-tasks");
    if (localStorage.length >= 1) {
        let array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
        let n = 0;
        if(array_of_tasks){
            for (let i=0;i<array_of_tasks.length;i++){
                if(array_of_tasks[i].completed){
                    continue;
                }
                n++
            }
            left_tasks.innerText = `${n} items left`;
        }
    }
}

LeftTasks();

function TaskCompleted() {
    let tasks_completed_content = [];
    array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
    if (array_of_tasks){
        array_of_tasks.forEach(function(v){
            if (v.completed){
                tasks_completed_content.push(v.title)
            }
        })
        let my_elements = document.querySelectorAll(".task-content");
        my_elements.forEach(function(v){
            if(tasks_completed_content.includes(v.innerText)){      
                v.previousSibling.style.cssText = "background: linear-gradient(140deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));";
                v.style.cssText = "color:hsl(233, 11%, 84%);text-decoration-line: line-through;";
            }
        })
        let svg = document.createElement("div");
        svg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>';
        svg.style.paddingLeft = "5px";
        svg.style.paddingTop = "2px";
        let task_completed = document.querySelectorAll(".task-completed");
        task_completed.forEach(element => {
            element.appendChild(svg.cloneNode(true));
        });
    }
}

function ClearCompleted() {
    clear_completed.addEventListener("click",function(){
        array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
        array_of_tasks.forEach(function(v){
            if (v.completed){
                RemoveElementLocalStorage(v.title);
                location.reload();
            }
        })
    })
}
ClearCompleted()
function DarkMode(){

    const body = document.body;
    const BackImg = document.querySelector(".main--top");
    const task_input = document.getElementById("task-input");
    const my_task = document.querySelector(".task");
    const tasks_info = document.querySelector(".tasks-info");
    const main__bottom = document.querySelector(".main--bottom");

    
    body.style.backgroundColor = "hsl(235, 21%, 11%)";
    const screnn_width = screen.width;
    if (screnn_width >= 500) {
        BackImg.style.cssText = "background-image: url('images/bg-desktop-dark.jpg')" 
    }
    else {
        BackImg.style.cssText = "background-image: url('images/bg-mobile-dark.jpg')" 
    }
    window.addEventListener('resize', DarkMode);
    
    task_input.style.backgroundColor = "hsl(235, 24%, 19%)";
    if (my_task){
        my_task.style.backgroundColor = "hsl(235, 24%, 19%)";
    }
    tasks_info.style.backgroundColor = "hsl(235, 24%, 19%)";
    main__bottom.style.backgroundColor = "hsl(235, 24%, 19%)";
    
    main__bottom.style.color = "hsl(234, 11%, 52%)";
    
}
function LightMode(){

    const body = document.body;
    const BackImg = document.querySelector(".main--top");
    const task_input = document.getElementById("task-input");
    const my_task = document.querySelector(".task");
    const tasks_info = document.querySelector(".tasks-info");
    const main__bottom = document.querySelector(".main--bottom");

    
    body.style.backgroundColor = "hsl(236, 33%, 92%)";
    const screnn_width = screen.width;
    if (screnn_width >= 500) {
        BackImg.style.cssText = "background-image: url('images/bg-desktop-light.jpg')" 
    }
    else {
        BackImg.style.cssText = "background-image: url('images/bg-mobile-light.jpg')" 
    }
    window.addEventListener('resize', DarkMode);
    
    task_input.style.backgroundColor = "#fff";
    if (my_task){
        my_task.style.backgroundColor = "#fff";
    }
    tasks_info.style.backgroundColor = "#fff";
    main__bottom.style.backgroundColor = "#fff";
    
    main__bottom.style.color = "black";
    
}
/////////////////////////////

if (localStorage.length) {
    array_of_tasks = JSON.parse(localStorage.getItem("tasks"));
    const All = document.getElementById("all");
    const Active = document.getElementById("active");
    const completed = document.getElementById("completed");

    let all_tasks = [];
    let active_tasks = [];
    let completed_tasks = [];
    
    array_of_tasks.forEach(function(v){
        all_tasks.push(v.title);
        if (v.completed){
            completed_tasks.push(v.title);
        }
        else {
            active_tasks.push(v.title);
        }
    })


    for (let i=0;i<array_of_tasks.length;i++) {
        addTaskToPageHtml(array_of_tasks[i].title);

        

    }

    All.addEventListener("click",function(){
        location.reload();
    })
    Active.addEventListener("click",function(){
        let my_elements = document.querySelectorAll(".task-content");

        my_elements.forEach(function(v){
            v.parentElement.style.display = "none";
            my_elements.forEach(function(v){
                if(active_tasks.includes(v.innerText)){
                    v.parentElement.style.display = "block";
                }
            })




        })
            
        
    })
    completed.addEventListener("click",function(){
        let my_elements = document.querySelectorAll(".task-content");
        
        my_elements.forEach(function(v){
            v.parentElement.style.display = "none";
            my_elements.forEach(function(v){
                if(completed_tasks.includes(v.innerText)){
                    v.parentElement.style.display = "block";
                }
            })
        })

    })






    let tasks_completed = document.querySelectorAll(".task-completed");
    if (tasks_completed) {
        tasks_completed.forEach(function(v){
            v.addEventListener("click", function(){
                v.style.cssText = "background: linear-gradient(140deg,hsl(192, 100%, 67%),hsl(280, 87%, 65%));";                
                v.nextSibling.style.cssText = "color:hsl(233, 11%, 84%);text-decoration-line: line-through;";
                CompletedTask(v.nextSibling.innerText);
            })
        })
    }




    let delete_icons = document.querySelectorAll(".remove");
    if (delete_icons) {
        delete_icons.forEach(function(v){
            v.addEventListener("click", function(e){
                RemoveElementLocalStorage(v.previousSibling.innerText);
                v.parentElement.remove();
            })
        })
    }


                    
}






form.addEventListener("submit", function(event){
    event.preventDefault();

    let input_value = (input.value).trim()
    if (input_value != "") {
        
        addTaskToArray(input_value);
        addTaskToPageHtml(input_value);

        location.reload();
        
    }
    input.value = "";

});

TaskCompleted();









let moon = document.getElementById("moon");
moon.addEventListener("click",function(){
    let last_theme = window.localStorage.getItem("last_theme");
    
    if(last_theme === "dark"){
        LightMode();
        moon.src = "/images/icon-moon.svg";
        let set_last_theme = window.localStorage.setItem("last_theme", "light");
    }
    else {
        moon.src = "/images/icon-sun.svg";
        DarkMode();
        let set_last_theme = window.localStorage.setItem("last_theme", "dark");
    }
})


function x() {
    const screnn_width = screen.width;
    if (screnn_width >= 700) {
        const test = document.querySelector(".test");
        const main__bottom = document.querySelector(".main--bottom");
        test.appendChild(main__bottom);
    }
    window.addEventListener('resize', x);
}

x()