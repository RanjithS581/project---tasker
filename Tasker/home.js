var task1 = document.querySelector('.task1');
task1.style.display = 'none';

var list = document.getElementById('catlist');
list.style.display = 'none';

document.getElementById('categories').addEventListener('click', function() {
    if (list.style.display == 'none') {
        list.style.display = 'block';
        console.log("true")
    } else {
        list.style.display = 'none';
        console.log("false")
    }
});

var addtask = document.getElementById('addtask');
var popup = document.querySelector('.popup');
var maincontent = document.querySelector('.part1');
var editingIndex = -1; 

addtask.addEventListener('click', function() {
    popup.style.display = 'block';
    maincontent.style.filter = 'blur(2px)';
});

var cancel = document.getElementById('cancel');
cancel.addEventListener('click', function() {
    popup.style.display = 'none';
    maincontent.style.filter = 'none';
    resetPopup();
});

var add = document.getElementById('add');

add.addEventListener('click', function() {
    var taskName = document.querySelector('.inputname').value;
    var categorySelect = document.querySelector('.popupselect select');
    var category = categorySelect.options[categorySelect.selectedIndex].text;

    if (!taskName.trim()) {
        alert('Task name cannot be empty');
        return;
    }

    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];

    if (editingIndex > -1) {
        // Update existing task
        taskdata[editingIndex].Taskname = taskName;
        taskdata[editingIndex].category = category;
        editingIndex = -1;
    } else {
        // Add new task
        taskdata.push({ Taskname: taskName, category: category });
    }

    localStorage.setItem('taskdata', JSON.stringify(taskdata));
    resetPopup();
    displayTasks();
});

function resetPopup() {
    document.querySelector('.inputname').value = '';
    document.querySelector('.popupselect select').selectedIndex = 0;
    popup.style.display = 'none';
    maincontent.style.filter = 'none';
}

function displayTasks() {
    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];
    var tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = '';

    taskdata.forEach(function(task, index) {
        var taskContainer = document.createElement('div');
        taskContainer.className = 'task1';
        taskContainer.id = 'task_' + index; // Assign a unique ID

        var innerDiv = document.createElement('div');

        var inputRadio = document.createElement('input');
        inputRadio.type = 'checkbox';
        inputRadio.className = 'radio';

        var typoDiv = document.createElement('div');
        typoDiv.className = 'typo';

        var pTaskName = document.createElement('p');
        pTaskName.textContent = task.Taskname;
        pTaskName.className = 'task-name';
        pTaskName.id = 'taskname_' + index;

        var pCategory = document.createElement('p');
        pCategory.textContent = task.category;
        pCategory.className = 'typeoftask';

        var iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';

        var editIcon = document.createElement('img');
        editIcon.src = './assets/edit icon.png';
        editIcon.className = 'editicon';
        editIcon.setAttribute('data-index', index);

        var deleteIcon = document.createElement('img');
        deleteIcon.src = './assets/delete icon.png';
        deleteIcon.className = 'delicon';
        deleteIcon.setAttribute('data-index', index);

        typoDiv.appendChild(pTaskName);
        typoDiv.appendChild(pCategory);

        innerDiv.appendChild(inputRadio);
        innerDiv.appendChild(typoDiv);

        iconContainer.appendChild(editIcon);
        iconContainer.appendChild(deleteIcon);

        taskContainer.appendChild(innerDiv);
        taskContainer.appendChild(iconContainer);

        tasksContainer.appendChild(taskContainer);
    });



    tasksContainer.addEventListener('change', function(event) {
        if (event.target.classList.contains('radio')) {
            var taskNameElement = event.target.closest('.task1').querySelector('.task-name');
            if (event.target.checked) {
                taskNameElement.style.textDecoration = 'line-through';
            } else {
                taskNameElement.style.textDecoration = 'none';
            }
        }
    });

    // Add event listeners for edit and delete icons
    tasksContainer.querySelectorAll('.editicon').forEach(function(editIcon) {
        editIcon.addEventListener('click', function(event) {
            var index = event.target.getAttribute('data-index');
            editTask(index);
        });
    });

    tasksContainer.querySelectorAll('.delicon').forEach(function(deleteIcon) {
        deleteIcon.addEventListener('click', function(event) {
            var index = event.target.getAttribute('data-index');
            deleteTask(index);
        });
    });
}

displayTasks();

function editTask(index) {
    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];
    var task = taskdata[index];

    if (task) {
        document.querySelector('.inputname').value = task.Taskname;
        var categorySelect = document.querySelector('.popupselect select');
        for (var i = 0; i < categorySelect.options.length; i++) {
            if (categorySelect.options[i].text === task.category) {
                categorySelect.selectedIndex = i;
                break;
            }
        }

        popup.style.display = 'block';
        maincontent.style.filter = 'blur(2px)';
        editingIndex = index;
    }
}

function deleteTask(index) {
    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];
    if (confirm('Are you sure you want to delete this task?')) {
    taskdata.splice(index, 1);
    localStorage.setItem('taskdata', JSON.stringify(taskdata));
    }
    displayTasks();
}

document.addEventListener('DOMContentLoaded', function() {
    displayTasks();

    var allButton = document.getElementById('all');
    var doneButton = document.getElementById('done');
    var notDoneButton = document.getElementById('notdone');
    var tasksContainer = document.getElementById('tasksContainer');

    function resetButtons() {
        allButton.style.backgroundColor = 'transparent';
        doneButton.style.backgroundColor = 'transparent';
        notDoneButton.style.backgroundColor = 'transparent';
        allButton.style.color = 'black';
        doneButton.style.color = 'black';
        notDoneButton.style.color = 'black';
    }

    allButton.addEventListener('click', function() {
        resetButtons();
        allButton.style.backgroundColor = 'green';
        allButton.style.color = 'white';
        Array.from(tasksContainer.children).forEach(function(task) {
            task.style.display = 'flex'; 
        });
    });

    doneButton.addEventListener('click', function() {
        resetButtons();
        doneButton.style.backgroundColor = 'green';
        doneButton.style.color = 'white';
        Array.from(tasksContainer.children).forEach(function(task) {
            var checkbox = task.querySelector('.radio');
            if (checkbox && checkbox.checked) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none'; 
            }
        });
    });

    notDoneButton.addEventListener('click', function() {
        resetButtons();
        notDoneButton.style.backgroundColor = 'green';
        notDoneButton.style.color = 'white';
        Array.from(tasksContainer.children).forEach(function(task) {
            var checkbox = task.querySelector('.radio');
            if (checkbox && !checkbox.checked) {
                task.style.display = 'flex'; 
            } else {
                task.style.display = 'none'; 
            }
        });
    });
});

var home = document.querySelector('.worksH');
home.addEventListener('click', function() {
    home.style.backgroundColor = 'green';
    console.log("Clicked on Home");

    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];

    taskdata.forEach(function(task, index) {
        var taskContainer = document.getElementById('task_' + index); 
        if (taskContainer) { 
            if (task.category.includes('Home')) { 
                taskContainer.style.display = 'flex';
            } else {
                taskContainer.style.display = 'none';
            }
        }
    });
});

var school = document.querySelector('.worksS');
school.addEventListener('click', function() {
    school.style.backgroundColor = 'lightpink';
    console.log("Clicked on School");

    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];

    taskdata.forEach(function(task, index) {
        var taskContainer = document.getElementById('task_' + index); 
        if (taskContainer) { 
            if (task.category.includes('School')) { 
                taskContainer.style.display = 'flex';
            } else {
                taskContainer.style.display = 'none';
            }
        }
    });
});

var shopping_list = document.querySelector('.worksSH');
shopping_list.addEventListener('click', function() {
    shopping_list.style.backgroundColor = 'yellow';
    console.log("Clicked on Shopping_list");

    var taskdata = JSON.parse(localStorage.getItem('taskdata')) || [];

    taskdata.forEach(function(task, index) {
        var taskContainer = document.getElementById('task_' + index); 
        if (taskContainer) { 
            if (task.category.includes('Shopping List')) { 
                taskContainer.style.display = 'flex';
            } else {
                taskContainer.style.display = 'none';
            }
        }
    });
});
