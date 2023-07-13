(()=> {
    const chatWidget = document.querySelector('.chat-widget');
    let timeout;

    const openBtn = document.querySelector('.chat-widget__side');
    openBtn.onclick = () => {
        chatWidget.classList.add('chat-widget_active');
        // приветствие появляется с небольшой задержкой
        debounceReply(greeting(), false);
        // запускаем таймер простоя, первый раз задержка 32 сек, чтобы сообщение появилось через 30 сек после приветствия
        timeout = setTimeout(impatientMessaging, 32000);
    }

    // в моей реализации кнопка закрывания окна затирает всю переписку
    const closeBtn = document.querySelector('.close-button');
    closeBtn.onclick = () => {
        chatWidget.classList.remove('chat-widget_active');
        messages.innerHTML = '';
        clearTimeout(timeout);  // останавливаем таймер простоя
    }

    const input = document.getElementById('chat-widget__input');
    // обработчик реагирует только на нажатие клавиши 'ENTER'
    input.addEventListener('keypress', (evt) => {
        if (evt.key === 'Enter' && evt.target.value.trim()) {
            addMessage(evt.target.value.trim(), true);
            evt.target.value = '';
            debounceReply(getResponse(), false);
        }
        // после каждого нажатия клавиши начинаем заново отсчитывать таймер простоя
        clearTimeout(timeout);
        timeout = setTimeout(impatientMessaging, 30000);
    });

    // текущее время преобразуется в строку hh:mm
    const formatTime = value => value < 10 ? '0' + value : value;
    const getCurrentTime = () => {
        const now = new Date();
        return `${formatTime(now.getHours())}:${formatTime(now.getMinutes())}`;
    }

    const messageContainer = document.querySelector('.chat-widget__messages-container');
    const messages = document.querySelector('.chat-widget__messages');
    // функция добавляет сообщение в чат, принимает текст сообщения и параметр boolean
    // true - сообщение от клиента, false - для ответов чат-бота
    const addMessage = (messageText, fromClient) => {
        messages.innerHTML += `
          <div class="message ${fromClient ? 'message_client' : ''}">
            <div class="message__time">
              ${getCurrentTime()}
            </div>
            <div class="message__text">
              ${messageText}
            </div>
          </div>
            `;
        // выполняем проверку, если сообщений в чате слишком много, то прокручиваем окно чата до последнего сообщения
        if (messages.getBoundingClientRect().height > messageContainer.getBoundingClientRect().height) {
            messageContainer.scrollTo({ top: messageContainer.scrollHeight, behavior: "smooth" } );
            // messages.scrollIntoView( { behavior: "smooth", block: "end" } );
        }
    }

    // задерживающий декоратор, применяется к сообщениям чат-бота
    const debounce = (func, delay) => {
        let timeoutID = null;
        return function(...args) {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
            timeoutID = setTimeout( () => {
                timeoutID = null;
                func(...args);
            }, delay);
        }
    }
    const debounceReply = debounce(addMessage, 2000);

    // функция приветствия выбирает случайное сообщение из массива greetings
    const greeting = () => {
        const randomInd = Math.floor(Math.random() * greetings.length);
        // console.log(greetings[randomInd]);
        return greetings[randomInd];
    }
    // функция ответа чат-бота выбирает случайное сообщение из массива replies
    const getResponse = () => {
        const randomInd = Math.floor(Math.random() * replies.length);
        // console.log(replies[randomInd]);
        return replies[randomInd];
    }

    const impatient = () => {
        const randomInd = Math.floor(Math.random() * waitings.length);
        // console.log(waitings[randomInd]);
        return waitings[randomInd];
    }

    const impatientMessaging = () => {
        addMessage(impatient(), false);
        timeout = setTimeout( () => {
            impatientMessaging();
        }, 30000);
    }

    const replies = [
      'Сервис перегружен. Обратитесь позже.',
      'Пожалуйста, опишите ситуацию подробнее.',
      'Вам померещилось. Такого не бывает.',
      'Спасибо за обращение. Мы ответим позже.',
      'Заявка сформирована. Её обработает первый освободившийся специалист.',
      'Мы ответим на ваше обращение после обеда.',
      'Вы преувеличиваете проблему.',
      'Я ничего не знаю по этому вопросу.',
      'Сформулируйте ваш вопрос иначе.',
      'Информация принята. Мы её обработаем и ответим вам.',
      'Дышите глубже. Это поможет успокоиться.',
      'Очень хочу вам помочь, но не понимаю чем.',
    ];

    const greetings = [
        'Добрый день! Чем я могу вам помочь?',
        'Здравствуйте. Здесь вы можете задать любой вопрос.',
        'Привет. Задай вопрос, а я постараюсь ответить.',
        'О, пользователь сервиса, приветствую тебя!',
        'Здравствуй, username. Ожидаю твои вопросы.',
        'Добрый вечер. Пожалуйста, введите ваше сообщение.',
    ];

    const waitings = [
        'Эй, ты там заснул?',
        'Спрашивай быстрее! Я всё ещё жду.',
        'У вас остались ещё вопросы? Буду рад помочь.',
        'Вы можете закрыть виджет, и наш бот пойдёт спать.',
        'Перекур окончен. Повтори ещё раз свой вопрос.',
        'Пауза затянулась. Начни печатать или закрой это окно.',
    ];
})();
