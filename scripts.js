document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    let tasks = [];

    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const taskInput = document.getElementById('task-input').value;
        const taskDate = document.getElementById('task-date').value;
        
        if (taskInput.trim() && taskDate) {
            const task = {
                id: Date.now(),
                text: taskInput,
                date: new Date(taskDate),
                completed: false
            };

            tasks.push(task);
            updateTaskList();
            taskForm.reset();
        }
    });

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add(task.completed ? 'completed' : '');
            taskItem.innerHTML = `
                <span>${task.text} - <small>${task.date.toLocaleString()}</small></span>
                <div class="actions">
                    <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </div>
            `;
            taskList.appendChild(taskItem);

            // Complete Task
            taskItem.querySelector('.complete').addEventListener('click', () => {
                task.completed = !task.completed;
                updateTaskList();
            });

            // Edit Task
            taskItem.querySelector('.edit').addEventListener('click', () => {
                const newText = prompt('Edit Task', task.text);
                const newDate = prompt('Edit Date (YYYY-MM-DDTHH:MM)', task.date.toISOString().slice(0, 16));
                if (newText && newDate) {
                    task.text = newText;
                    task.date = new Date(newDate);
                    updateTaskList();
                }
            });

            // Delete Task
            taskItem.querySelector('.delete').addEventListener('click', () => {
                tasks = tasks.filter(t => t.id !== task.id);
                updateTaskList();
            });
        });
    }
});
