(function () {
    const counterEl = document.getElementById('clicker__counter');
    const cookie = document.getElementById('cookie');
    const speedEl = document.getElementById('clicker__speed');

    let counter = parseInt(counterEl.textContent);
    if (isNaN(counter)) {
        counter = 0;
    }
    let start;
    cookie.onclick = function() {
        counter += 1;
        counterEl.textContent = counter;
        if (counter%2) {
            cookie.setAttribute('width', '250');
        } else {
            cookie.setAttribute('width', '200');
        }
        if (!start) {
            start = new Date();
            speedEl.textContent = '1';
        } else {
            let now = new Date();
            speedEl.textContent = ((counter * 1000) / (now - start)).toFixed(2);
        }
    }

    const button = document.querySelector('.button');
    button.onclick = function() {
        start = null;
        counter = 0;
        counterEl.textContent = '0';
        speedEl.textContent = '0';
        cookie.setAttribute('width', '200');
    }
})();
