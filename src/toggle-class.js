
function toggleClass(el, className, state) {
    if (el.classList) {
        el.classList.toggle(className, state);
    } else {
        const classes = el.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (state === undefined) {
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
