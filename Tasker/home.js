var task1 = document.querySelector('.task1');
task1.style.display = 'none';

var list = document.getElementById('catlist');

list.style.display = 'none';
var Tasks = document.querySelector('.Tasks');
// Tasks.style.display = 'none';

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
var maincontent = document.querySelector('.part1')

addtask.addEventListener('click' , function(){
    popup.style.display = 'block';
    maincontent.style.filter = 'blur(2px)'
});

var cancel = document.getElementById('cancel');
cancel.addEventListener('click' , function(){
    popup.style.display = 'none';
    maincontent.style.filter = 'none';
})

var add = document.getElementById('add');
add.addEventListener('click', function() {
    var taskName = document.querySelector('.inputname').value;
    var categorySelect = document.querySelector('.popupselect select');
    var category = categorySelect.options[categorySelect.selectedIndex].text;

    var taskContainer = document.createElement('div');
    taskContainer.className = 'task1';

    var innerDiv = document.createElement('div');
    var inputRadio = document.createElement('input');
    inputRadio.type = 'checkbox';
    inputRadio.value = 'Type of task';
    inputRadio.className = 'radio';

    var typoDiv = document.createElement('div');
    typoDiv.className = 'typo';

    var pTaskName = document.createElement('p');
    pTaskName.textContent = taskName;
    pTaskName.id = 'taskname';  

    var pCategory = document.createElement('p');
    pCategory.textContent = category;
    pCategory.className = 'typeoftask';

    var editIconDiv = document.createElement('div');
    editIconDiv.className = 'edicon';

    var editIcon = document.createElement('img');
    editIcon.src = './assets/edit icon.png';
    editIcon.className = 'editicon';

    var deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/delete icon.png';
    deleteIcon.className = 'delicon';

    
    typoDiv.appendChild(pTaskName);
    typoDiv.appendChild(pCategory);

    innerDiv.appendChild(inputRadio);
    innerDiv.appendChild(typoDiv);

    editIconDiv.appendChild(editIcon);
    editIconDiv.appendChild(deleteIcon);

    taskContainer.appendChild(innerDiv);
    taskContainer.appendChild(editIconDiv);

    var tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.appendChild(taskContainer);

    // var taskContainer = document.getElementById('tasksContainer');

    taskContainer.addEventListener('change', function(e) {
        if (e.target.className === 'radio') {
            // var typoDiv = e.target.parentNode.querySelector('.typo');
            if (e.target.checked) {
                pTaskName.style.textDecoration = 'line-through';
            } else {
                pTaskName.style.textDecoration = 'none';
            }
        }
    });
    var all = document.getElementById('all');

        all.addEventListener('click', function() {

          
  
        Array.from(taskContainer.children).forEach(function(task) {
            task.style.display = 'flex'; // Ensure this affects the entire task block
        });
    });

    document.getElementById('done').addEventListener('click', function() {
        Array.from(taskContainer.children).forEach(function(task) {
            var checkbox = task.querySelector('.radio');
            if (checkbox && checkbox.checked) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });

    document.getElementById('notdone').addEventListener('click', function() {
        Array.from(taskContainer.children).forEach(function(task) {
            var checkbox = task.querySelector('.radio');
            if (checkbox && !checkbox.checked) {
                task.style.display = 'flex';
            } else {
                task.style.display = 'none';
            }
        });
    });

    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.part1').style.filter = 'none';
});

// document.querySelectorAll('.listval li').forEach(function(item) {
//     item.addEventListener('click', function() {
//         const category = item.getAttribute('data-category');
//         const tasks = document.querySelectorAll('.task1');
//         tasks.forEach(task => {
//             if (task.getAttribute('data-category') === category) {
//                 task.classList.remove('hidden');
//             } else {
//                 task.classList.add('hidden');
//             }
//         });
//     });
// });

// // Optional: Adding an event to show all tasks
// document.getElementById('allTasks').addEventListener('click', function() {
//     const tasks = document.querySelectorAll('.task1');
//     tasks.forEach(task => {
//         task.classList.remove('hidden');
//     });
// });

document.addEventListener('DOMContentLoaded', function () {
    var allButton = document.getElementById('all');
    var doneButton = document.getElementById('done');
    var notDoneButton = document.getElementById('notdone');

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

    });

    doneButton.addEventListener('click', function() {
        resetButtons();
        doneButton.style.backgroundColor = 'green';  
        doneButton.style.color = 'white'; 
    });

    notDoneButton.addEventListener('click', function() {
        resetButtons(); 
        notDoneButton.style.backgroundColor = 'green'; 
        notDoneButton.style.color = 'white'; 
    });
});
