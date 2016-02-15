
function toggleClass(el, className, state) {
    if (el.classList) {
        if (typeof state === 'undefined') {
            el.classList.toggle(className);
        } else {
            el.classList[state ? 'add' : 'remove'](className);
        }
    } else {
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (typeof state === 'undefined') {
            state = existingIndex >= 0;
        }

        if (state) {
            classes.push(className);
        }
        else {
            classes.splice(existingIndex, 1);
        }

        el.className = classes.join(' ');
    }

    return el;
}

export default toggleClass;
