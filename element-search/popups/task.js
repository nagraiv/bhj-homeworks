(() => {
    const mainModal = document.getElementById('modal_main');
    const successModal = document.getElementById('modal_success');
    const showSuccessBtn = document.querySelector('.show-success');
    const closeList = [...document.querySelectorAll('.modal__close')];

    mainModal.classList.add('modal_active');

    showSuccessBtn.onclick = () => successModal.classList.add('modal_active');

    closeList.forEach((node) => {
        node.addEventListener('click', () => {
            node.closest('.modal').classList.remove('modal_active');
        });
    });
})();
