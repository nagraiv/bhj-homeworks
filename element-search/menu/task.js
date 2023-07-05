(() => {
    const menuArray = Array.from(document.querySelectorAll('.menu__link'));
    menuArray.forEach((node) => {
        node.addEventListener('click', (e) => {
            const subMenu = node.parentNode.querySelector('.menu_sub');
            if (subMenu) {
                e.preventDefault();
                const activeArray = Array.from(document.querySelectorAll('.menu_active'));
                activeArray.forEach((node) => {
                    // закрываем все ДРУГИЕ открытые меню на странице
                    if (node.parentNode !== e.target.parentNode) {
                        node.classList.remove('menu_active');
                    }
                });
                subMenu.classList.toggle('menu_active');
            }
        });
    });
})();
