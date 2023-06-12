
onload();

function onload() {

    const tasksList = getTasksFromStorage();

    displayTasks(tasksList);

    taskBox.focus();
}


function addTask() {

    const isValid = validation();
    if (!isValid) return;

    const tasks = getTask();

    const tasksList = getTasksFromStorage();

    tasksList.push(tasks);

    saveListToStorage(tasksList);

    displayTasks(tasksList);

    fadeIn();

    clearForm();
}

function validation() {

    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const taskBoxErr = document.getElementById("taskBoxErr");


    task = taskBox.value;
    date = dateBox.value;
    time = timeBox.value;

    taskBoxErr.innerText = "";
    dateBox.style.background = "";
    timeBox.style.background = "";

    if (task === "") {

        taskBoxErr.innerText = "Please Enter Your Task!";
        taskBox.focus();
        return false;
    }

    if (date === "") {

        dateBox.focus();
        dateBox.style.background = "antiquewhite";
        return false;

    }

    if (time === "") {

        timeBox.focus();
        timeBox.style.background = "antiquewhite";
        return false;

    }
    return true;

}


function getTask() {

    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");

    const task = taskBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const tasks = {

        task: task,
        date: date,
        time: time
    }

    return tasks;
}


function getTasksFromStorage() {

    const str = localStorage.getItem("tasks");

    const tasksList = (str === null) ? [] : JSON.parse(str);

    return tasksList;
}

function saveListToStorage(arr) {

    const str = JSON.stringify(arr);
    localStorage.setItem("tasks", str);

}



function displayTasks(tasksList) {

    const divBox = document.getElementById("divBox");

    let index = 0;
    divBox.innerHTML = "";

    for (const tasks of tasksList) {

        divBox.innerHTML += `

        <div class="displayNote" onmouseenter="showIbox(${index})" onmouseleave="hideIbox(${index})" >

                <p> ${tasks.task}</p> 
                <p class="dateValue"> ${tasks.date}</p>
                <p class="timeValue"> ${tasks.time}</p>
                <p><i id="iBox${index}" onclick="deleteTask(${index})" class="fa-solid fa-xmark" ></i></p>

        </div>
        `;

        index++;
    }

}


function deleteTask(index) {

    const tasksList = getTasksFromStorage();

    tasksList.splice(index, 1);

    saveListToStorage(tasksList);

    displayTasks(tasksList);
}


function clearForm() {
    const taskBox = document.getElementById("taskBox");
    const dateBox = document.getElementById("dateBox");
    const timeBox = document.getElementById("timeBox");
    const taskBoxErr = document.getElementById("taskBoxErr");

    taskBoxErr.innerText = "";
    dateBox.style.background = "";
    timeBox.style.background = "";

    taskBox.value = "";
    dateBox.value = "";
    timeBox.value = "";

}

function showIbox(index) {

    const iBox = document.getElementById(`iBox${index}`);
    iBox.style.visibility = "visible";
}

function hideIbox(index) {

    const iBox = document.getElementById(`iBox${index}`);
    iBox.style.visibility = "hidden";
}




function fadeIn() {

    const note = document.lastElementChild.getElementsByClassName("displayNote");
    console.log(note);
    note[note.length - 1].classList.add("animation");

}


