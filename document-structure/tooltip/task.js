(() => {
    const hasTooltipList = [...document.querySelectorAll('.has-tooltip')];
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');
    tooltipElement.style.top = '0';
    tooltipElement.style.left = '0';
    hasTooltipList.forEach(node => {
        node.addEventListener('click', (e) => {
            e.preventDefault();
            if (node.nextElementSibling === tooltipElement) {
                tooltipElement.classList.toggle('tooltip_active');
            } else {
                tooltipElement.classList.remove('tooltip_active');
                tooltipElement.innerText = node.getAttribute('title');
                node.parentNode.insertBefore(tooltipElement, node.nextSibling);
                tooltipElement.classList.add('tooltip_active');
            }
            const {top, left, right, bottom} = node.getBoundingClientRect();
            tooltipElement.style.position = 'absolute';
            node.parentNode.style.position = 'relative';
            // tooltipElement.style.top = top + 'px';
            // tooltipElement.style.left = left + 'px';
            // tooltipElement.style.right = right + 'px';
            // tooltipElement.style.bottom = bottom + 'px';
            console.log(top, left, right, bottom);
            console.log(node.dataset.position);
        });
    })
})();
