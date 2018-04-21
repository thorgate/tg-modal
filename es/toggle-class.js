
function toggleClass(el, className, state) {

    if (el.classList) {
        if (typeof state === 'undefined') {
            el.classList.toggle(className);
        } else if (state) {
            el.classList.add(className);
        } else {
            el.classList.remove(className);
        }
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (typeof state === 'undefined') {
            state = existingIndex >= 0;
        }

        if (state) {
            classes.push(className);
        } else {
            classes.splice(existingIndex, 1);
        }

        el.className = classes.join(' ');
    }

    return el;
}

export default toggleClass;