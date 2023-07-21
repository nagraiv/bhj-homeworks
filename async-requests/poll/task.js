(() => {
    const title = document.getElementById('poll__title');
    const answerList = document.getElementById('poll__answers');
    answerList.addEventListener('click', (ev) => {
        if (ev.target.tagName === 'BUTTON') {
            alert('Спасибо, ваш голос засчитан!');
            const postRequest = new XMLHttpRequest();
            postRequest.open( 'POST', URL );
            postRequest.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
            postRequest.send(`vote=${title.dataset.id}&answer=${ev.target.dataset.index}` );
            postRequest.onreadystatechange = () => {
                if (postRequest.readyState === postRequest.DONE && postRequest.status < 300) {
                    // console.log(postRequest.responseText);
                    const { stat } = JSON.parse(postRequest.responseText);
                    answerList.textContent = '';
                    const total = stat.reduce((acc, el) => acc + el.votes, 0) / 100;
                    stat.forEach((item) => {
                        answerList.insertAdjacentHTML('beforeend', `
                            <div>${item.answer} <strong>${(item.votes / total).toFixed(2)}%</strong></div>
                        `);
                    });
                }
            };
        }
    });

    const URL = 'https://students.netoservices.ru/nestjs-backend/poll';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            // console.log(xhr.responseText);
            const { id, data } = JSON.parse(xhr.responseText);
            title.textContent = data.title;
            title.dataset.id = id;
            data.answers.forEach((answer, index) => {
                answerList.insertAdjacentHTML('beforeend', `
                    <button class="poll__answer" data-index="${index}">${answer}</button>
                `);
            });
        }
    };
})();
