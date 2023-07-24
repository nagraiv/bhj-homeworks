(() => {
    const textarea = document.getElementById('editor');
    const clearBtn = document.getElementById('clear');
    clearBtn.addEventListener('click', () => {
        textarea.value = '';
        localStorage.removeItem('text');
    });
    const inputHandler = () => {
        localStorage.setItem('text', JSON.stringify(textarea.value));
    }
    // тормозящий декоратор, применяется к обработчику input
    const throttle = (func, delay) => {
        let isCalled = false;
        return function(...args) {
            if (isCalled) {
                return;
            }
            isCalled = true;
            func(...args);
            setTimeout( () => {
                isCalled = false;
            }, delay);
        }
    }
    const throttleInputHandler = throttle(inputHandler, 1000);

    textarea.addEventListener('input', throttleInputHandler);

    window.onload = () => {
        try {
            textarea.value = JSON.parse(localStorage.getItem('text'));
        } catch {
            console.warn('Не удалось восстановить текст');
        }
    }
})();
