import {PropTypes} from 'react';

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
            className: ''
        };
    }

    getState() {
        return this.__state;
    }

    onAction(nextProps) {
        this.__state.className = nextProps.className;
    }
}


// Extend the Base Modal component
class ServerSideModal extends Modal {
    static propTypes = {
        // Note: You could also pass kiosk down from the root via context
        kiosk: PropTypes.object.isRequired
    };

    actionShow(bodyProps) {
        if (this.props.kiosk) {
            // Call kiosk.onAction
            this.props.kiosk.onAction(bodyProps);
        }
    }

    actionHide(bodyProps) {
        if (this.props.kiosk) {
            // Call kiosk.onAction
            this.props.kiosk.onAction(bodyProps);
        }
    }
}


export default ServerSideModal;
