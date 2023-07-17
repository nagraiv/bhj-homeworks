(() => {
    const hasTooltipList = [...document.querySelectorAll('.has-tooltip')];
    const tooltipElement = document.createElement('div');
    tooltipElement.classList.add('tooltip');

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
            const { top, left } = node.getBoundingClientRect();
            tooltipElement.style.position = 'absolute';
            if (node.dataset.position === 'top') {
                const { height } = tooltipElement.getBoundingClientRect();
                tooltipElement.style.top = top - height + window.scrollY + 'px';
                tooltipElement.style.left = left + 'px';
            }
            if (node.dataset.position === 'right') {
                const { width } = node.getBoundingClientRect();
                tooltipElement.style.top = top + window.scrollY + 'px';
                tooltipElement.style.left = left + width + 'px';
            }
            if (node.dataset.position === 'bottom') {
                const { height } = node.getBoundingClientRect();
                tooltipElement.style.top = top + height + window.scrollY + 'px';
                tooltipElement.style.left = left + 'px';
            }
            if (node.dataset.position === 'left') {
                const { width } = tooltipElement.getBoundingClientRect();
                tooltipElement.style.top = top + window.scrollY + 'px';
                tooltipElement.style.left = left - width + 'px';
            }
        });
    })
})();
