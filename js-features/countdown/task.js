(function() {
    class CountDownClock {
        constructor(timerString) {
            [this.hours, this.minutes, this.seconds] = timerString.split(':').map(el => parseInt(el));
            if (Number.isNaN(this.hours + this.minutes + this.seconds)) {
                throw new Error('Недопустимый формат таймера. Ожидается строка "чч:мм:сс".');
            }
            if (this.seconds < 0 || this.minutes < 0 || this.hours < 0) {
                throw new Error('Отрицательное значение таймера недопустимо.');
            }
        }

        countDown() {
            if (this.seconds === 0 && this.minutes === 0 && this.hours === 0) {
                return;
            }
            if (this.seconds < 0 || this.minutes < 0 || this.hours < 0) {
                throw new Error('Отрицательное значение таймера недопустимо.');
            } else {
                let totalSeconds = (this.hours * 60 + this.minutes) * 60 + this.seconds;
                totalSeconds -= 1;
                this.hours = Math.floor(totalSeconds/3600);
                this.minutes = Math.floor((totalSeconds - this.hours * 3600) / 60);
                this.seconds = totalSeconds - (this.hours * 60 + this.minutes) * 60;
            }
        }

        showTime() {
            const hours = this.hours < 10 ? '0' + this.hours : this.hours;
            const minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
            const seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;
            return hours + ':' + minutes + ':' + seconds;
        }

        timeIsUp() {
            return this.seconds === 0 && this.minutes === 0 && this.hours === 0;
        }
    }

    const linkEl = document.getElementById("link");
    const timerEl = document.getElementById("timer");
    let clock;
    let intervalID;
    try {
        clock = new CountDownClock(timerEl.textContent);
        intervalID = setInterval(() => {
            clock.countDown();
            timerEl.textContent = clock.showTime();
            if (clock.timeIsUp()) {
                clearInterval(intervalID);
                setTimeout(() => {
                    linkEl.parentNode.classList.remove('none');
                    linkEl.children[0].click();
                });
            }
        }, 1000);
    } catch (e) {
        clearInterval(intervalID);
        alert(e.message);
    }


})();
