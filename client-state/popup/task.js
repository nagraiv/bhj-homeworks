(() => {
    const modal = document.getElementById('subscribe-modal');
    const closeBtn = document.querySelector('.modal__close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('modal_active');
        document.cookie = 'subscribe-modal=closed';
    });

    window.onload = () => {
        if (!document.cookie.includes('subscribe-modal=closed')) {
            setTimeout(() => {
                modal.classList.add('modal_active');
            }, 2000);
        }
    }
})();
