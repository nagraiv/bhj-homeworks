(() => {
    const URL = 'https://students.netoservices.ru/nestjs-backend/upload';
    const progress = document.getElementById('progress');
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        // const fileEl = document.getElementById("file");
        // const formData = new FormData();
        // formData.append('file', fileEl.files[0]);
        // console.log(formData, fileEl);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true);
        // xhr.enctype='multipart/form-data';
        // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(formData);
        xhr.onprogress = (e) => {
            console.log(`Получено ${e.loaded} из ${e.total} байт`);
            progress.value = (e.loaded / e.total).toFixed(2);
        };
        // xhr.upload.onprogress = (event) => {
        //     console.log('progress:', event.loaded);
        //     progress.value = (event.loaded / event.total).toFixed(2);
        // };
        xhr.onload = () => {
            setTimeout(() => {
                alert('Файл успешно загружен.')
            });
        };
        xhr.onerror = () => {
            console.log(`Ошибка при выполнении запроса`);
        };
    });
})();
