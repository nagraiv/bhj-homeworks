(() => {
    const rootNode = document.querySelector('.interests_main');
    const inputs = [...document.querySelectorAll('.interest__check')];
    inputs.forEach((node) => {
        node.addEventListener('change', (e) => {
            // console.log('node: ', node);
            // e.stopPropagation();
            // все вложенные списки принимают новое состояние верхнеуровневого checkbox
            recursiveStateInheritance(node);
            // если на текущем уровне все checkbox в одном состоянии,
            // то меняются состояния всех "родительских" checkbox
            recursiveParentStateChange(node);
        })
    });

    // функция рекурсивного НАСЛЕДОВАНИЯ состояния checked / unchecked
    function recursiveStateInheritance(element) {
        const childListUl = element.parentNode.nextElementSibling;
        if (childListUl) {
            const childList = [...childListUl.children];
            // console.log('есть вложенный список', childList);
            childList.forEach(item => {
                const checkEl = item.querySelector('.interest__check');
                checkEl.checked = element.checked;
                checkEl.indeterminate = false;
                recursiveStateInheritance(checkEl);
            });
        } else {
            // console.log('нет вложенного списка');
            return;
        }
    }

    // функция просматривает все checkbox на текущем уровне,
    // а также рекурсивно поднимается до rootNode - обёртки самого верхнего ul-элемента
    // если все элементы одноуровневого списка находятся в одном состоянии checked/unchecked
    // то соответствующий checkbox верхнего уровня тоже принимает это состояние
    // если состояния разные, то checkbox верхнего уровня переходит в неопределённое состояние
    function recursiveParentStateChange(element) {
        const ulElement = element.closest('.interests');
        // console.log(ulElement);
        if (ulElement === rootNode) {
            // console.log('корневой список');
            return;
        } else {
            // console.log('есть список уровнем выше');
            const parentCheck = ulElement.previousElementSibling.firstElementChild;
            if (siblingCheck(ulElement, element.checked)) {
                parentCheck.checked = element.checked;
                parentCheck.indeterminate = false;
            } else {
                parentCheck.indeterminate = true;
            }
            recursiveParentStateChange(parentCheck);
        }
    }

    // функция проверяет состояние checkbox элементов в одноуровневом списке
    // если хотя бы один находится в неопределённом состоянии, то возвращает false
    // true будут возвращено только в том случае, если остальные элементы уже были в том состоянии,
    // куда переключился checkbox, на котором сработало событие
    function siblingCheck(ulEl, status) {
        const checkList = [...ulEl.children];
        // console.log(status, checkList);
        for (let element of checkList) {
            const checkEl = element.querySelector('.interest__check');
            if (checkEl.indeterminate || checkEl.checked !== status) {
                return false;
            }
        }
        return true;
    }
})();
