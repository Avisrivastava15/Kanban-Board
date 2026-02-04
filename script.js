// const todo = document.querySelector("#todo");
// const progress = document.querySelector("#progress");
// const done = document.querySelector("#done");
// let dragElement= null;

// if (localStorage.getItem("tasks")){
//     const data = JSON.parse(localStorage.getItem("tasks"));

//     for (const col in data){
//         const column = document.querySelector(`#${col}`);
//         data[col].forEach(task =>{
//             const div = document.createElement("div");

//             div.classList.add("task");
//             div.setAttribute("draggable","true");

//             div.innerHTML= `
//                     <h2>${taskTitle}</h2>
//                     <p>${taskDesc}</p>
//                     <button>Delete</button>       
//                 `;
//             column.appendChild(div);

//             div.addEventListener("drag",e=>{
//                 dragElement=div;
//             })
//         })
//     }
// }



// const tasks = document.querySelectorAll('.task');
// let tasksData= {};

// tasks.forEach(task=>{
//     task.addEventListener("drag",e=>{
//         dragElement=task;
//     })
// })

// function addDragEventsOnColumns(column){
//     column.addEventListener("dragenter",e=>{
//         e.preventDefault();
//         column.classList.add("hover-over");
//     })
//     column.addEventListener("dragleave",e=>{
//         e.preventDefault();
//         column.classList.remove("hover-over");
//     })

//     column.addEventListener("dragover",e=>{
//         e.preventDefault();
//     })

//     column.addEventListener("drop",e=>{
//         e.preventDefault();
//         column.appendChild(dragElement);
//         column.classList.remove("hover-over");

//         [todo, progress, done].forEach(col => {
//             const tasks = col.querySelectorAll(".task");

//             const count = col.querySelector(".right");

//             count.innerText = tasks.length;
//         })

//     })
// }

// addDragEventsOnColumns(todo);
// addDragEventsOnColumns(progress);
// addDragEventsOnColumns(done);

// // Modal related logic
// const toggleModalButton = document.querySelector("#toggle-modal");
// const modal = document.querySelector(".modal");
// const modalBg = document.querySelector(".modal .bg");
// const addTaskBtn = document.getElementById("add-new-task");

// toggleModalButton.addEventListener("click",e=>{
//     modal.classList.toggle("active");
// })

// modalBg.addEventListener("click",e=>{
//     modal.classList.remove("active");
// })

// addTaskBtn.addEventListener("click",e=>{
//     const taskTitle= document.querySelector("#task-title").value; 
//     const taskDesc= document.querySelector("#task-desc").value;
    
//     const div=document.createElement("div");
//     div.classList.add("task");
//     div.setAttribute("draggable","true");

//     div.innerHTML= `
//                     <h2>${taskTitle}</h2>
//                     <p>${taskDesc}</p>
//                     <button>Delete</button>       
//                 `;
//     todo.appendChild(div);


//     [todo, progress, done].forEach(col => {
//             const tasks = col.querySelectorAll(".task");

//             const count = col.querySelector(".right");

//             tasksData[col.id] = Array.from(tasks).map(t=>{
//                 return {
//                     title:t.querySelector("h2").innerText,
//                     desc:t.querySelector("p").innerText
//                 }
//             })
//             localStorage.setItem("tasks",JSON.stringify(tasksData));
//             count.innerText = tasks.length;
//         })

//     div.addEventListener("drag",e=>{
//         dragElement=div;
//     })

//     modal.classList.remove("active");
// })
// // Modal related logic



// Columns
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");

const columns = [todo, progress, done];
let dragElement = null;

// ---------------- LOAD FROM LOCAL STORAGE ----------------
let tasksData = JSON.parse(localStorage.getItem("tasks")) || {
    todo: [],
    progress: [],
    done: []
};

function createTaskElement(title, desc) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button class="delete-btn">Delete</button>
    `;

    // Drag event
    div.addEventListener("dragstart", () => {
        dragElement = div;
    });

    // Delete event
    div.querySelector(".delete-btn").addEventListener("click", () => {
        div.remove();
        updateCounts();
        saveToLocalStorage();
    });

    return div;
}

function loadTasks() {
    for (const colId in tasksData) {
        const column = document.querySelector(`#${colId}`);
        tasksData[colId].forEach(task => {
            const taskEl = createTaskElement(task.title, task.desc);
            column.appendChild(taskEl);
        });
    }
    updateCounts();
}

loadTasks();

// ---------------- DRAG & DROP LOGIC ----------------
function addDragEventsOnColumns(column) {
    column.addEventListener("dragenter", e => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragleave", () => {
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", e => {
        e.preventDefault(); // REQUIRED for drop to work
    });

    column.addEventListener("drop", e => {
        e.preventDefault();
        if (dragElement) {
            column.appendChild(dragElement);
            dragElement = null;
            updateCounts();
            saveToLocalStorage();
        }
        column.classList.remove("hover-over");
    });
}

columns.forEach(addDragEventsOnColumns);

// ---------------- UPDATE COUNTS ----------------
function updateCounts() {
    columns.forEach(col => {
        const count = col.querySelector(".right");
        const tasks = col.querySelectorAll(".task");
        count.innerText = tasks.length;
    });
}

// ---------------- SAVE TO LOCAL STORAGE ----------------
function saveToLocalStorage() {
    tasksData = { todo: [], progress: [], done: [] };

    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        tasks.forEach(task => {
            tasksData[col.id].push({
                title: task.querySelector("h2").innerText,
                desc: task.querySelector("p").innerText
            });
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasksData));
}

// ---------------- MODAL LOGIC ----------------
const toggleModalButton = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addTaskBtn = document.querySelector("#add-new-task");

toggleModalButton.addEventListener("click", () => {
    modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
    modal.classList.remove("active");
});

addTaskBtn.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title").value.trim();
    const taskDesc = document.querySelector("#task-desc").value.trim();

    if (!taskTitle) return;

    const taskEl = createTaskElement(taskTitle, taskDesc);
    todo.appendChild(taskEl);

    updateCounts();
    saveToLocalStorage();

    modal.classList.remove("active");

    document.querySelector("#task-title").value = "";
    document.querySelector("#task-desc").value = "";
});

