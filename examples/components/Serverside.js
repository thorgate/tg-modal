import PropTypes from 'prop-types';

import Modal from '../../src/browser';


// Kiosk is like store+actions in the same class
export class Kiosk {
    constructor() {
        this.__state = {
            className: ''
        };
    }

    flush() {
        this.__state = {
            isOpen: false,
            className: ''
        };
    }

    getState() {
        return this.__state;
    }

    onAction(isOpen, bodyProps) {
        this.state.isOpen = isOpen;
        this.state.bodyProps = bodyProps;
    }
}


// Extend the Base Modal component
class ServerSideModal extends Modal {
    static propTypes = {
        // Note: You could also pass kiosk down from the root component via context
        kiosk: PropTypes.object.isRequired
    };

    onToggle(isOpen, bodyProps) {
        // Call super.onToggle
        super.onToggle(isOpen, bodyProps);

        // Pass action to our kiosk
        if (this.props.kiosk) {
            this.props.kiosk.onAction(isOpen, bodyProps);
        }
    }
}


export default ServerSideModal;
