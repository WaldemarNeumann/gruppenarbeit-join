let allTasks = [];
let prio;
let subtasks = [];
i = 0;
setURL('http://developerakademie.com/smallest_backend_ever');

async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];

}


function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let category = document.getElementById('category');
    let dueDate = document.getElementById('dueDate');

    let task = {
        'title': title.value,
        'description': description.value,
        'category': category.value,
        'dueDate': dueDate.value,
        'priority': prio,
        'subtask': subtask,
        'assigned': assigned
    };
    allTasks.push(task);

    let allTasksAsString = JSON.stringify(allTasks);
    localStorage.setItem('allTasks', allTasksAsString);
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    allTasks = JSON.parse(allTasksAsString);
}



function changeColorRed() {
    console.log('red', red)
    if (red) {
        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';
        red = false;
        yellow = false;
        green = false;

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';


    } else {
        document.getElementById('red').classList.add('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-weiss.png';
        red = true;
        green = false;
        yellow = false;

        document.getElementById('yellow').classList.remove('yellow');
        document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
    }


}

function changePrioUrgent() {
    prio;
    prio = 'urgent';
}

function changeColorYellow() {
    changePrioMedium();
    document.getElementById('yellow').classList.add('yellow');
    document.getElementById('yellowImg').src = 'asseds/img/medium-weiss.png';
    function changeColorYellow() {
        console.log('yellow', yellow)

        if (yellow) {
            document.getElementById('yellow').classList.remove('yellow');
            document.getElementById('yellowImg').src = '/asseds/img/medium-gelb.png';
            red = false;
            yellow = false;
            green = false;
        } else {
            document.getElementById('yellow').classList.add('yellow');
            document.getElementById('yellowImg').src = '/asseds/img/medium-weiss.png';
            yellow = true;
            red = false;
            green = false;
        }



        document.getElementById('red').classList.remove('red');
        document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

        document.getElementById('green').classList.remove('green');
        document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
    }
}

function changePrioMedium() {
    prio;
    prio = 'medium';
}

function changeColorGreen() {
    changePrioLow();
    document.getElementById('green').classList.add('green');
    document.getElementById('greenImg').src = 'asseds/img/pfeil-unten-weiss.png';
    function changeColorGreen() {
        console.log('green', green)
        if (green) {
            document.getElementById('green').classList.remove('green');
            document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-grün.png';
            red = false;
            yellow = false;
            green = false;
        } else {
            document.getElementById('green').classList.add('green');
            document.getElementById('greenImg').src = '/asseds/img/pfeil-unten-weiss.png';
            green = true;
            red = false;
            yellow = false;
        }
    }

    document.getElementById('red').classList.remove('red');
    document.getElementById('redImg').src = '/asseds/img/pfeil-oben-rot.png';

    document.getElementById('yellow').classList.remove('yellow');
    document.getElementById('yellowImg').src = 'asseds/img/medium-gelb.png';
}

function changePrioLow() {
    prio;
    prio = 'low';
}


function renderSubtask() {
    let subtask = document.getElementById('subtask').value;
    document.getElementById('subtask').value = '';

    generateSubtask(subtask, i);
    i++;
}

function generateSubtask(subtask, i) {

    return document.getElementById('renderSubtask').innerHTML += `
    <div class="subtaskContainer">
    <input onclick="checkSubtask('${subtask}')" class="checkbox" type="checkbox">
    <p id="getSubtask">${subtask}</p>
    </div>
    `;
}

function checkSubtask(subtask) {
    subtasks.push(subtask);
    console.log(subtask);
}


function dropDownCategory() {
    document.getElementById("category").classList.toggle("show");

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.drop')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

function dropDownAssign() {
    document.getElementById("assign").classList.toggle("show");

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.drop')) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}

