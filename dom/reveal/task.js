// следим за скролом через обработчик, используем задерживающий декоратор
// (() => {
//     const revealList = [...document.querySelectorAll('.reveal')];
//
//     const throttledScroll = throttle(onScroll, 100);
//
//     window.addEventListener('scroll', throttledScroll);
//
//     function throttle(func, delay) {
//         let isCalled = false;
//         return function(...args) {
//             if (isCalled) {
//                 // console.log('НЕТ');
//                 return;
//             }
//             func(...args);
//             isCalled = true;
//             setTimeout(() => isCalled = false, delay)
//         }
//     }
//
//     function onScroll() {
//         revealList.forEach((node) => {
//             let { top, bottom } = node.getBoundingClientRect();
//             if (top < window.innerHeight) {
//                 node.classList.add('reveal_active');
//             }
//             if (bottom < 0 || top > window.innerHeight) {
//                 node.classList.remove('reveal_active');
//             }
//         });
//     }
// })();

// попадание элемента в область видимости обнаруживает IntersectionObserver
(() => {
    const revealList = [...document.querySelectorAll('.reveal')];

    const onView = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // console.log('Пересечение обнаружено!')
                entry.target.classList.add('reveal_active');
            } else {
                entry.target.classList.remove('reveal_active');
            }
        })
    }

    const observer = new IntersectionObserver(onView);

    revealList.forEach((node) => {
        observer.observe(node);
    });

})();
