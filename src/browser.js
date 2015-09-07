import React, {Component, PropTypes} from 'react';

import Modal from './components/Modal';
import toggleClass from './toggle-class';


/**
 * Wrapper for modal component that handles body class toggle clientside.
 */
class BrowserModal extends Component {
    static propTypes = {
        // These callbacks can be used for serverside rendering
        actionShow: PropTypes.func,
        actionHide: PropTypes.func
    };

    onToggle(state, scrollbarSize) {
        if (typeof document !== 'undefined') {
            const container = document.body;

            // Toggle open class
            toggleClass(container, 'modal-open', state);

            // Update paddings
            if (state) {
                this._origPadding = container.style.paddingRight;
                container.style.paddingRight = parseInt(this._origPadding || 0, 10) + scrollbarSize + 'px';
            } else {
                container.style.paddingRight = this._origPadding;
            }
        }

        if (state) {
            this.actionShow({
                className: 'modal-open'
            });
        } else {
            this.actionHide({
                className: 'modal-open'
            });
        }
    }

    actionShow(bodyProps) {
        if (this.props.actionShow) {
            this.props.actionShow(bodyProps);
        }
    }

    actionHide(bodyProps) {
        if (this.props.actionHide) {
            this.props.actionHide(bodyProps);
        }
    }

    render() {
        return (
            <Modal {...this.props} onToggle={this.onToggle.bind(this)} />
        );
    }
}

export default BrowserModal;
