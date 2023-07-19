(() => {
    'use strict';

    [...document.querySelectorAll('.product__quantity-control_inc')].forEach(el => {
        el.addEventListener('click', () => {
            const valueEl = el.closest('.product__quantity').querySelector('.product__quantity-value');
            let count = parseInt(valueEl.textContent);
            valueEl.textContent = (count + 1).toString();
        })
    });

    [...document.querySelectorAll('.product__quantity-control_dec')].forEach(el => {
        el.addEventListener('click', () => {
            const valueEl = el.closest('.product__quantity').querySelector('.product__quantity-value');
            let count = parseInt(valueEl.textContent);
            valueEl.textContent = count > 1 ? (count - 1).toString() : '0';
        })
    });

    const cart = document.querySelector('.cart__products');
    const productList = document.querySelector('.products');
    [...document.querySelectorAll('.product__add')].forEach(el => {
        el.addEventListener('click', () => {
            const productEl = el.closest('.product');
            const amount = parseInt(productEl.querySelector('.product__quantity-value').textContent);
            if (amount) {
                // проверяем, есть ли в корзине товар с таким же id
                let productInCart = cart.querySelector(`[data-id="${productEl.dataset.id}"]`);
                if (productInCart) {
                    const countEl = productInCart.querySelector('.cart__product-count');
                    countEl.textContent = (parseInt(countEl.textContent) + amount).toString();
                } else {
                    cart.parentElement.classList.remove('hide');
                    productInCart = addProductToCart(productEl, amount);
                    // новый товар в корзине невидимый до тех пор, пока не завершится анимация движения картинки
                    productInCart.style.opacity = '0';
                }
                pictureMoves(productEl.querySelector('img'), productInCart.querySelector('img'));
                addProductToLocalStorage(productEl.dataset.id, amount);
            }
        })
    });

    document.addEventListener('DOMContentLoaded', () => {
        // localStorage.clear();
        // восстанавливаем корзину из локального хранилища
        const cartString = localStorage.getItem('cart');
        const cartObj = JSON.parse(cartString);
        for (let key of Object.keys(cartObj)) {
            let productEl = productList.querySelector(`[data-id="${+key}"]`);
            addProductToCart(productEl, cartObj[key]);
        }
        if (cart.children.length) {
            cart.parentElement.classList.remove('hide');
        } else {
            cart.parentElement.classList.add('hide');
        }
    });

    function addProductToCart(productEl, amount) {
        const productInCart = productEl.cloneNode(false);
        productInCart.className = 'cart__product';
        productInCart.insertAdjacentHTML('afterbegin',
            `<img class="cart__product-image" alt=""
                      src="${productEl.querySelector('img').getAttribute('src')}">`);
        productInCart.insertAdjacentHTML('beforeend',
            `<div class="cart__product-count">${amount}</div>`);
        productInCart.insertAdjacentHTML('beforeend',
            '<div class="cart__product-remove">X</div>');
        productInCart.onclick = removeHandler;
        return cart.appendChild(productInCart);
    }

    function removeHandler(event) {
        if (event.target === event.currentTarget.lastElementChild) {
            event.currentTarget.remove();
            removeProductToLocalStorage(event.currentTarget.dataset.id);
            if (!cart.children.length) {
                cart.parentElement.classList.add('hide');
            }
        }
    }

    function addProductToLocalStorage(id, amount) {
        const cartString = localStorage.getItem('cart');
        if (cartString) {
            const cartObj = JSON.parse(cartString);
            if (id in cartObj) {
                cartObj[id] += amount;
            } else {
                cartObj[id] = amount;
            }
            localStorage.setItem('cart', JSON.stringify(cartObj));
        } else {
            const cartObj = {};
            cartObj[id] = amount;
            localStorage.setItem('cart', JSON.stringify(cartObj));
        }
    }

    function removeProductToLocalStorage(id) {
        try {
            const cartString = localStorage.getItem('cart');
            const cartObj = JSON.parse(cartString);
            delete cartObj[id];
            localStorage.setItem('cart', JSON.stringify(cartObj));
        } catch (e) {
            console.warn('Не получилось удалить товар из локального хранилища', e);
        }
    }

    function pictureMoves(productImg, imgInCart) {
        // поверх изображения в списке товаров создаём картинку-дубликат
        let { left, top } = productImg.getBoundingClientRect();
        const img = productImg.cloneNode(false);
        img.style.position = 'absolute';
        img.style.top = top + window.scrollY + 'px';
        img.style.left = left + window.scrollX + 'px';
        document.body.appendChild(img);
        // получаем координаты места назначения
        const dstX = imgInCart.getBoundingClientRect().left;
        const dstY = imgInCart.getBoundingClientRect().top;
        let n = 20;
        // вычисляем размер шага по горизонтали и вертикали
        const x = (dstX - left) / n;
        const y = (dstY - top) / n;
        let interval = setInterval(() => {
            n -= 1;
            const { left, top } = img.getBoundingClientRect();
            img.style.top = y + top + window.scrollY + 'px';
            img.style.left = x + left + window.scrollX + 'px';
            if (n < 1) {
                clearInterval(interval);
                imgInCart.parentElement.style.opacity = '1';
                img.remove();
            }
        }, 10);
    }
})();
