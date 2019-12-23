import PropTypes from 'prop-types';

import Modal from '../../src/components/Modal';

// Kiosk is like store+actions in the same class
export class Kiosk {
    state = {
        className: '',
    };

    flush() {
        this.state = {
            isOpen: false,
            className: '',
        };
    }

    getState() {
        return this.state;
    }

    onAction(isOpen, bodyProps) {
        this.state.isOpen = isOpen;
        this.state.bodyProps = bodyProps;
    }
}

// Extend the Base Modal component
class ServerSideModal extends Modal {
    onToggle(isOpen, bodyProps) {
        // Call super.onToggle
        super.onToggle(isOpen, bodyProps);

        // Pass action to our kiosk
        if (this.props.kiosk) {
            this.props.kiosk.onAction(isOpen, bodyProps);
        }
    }
}

ServerSideModal.propTypes = {
    // Note: You could also pass kiosk down from the root component via context
    kiosk: PropTypes.instanceOf(Kiosk).isRequired,
};

export default ServerSideModal;
