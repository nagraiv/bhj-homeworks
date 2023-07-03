(function() {
    const timerEl = document.getElementById("timer");
    const intervalID = setInterval(() => {
        timerEl.textContent -= 1;
        if (+timerEl.textContent <= 0) {
            clearInterval(intervalID);
            timerEl.textContent = "0";
            setTimeout(() => {
                alert('Вы победили в конкурсе!');
            });
        }
    }, 1000);

})();
