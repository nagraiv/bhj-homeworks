(() => {
    const revealList = [...document.querySelectorAll('.reveal')];
    console.log(revealList);

    const throttledScroll = throttle(onScroll, 100);

    window.addEventListener('scroll', throttledScroll);

    function throttle(func, delay) {
        let isCalled = false;
        return function(...args) {
            if (isCalled) {
                // console.log('НЕТ');
                return;
            }
            func(...args);
            isCalled = true;
            setTimeout(() => isCalled = false, delay)
        }
    }

    function onScroll() {
        revealList.forEach((node) => {
            // console.log(node.getBoundingClientRect());
            let top = node.getBoundingClientRect().top;
            let bottom = node.getBoundingClientRect().bottom;
            if (top < window.innerHeight) {
                node.classList.add('reveal_active');
            }
            if (bottom < 0 || top > window.innerHeight) {
                node.classList.remove('reveal_active');
            }
        });
    }
})();
