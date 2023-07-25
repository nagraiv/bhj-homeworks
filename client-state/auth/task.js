(()=> {
    const URL = 'https://students.netoservices.ru/nestjs-backend/auth';
    const authForm = document.getElementById('signin__form');
    authForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL);
        xhr.onreadystatechange = () => {
            if (xhr.status >= 400) {
                console.warn('Произошла ошибка при передачи данных!');
                return;
            }
            if (xhr.readyState === xhr.DONE) {
                const response = JSON.parse(xhr.response);
                // console.log(response);
                if (response.success) {
                    showWelcome(response.user_id);
                    localStorage.setItem('user_id', JSON.stringify(response.user_id));
                } else {
                    alert('Неверный логин/пароль');
                }
            }
        };
        const formData = new FormData(this);
        // console.log(formData);
        xhr.send(formData);
        authForm.reset();
    });

    window.addEventListener('load', () => {
        // localStorage.clear();
        const user_id = JSON.parse(localStorage.getItem('user_id'));
        // console.log(user_id);
        if (user_id) {
            showWelcome(user_id);
        }
    });

    function showWelcome(id) {
        authForm.parentElement.classList.remove('signin_active');
        document.getElementById('user_id').textContent = id;
        document.getElementById('welcome').classList.add('welcome_active');
    }

    document.querySelector('.exit').onclick = () => {
        document.getElementById('welcome').classList.remove('welcome_active');
        authForm.parentElement.classList.add('signin_active');
        localStorage.removeItem('user_id');
    };
})();
