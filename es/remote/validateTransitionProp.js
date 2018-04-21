function validateTransitionProp(props, propName) {
    if (typeof props[propName] !== 'number' && props[propName] !== false) {
        return new Error(propName + ' must be a number (in milliseconds) or false');
    } else if (typeof props[propName] === 'number') {
        if (props[propName] <= 0) {
            return new Error(propName + ' must be a number (in milliseconds) greater than 0');
        }
    }

    return undefined;
}

export default validateTransitionProp;