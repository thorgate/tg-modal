import PropTypes from 'prop-types';

import TimedCSSTransitionGroup from './remote/TimedCSSTransitionGroup';

import Modal from './components/Modal';
import toggleClass from './toggle-class';
import getScrollbarSize from './utils/scrollbarSize';

// This keeps track of how many modals that are open so that the
// container class and container padding for the scrollbar is correctly set.
let numberOfModalsOpen = 0;

const keyCodes = {
    ESCAPE: 27,
    ENTER: 13
};

/**
 * Wrapper for modal component that handles DOM specific stuff
 */
class BrowserModal extends Modal {
    static propTypes = {
        ...Modal.propTypes,
        keyboard: PropTypes.bool
    };

    static defaultProps = {
        ...Modal.defaultProps,
        keyboard: true
    };

    componentDidMount() {
        super.componentDidMount();

        if (typeof document !== 'undefined') {
            if (this.props.keyboard) {
                this.bindKeyboard();
            }
        }
    }

    componentWillUnmount() {
        super.componentWillUnmount();

        if (typeof document !== 'undefined') {
            this.unbindKeyboard();
        }
    }

    getToggleProps(isOpen) {
        return {
            scrollbarSize: typeof document !== 'undefined' ? getScrollbarSize() : null,
            className: isOpen ? 'modal-open' : ''
        };
    }

    componentWillReceiveProps(nextProps) {
        super.componentWillReceiveProps(nextProps);

        if (this.props.keyboard !== nextProps.keyboard) {
            if (nextProps.keyboard) {
                this.bindKeyboard();
            } else {
                this.unbindKeyboard();
            }
        }
    }

    onToggle(state, props) {
        // Call super (calls props.onToggle)
        super.onToggle(state, props);

        // Add body class and padding to scrollbar.
        if (typeof document !== 'undefined') {
            const container = document.body;

            // Increment modal count when opening.
            if (state) {
                numberOfModalsOpen += 1;
            }

            // Add toggle body class and update body padding if there is only one modal open.
            if (numberOfModalsOpen === 1) {

                // Toggle open class.
                toggleClass(container, 'modal-open', state);

                if (state) {
                    this._origPadding = container.style.paddingRight;
                    container.style.paddingRight = `${parseInt(this._origPadding || 0, 10) + props.scrollbarSize}px`;
                } else {
                    container.style.paddingRight = this._origPadding;
                }
            }

            // Decrement modal count when closing.
            if (!state) {
                numberOfModalsOpen = Math.max(numberOfModalsOpen - 1, 0);
            }

        }
    }

    bindKeyboard() {
        // Ensure we don't bind twice
        this.unbindKeyboard();

        if (typeof document !== 'undefined') {
            this._keyHandler = this.handleKeys;

            document.addEventListener('keyup', this._keyHandler, false);
        }
    }

    unbindKeyboard() {
        if (typeof document !== 'undefined') {
            if (this._keyHandler) {
                document.removeEventListener('keyup', this._keyHandler, false);
                this._keyHandler = null;
            }
        }
    }

    handleKeys = (e) => {
        // Handle escape press
        if (e.which === keyCodes.ESCAPE) {
            this.onCancel(e, true);
        } else if (e.which === keyCodes.ENTER) {
            // Don't do anything while animating
            if (!this.state.animating) {
                if (this.props.onConfirm) {
                    e.preventDefault();

                    this.props.onConfirm();
                }
            }
        }
    };

    getAnimatorClass() {
        return TimedCSSTransitionGroup;
    }

    getAnimatorProps() {
        return {
            ...super.getAnimatorProps(),
            component: 'div',
            className: `modal-wrapper${this.state.animating ? ' animating' : ''}`
        };
    }
}

export default BrowserModal;
