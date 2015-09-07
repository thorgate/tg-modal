let size;

// Original source available at: https://github.com/react-bootstrap/dom-helpers/blob/master/src/util/scrollbarSize.js

function getScrollbarSize(recalc) {
    if (!size || recalc) {
        if (typeof document !== 'undefined') {
            const scrollDiv = document.createElement('div');

            scrollDiv.style.position = 'absolute';
            scrollDiv.style.top = '-9999px';
            scrollDiv.style.width = '50px';
            scrollDiv.style.height = '50px';
            scrollDiv.style.overflow = 'scroll';

            document.body.appendChild(scrollDiv);
            size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            document.body.removeChild(scrollDiv);
        }
    }

    return size;
}

export default getScrollbarSize;
