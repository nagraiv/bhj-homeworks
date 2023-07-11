// базовое задание: каждую секунду показывать новое сообщение
// (() => {
//     const rotateList = [...document.querySelector('.rotator').querySelectorAll('.rotator__case')];
//     let currentIndex = 0;
//     let intervalID = setInterval(() => {
//         rotateList[currentIndex].classList.remove('rotator__case_active');
//         currentIndex += 1;
//         if (currentIndex >= rotateList.length) {
//             currentIndex = 0;
//         }
//         rotateList[currentIndex].classList.add('rotator__case_active');
//     }, 1000);
// })();

// повышенный уровень сложности: смена цвета текста и длительности интервала
// не нравится бесконечная рекурсия - стэк вызовов рано или поздно переполнится
// (() => {
//     const rotateList = [...document.querySelector('.rotator').querySelectorAll('.rotator__case')];
//     let currentIndex = 0;
//     rotateList[currentIndex].style.color = rotateList[currentIndex].getAttribute('data-color');
//
//     let intervalID = setInterval(showNextCase,
//         +rotateList[currentIndex].getAttribute('data-speed'));
//
//     function showNextCase() {
//         clearInterval(intervalID);
//
//         rotateList[currentIndex].classList.remove('rotator__case_active');
//         currentIndex += 1;
//         if (currentIndex >= rotateList.length) {
//             currentIndex = 0;
//         }
//         rotateList[currentIndex].classList.add('rotator__case_active');
//         rotateList[currentIndex].style.color = rotateList[currentIndex].getAttribute('data-color');
//
//         intervalID = setInterval(showNextCase, +rotateList[currentIndex].getAttribute('data-speed'));
//     }
// })();

// повышенный уровень сложности: смена цвета текста и длительности интервала
// реализация через async/await и полифил sleep
(() => {
    const rotateList = [...document.querySelector('.rotator').querySelectorAll('.rotator__case')];
    let currentIndex = 0;
    rotateList[currentIndex].style.color = rotateList[currentIndex].getAttribute('data-color');

    const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));
    function showNextCase() {
        rotateList[currentIndex].classList.remove('rotator__case_active');
        currentIndex += 1;
        if (currentIndex >= rotateList.length) {
            currentIndex = 0;
        }
        rotateList[currentIndex].classList.add('rotator__case_active');
        rotateList[currentIndex].style.color = rotateList[currentIndex].getAttribute('data-color');
    }
    async function iter() {
        while (true) {
            await sleep(+rotateList[currentIndex].getAttribute('data-speed'));
            showNextCase();
        }
    }

    iter();
})();

