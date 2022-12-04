let allTasks = [];
let currentDraggedElement;

async function init() {
    await includeHTML();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function addTaskRight() {
    document.getElementById('addTaskRight').classList.remove('d-none');
}

function openCheckTask() {
    document.getElementById('closeContainer2').classList.remove('d-none');
}

function closeContainer1() {
    document.getElementById('closeContainer2').classList.add('d-none');
}

function onSubmit(event) {
    event.preventDefault();
    createTask();
    closeContainer()
}

/** Area for Drag and Drop */

function createTask() {
    let titles = document.getElementById('title').value;
    let descriptions = document.getElementById('description').value;
    let categorys = document.getElementById('categoryList').value;
    let dueDates = document.getElementById('dueDate').value;
    let assignedTos = document.getElementById('assignedTo').value;
    let prios = document.getElementById('prio').value;
    let subtasks = document.getElementById('subtask').value;

    let task = {
        'title': titles,
        'description': descriptions,
        'category': categorys,
        'dueDates': dueDates,
        'assignedTo': assignedTos,
        'prio': prios,
        'subtask': subtasks,
        'id': new Date().getTime(),
        'list': 'todo'

    };

    allTasks.push(task);


    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
    console.log('Beginn', allTasks);

    addTasking()
    inputfieldValue()
}

function addTasking() {
    let todos = allTasks.filter(t => t['list'] == 'todo');
    let progresses = allTasks.filter(t => t['list'] == 'progress');
    let feedbacks = allTasks.filter(t => t['list'] == 'feedback');
    let dones = allTasks.filter(t => t['list'] == 'done');

    let containerTodo = document.getElementById('containerTodos');
    let containerProgress = document.getElementById('containerProgresses');
    let containerFeedback = document.getElementById('containerFeedbacks');
    let containerDone = document.getElementById('containerDones');

    containerTodo.innerHTML = '';
    containerProgress.innerHTML = '';
    containerFeedback.innerHTML = '';
    containerDone.innerHTML = '';


    for (let i = 0; i < todos.length; i++) {
        const element = todos[i];

        containerTodo.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < progresses.length; i++) {
        const element = progresses[i];

        containerProgress.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
        <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < feedbacks.length; i++) {
        const element = feedbacks[i];


        containerFeedback.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }

    for (let i = 0; i < dones.length; i++) {
        const element = dones[i];

        containerDone.innerHTML += /*html*/ `
        <div onclick="openCheckTask()" draggable="true" ondragstart="drag(${element['id']})" class="containerBlock">
            <img src="/asseds/img/Frame 113.png">
            <p>${element['title']}</p>
            <p>${element['description']}</p>
            <div class="assignTask">
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
                <div class="divAssignTask"></div>
            </div>
        </div>
        `;

    }



}


function allowDrop(ev) {
    ev.preventDefault();
}

function drop(categorys) {
    let droppedTask = allTasks.filter(x => x.id == currentDraggedElement)
    droppedTask[0]['list'] = categorys;
    addTasking();
}



function drag(id) {
    currentDraggedElement = id;
}


function inputfieldValue() {
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('categoryList').value = '';
    document.getElementById('dueDate').value = '';
    document.getElementById('assignedTo').value = '';
    document.getElementById('prio').value = '';
    document.getElementById('subtask').value = '';
}

/** Area for Category */

function openCategory() {
    let category = document.getElementById('categoryList');
    if (category.classList.contains('d-none')) {
        category.classList.remove('d-none');
        document.getElementById('borderButton').classList.add('borderButton');
    } else {
        category.classList.add('d-none');
        document.getElementById('borderButton').classList.remove('borderButton');
    }
}

function selectCategory(id) {
    liCategory = id.replace('div-', '');
    let ulCategory = document.getElementById("ul-category");
    let category = document.getElementById(id).innerHTML;

    document.getElementById('selected-category').style = 'display: flex; align-items: center; list-style-type: none;';
    document.getElementById("selected-category").innerHTML = category;
    document.getElementById("hidden-category-input").value = '.';
    document.getElementById(liCategory).style = 'margin:0; margin-right: 20px';

    ulCategory.classList.add('d-none');
    document.getElementById("select-div-category").classList.remove('no-border-bottom');

}