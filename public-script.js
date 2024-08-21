const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Cargar tareas existentes
document.addEventListener('DOMContentLoaded', getTasks);

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value;

    const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
    });

    const task = await res.json();
    addTaskToList(task);
    taskInput.value = '';
});

// Obtener tareas del servidor
async function getTasks() {
    const res = await fetch('/api/tasks');
    const tasks = await res.json();
    tasks.forEach(task => addTaskToList(task));
}

// Añadir tarea a la lista
function addTaskToList(task) {
    const li = document.createElement('li');
    li.dataset.id = task._id;
    li.innerHTML = `
        <span>${task.title}</span>
        <button onclick="deleteTask('${task._id}')">Eliminar</button>
    `;
    taskList.appendChild(li);
}

// Eliminar tarea
async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, {
        method: 'DELETE'
    });
    document.querySelector(`[data-id="${id}"]`).remove();
}
