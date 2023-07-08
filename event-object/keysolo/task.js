class Game {
  constructor(container) {
    this.container = container;
    this.wordElement = container.querySelector('.word');
    this.winsElement = container.querySelector('.status__wins');
    this.lossElement = container.querySelector('.status__loss');
    this.timerElement = document.querySelector('#timer');

    this.reset();
    this.registerEvents();
  }

  reset() {
    this.setNewWord();
    this.winsElement.textContent = '0';
    this.lossElement.textContent = '0';
  }

  registerEvents() {
    window.addEventListener('keypress', (ev) => {
      if (ev.key.toLowerCase() === this.currentSymbol.textContent.toLowerCase()) {
        this.success()
      } else {
        this.fail();
      }
    });
  }

  success() {
    if(this.currentSymbol.classList.contains("symbol_current")) this.currentSymbol.classList.remove("symbol_current");
    this.currentSymbol.classList.add('symbol_correct');
    this.currentSymbol = this.currentSymbol.nextElementSibling;

    if (this.currentSymbol !== null) {
      this.currentSymbol.classList.add('symbol_current');
      return;
    }

    if (++this.winsElement.textContent === 10) {
      setTimeout(() => {
        alert('Победа!');
        this.reset();
      });
    }
    this.setNewWord();
  }

  fail() {
    if (++this.lossElement.textContent === 5) {
      setTimeout(() => {
        alert('Вы проиграли!');
        this.reset();
      });
    }
    this.setNewWord();
  }

  setNewWord() {
    clearInterval(this.intervalID);
    const word = this.getWord();

    this.timer = this.wordLength + 1;
    this.timerElement.textContent = this.timer.toString();
    this.intervalID = setInterval(() => {
        this.timer -= 1;
        this.timerElement.textContent = this.timer.toString();
        if (this.timer <= 0) {
            this.fail();
        }
    }, 1000);

    this.renderWord(word);
  }

  getWord() {
    const words = [
        'world',
        'awesome',
        'Netology',
        'hello',
        'kitty',
        'rock',
        'Yandex',
        'popcorn',
        'cinema',
        'loves',
        'javascript',
        'Аргентина',
        'манит',
        'негра',
        'любит',
        'эскимо',
        'собака',
        'друг',
        'everyone'
      ],
      index = Math.floor(Math.random() * words.length);
    this.wordLength = words[index].length;

    return words[index];
  }

  renderWord(word) {
    const html = [...word]
      .map(
        (s, i) =>
          `<span class="symbol ${i === 0 ? 'symbol_current': ''}">${s}</span>`
      )
      .join('');
    this.wordElement.innerHTML = html;

    this.currentSymbol = this.wordElement.querySelector('.symbol_current');
  }
}

new Game(document.getElementById('game'))

