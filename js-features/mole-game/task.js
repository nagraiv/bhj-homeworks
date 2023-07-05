(() => {
    const holeCollection = document.querySelectorAll('.hole');
    const deadEl = document.getElementById("dead");
    const lostEl = document.getElementById("lost");
    let deadCount = 0;
    let lostCount = 0;

    holeCollection.forEach((node) => {
        node.addEventListener('click',(evt) => {
            if (evt.target.className.includes('hole_has-mole')) {
                deadCount += 1;
            } else {
                lostCount += 1;
            }
            deadEl.textContent = deadCount.toString();
            lostEl.textContent = lostCount.toString();
            setTimeout(ifVictory);
            setTimeout(ifLoose);
        });
    });

    function resetGame() {
        deadCount = 0;
        lostCount = 0;
        deadEl.textContent = '0';
        lostEl.textContent = '0';
    }

    function ifVictory() {
        if (deadCount >= 10) {
            alert('Победа!');
            setTimeout(resetGame);
        }
    }

    function ifLoose() {
        if (lostCount >= 5) {
            alert('Вы проиграли...');
            setTimeout(resetGame);
        }
    }
})();
