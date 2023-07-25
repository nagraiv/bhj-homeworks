(() => {
    const URL = 'https://students.netoservices.ru/nestjs-backend/upload';
    const progress = document.getElementById('progress');
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        // xhr.onreadystatechange = () => {
        //     console.log(xhr);
        // }
        xhr.open('POST', URL, true);
        xhr.upload.onprogress = (event) => {
            // console.log(`Получено ${event.loaded} из ${event.total} байт`);
            progress.value = (event.loaded / event.total).toFixed(2);
        };
        xhr.upload.onload = () => {
            setTimeout(() => {
                alert('Файл успешно загружен.')
            });
        };
        xhr.upload.onerror = () => {
            console.warn('Ошибка загрузки.');
        };
        const formData = new FormData(form);
        xhr.send(formData);
    });
})();
