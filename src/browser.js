import React, {Component} from 'react';

import Modal from './components/Modal';
import toggleClass from './toggle-class';


/**
 * Wrapper for modal component that handles body class toggle clientside.
 */
class BrowserModal extends Component {
    onToggle(state) {
        toggleClass(document.body, 'modal-open', state);
    }

    render() {
        return (
            <Modal {...this.props} onToggle={this.onToggle} />
        );
    }
}

export default BrowserModal;
