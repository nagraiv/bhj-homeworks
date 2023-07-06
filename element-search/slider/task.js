(() => {
    const sliderList = [...document.querySelectorAll('.slider__item')];
    let currentSlide = document.querySelector('.slider__item_active');
    let currentIndex = sliderList.indexOf(currentSlide);

    const dotsList = [...document.querySelectorAll('.slider__dot')];
    dotsList[currentIndex].classList.add('slider__dot_active');
    dotsList.forEach((node) => {
        node.addEventListener('click', () => {
            sliderList[currentIndex].classList.remove('slider__item_active');
            dotsList[currentIndex].classList.remove('slider__dot_active');

            currentIndex = dotsList.indexOf(node);

            sliderList[currentIndex].classList.add('slider__item_active');
            dotsList[currentIndex].classList.add('slider__dot_active');
        });
    });

    const prevBtn = document.querySelector('.slider__arrow_prev');
    prevBtn.onclick = () => toSlide(-1);

    const nextBtn = document.querySelector('.slider__arrow_next');
    nextBtn.onclick = () => toSlide(1);

    function toSlide(direction) {
        sliderList[currentIndex].classList.remove('slider__item_active');
        dotsList[currentIndex].classList.remove('slider__dot_active');

        currentIndex += direction;
        if (currentIndex >= sliderList.length) {
            currentIndex = 0;
        }
        if (currentIndex < 0) {
            currentIndex = sliderList.length - 1;
        }
        sliderList[currentIndex].classList.add('slider__item_active');
        dotsList[currentIndex].classList.add('slider__dot_active');
    }
})();
