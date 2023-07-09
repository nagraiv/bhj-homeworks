(() => {
    const tabList = [...document.querySelectorAll('.tab')];
    const contentList = [...document.querySelectorAll('.tab__content')];
    let currentActiveTab = tabList[0];

    tabList.forEach((node) => {
        node.addEventListener('click', () => {
            currentActiveTab.classList.remove('tab_active');
            contentList[tabList.indexOf(currentActiveTab)].classList.remove('tab__content_active');
            node.classList.add('tab_active');
            currentActiveTab = node;
            contentList[tabList.indexOf(currentActiveTab)].classList.add('tab__content_active');
        });
    });
})();
