const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearTasksBtn = document.getElementById('clear-tasks');

// Event listener para adicionar tarefa
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        saveTaskToLocalStorage(taskText);
    }
});

// Event listener para remover tarefa
taskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const taskItem = event.target.parentElement;
        taskItem.remove();
        removeTaskFromLocalStorage(taskItem.textContent);
    }
});

// Event listener para limpar todas as tarefas
clearTasksBtn.addEventListener('click', function() {
    taskList.innerHTML = '';
    localStorage.clear();
});

// Função para criar elemento de tarefa
function createTaskElement(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-btn';
    taskItem.appendChild(deleteButton);

    return taskItem;
}

// Função para salvar tarefa no localStorage
function saveTaskToLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para carregar tarefas do localStorage
document.addEventListener('DOMContentLoaded', function() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(taskText) {
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
    });
});

// Função para remover tarefa do localStorage
function removeTaskFromLocalStorage(taskText) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index) {
        if (task === taskText) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


