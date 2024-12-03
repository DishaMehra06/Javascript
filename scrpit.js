document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete">X</button>
    `;

    li.addEventListener('click', toggleComplete);
    li.querySelector('.delete').addEventListener('click', deleteTask);

    taskList.appendChild(li);

    saveTasks();
    taskInput.value = '';
}

function toggleComplete(e) {
    if (e.target.tagName === 'LI' || e.target.tagName === 'SPAN') {
        e.currentTarget.classList.toggle('completed');
        saveTasks();
    }
}

function deleteTask(e) {
    e.stopPropagation();
    e.currentTarget.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => ({
        text: li.querySelector('span').innerText,
        completed: li.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete">X</button>
        `;
        if (task.completed) li.classList.add('completed');
        li.addEventListener('click', toggleComplete);
        li.querySelector('.delete').addEventListener('click', deleteTask);

        taskList.appendChild(li);
    });
}
