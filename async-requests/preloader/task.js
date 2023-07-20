(() => {
    const loader = document.getElementById('loader');
    const currencyList = document.getElementById('items');
    let inCache = false;

    const URL = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.status >= 300) {
            console.warn('Произошла ошибка во время загрузки данных!');
        }
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            const { response } = JSON.parse(xhr.responseText);

            loader.classList.remove('loader_active');

            const storageObj = {};
            for (let currency in response['Valute']) {
                let key = response['Valute'][currency]['CharCode'];
                let value = response['Valute'][currency]['Value'];
                storageObj[key] = value;
                if (!inCache) {
                    addCurrency(key, value);
                }
            }
            localStorage.setItem('currency', JSON.stringify(storageObj));
            console.log('Курсы валют сохранены в кэш');
        }
    };

    window.onload = () => {
        // localStorage.clear();
        try {
            const storageString = localStorage.getItem('currency');
            const storageObj = JSON.parse(storageString);
            if (!storageString || !storageObj) {
                throw new Error('Не удалось восстановить данные из кэша');
            }
            for (let code in storageObj) {
                addCurrency(code, storageObj[code]);
            }
            console.log('Курс валют восстановлен из кэша');
            inCache = true;
        }
        catch(e) {
            console.warn(e);
            inCache = false;
        }
    };

    function addCurrency(code, value) {
        currencyList.insertAdjacentHTML('beforeend', `
          <div class="item">
            <div class="item__code">${code}</div>
            <div class="item__value">${value}</div>
            <div class="item__currency">руб.</div>
          </div>        
        `);
    }
})();
