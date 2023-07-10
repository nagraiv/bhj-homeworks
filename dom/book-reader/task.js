(() => {
    const bookEl = document.getElementById('book');

    const sizeControls = [...document.querySelectorAll('.font-size')];
    sizeControls.forEach((node) => {
        node.addEventListener('click', (event) => {
            event.preventDefault();
            sizeControls.forEach(el => el.classList.remove('font-size_active'));
            node.classList.add('font-size_active');
            // если у bookEl изменён размер шрифта, то
            // в sizeClass будет записано название класса, начинающийся на book_fs...
            const sizeClass = [...bookEl.classList].filter(el => el.startsWith('book_fs'));
            bookEl.classList.remove(...sizeClass);
            // получаем значение аттрибута data-size у выбранного переключателя node
            const size = node.getAttribute('data-size');
            if (size) {
                bookEl.classList.add(`book_fs-${size}`);
            }
        });
    });

    const textControls = [...document.querySelector('.book__control_color')
        .querySelectorAll('.color')];
    textControls.forEach((node) => {
        node.addEventListener('click', (event) => {
            event.preventDefault();
            textControls.forEach(el => el.classList.remove('color_active'));
            node.classList.add('color_active');
            // в colorClass будет записано название класса, начинающийся на book_color...
            const colorClass = [...bookEl.classList].filter(el => el.startsWith('book_color'));
            bookEl.classList.remove(...colorClass);
            const color = node.getAttribute('data-text-color');
            bookEl.classList.add(`book_color-${color}`);
        });
    });

    const bgControls = [...document.querySelector('.book__control_background')
        .querySelectorAll('.color')];
    bgControls.forEach((node) => {
        node.addEventListener('click', (event) => {
            event.preventDefault();
            bgControls.forEach(el => el.classList.remove('color_active'));
            node.classList.add('color_active');
            // в colorClass будет записано название класса, начинающийся на book_bg...
            const colorClass = [...bookEl.classList].filter(el => el.startsWith('book_bg'));
            bookEl.classList.remove(...colorClass);
            const color = node.getAttribute('data-bg-color');
            bookEl.classList.add(`book_bg-${color}`);
        });
    });
})();
