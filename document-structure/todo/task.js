(() => {
    const removeTask = (e) => {
        e.preventDefault();
        let storageString = localStorage.getItem('todo');
        storageString = storageString.replace(e.target.parentElement.firstElementChild.textContent + ';', '');
        localStorage.setItem('todo', storageString);
        e.target.parentElement.remove();
    }

    const taskList = document.querySelector('.tasks__list');
    const addNewTask = (text, saveTask=false) => {
        const task = document.createElement('div');
        task.className = 'task';
        taskList.appendChild(task);

        task.insertAdjacentHTML('afterbegin', `<div class="task__title">${text}</div>`);
        task.insertAdjacentHTML('beforeend', '<a href="#" class="task__remove">&times;</a>');
        task.lastElementChild.onclick = removeTask;

        if (saveTask) {
            let storageString = localStorage.getItem('todo') || '';
            storageString += text + ';';
            localStorage.setItem('todo', storageString);
        }
    }

    const input = document.getElementById('task__input');
    const form = document.getElementById('tasks__form');
    form.onsubmit = (evt) => {
        evt.preventDefault();
        if (input.value) {
            addNewTask(input.value, true);
        }
        evt.currentTarget.reset();
    }

    document.addEventListener('DOMContentLoaded', () => {
        // localStorage.clear();
        let storageList = localStorage.getItem('todo').split(';').filter(item => !!item);
        storageList.forEach(item => addNewTask(item, false));
    });
})();
