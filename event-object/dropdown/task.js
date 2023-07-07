(() => {
    const valueEl = document.querySelector('.dropdown__value');
    const dropdownMenu = document.querySelector('.dropdown__list');
    valueEl.onclick = () => dropdownMenu.classList.toggle('dropdown__list_active');

    const dropdownList = [...document.querySelectorAll('.dropdown__link')];
    dropdownList.forEach(node => {
        node.addEventListener('click', (ev) => {
            ev.preventDefault();
            valueEl.textContent = node.textContent;
            node.closest('.dropdown__list').classList.remove('dropdown__list_active');
        });
    });
})();
