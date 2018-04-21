import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import getScrollbarSize from '../utils/scrollbarSize';
import toggleClass from '../toggle-class';

import ModalDialog from './dom/ModalDialog';
import ModalHeader from './dom/ModalHeader';
import ModalBody from './dom/ModalBody';
import Backdrop from './dom/Backdrop';


// This keeps track of how many modals that are open so that the
// container class and container padding for the scrollbar is correctly set.
let numberOfModalsOpen = 0;

const keyCodes = {
    ESCAPE: 27,
    ENTER: 13
};


class Modal extends Component {
    static displayName = 'Modal';

    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        onConfirm: PropTypes.func,

        children: PropTypes.node,

        isStatic: PropTypes.bool,
        isBasic: PropTypes.bool,
        autoWrap: PropTypes.bool,
        className: PropTypes.string,
        dialogClassName: PropTypes.string,
        wrapperClassName: PropTypes.string,

        transitionName: PropTypes.string,
        transitionDuration: PropTypes.number,

        title: PropTypes.node,

        TransitionClass: PropTypes.any.isRequired,
        TransitionGroupClass: PropTypes.any.isRequired,

        style: PropTypes.style,

        // Enable/disable keyboard events
        keyboard: PropTypes.bool,

        // This is internally used
        onToggle: PropTypes.func
    };

    static defaultProps = {
        autoWrap: false,
        className: '',
        dialogClassName: 'tg-modal-dialog',
        wrapperClassName: '',

        transitionName: 'tg-modal-fade',
        transitionDuration: 300,

        keyboard: true,

        TransitionClass: CSSTransition,
        TransitionGroupClass: TransitionGroup
    };

    constructor(props) {
        super(props);

        this.state = {};

        // validate children props and warn if something is wrong
        React.Children.forEach(props.children, (child) => {
            if (child && child.type === ModalHeader) {
                if (child.props.addClose && !child.props.onCancel) {
                    console.warn(`${ModalHeader.displayName}: addClose is defined but onCancel is missing!`);
                }
            }
        });
    }

    componentDidMount() {
        this.onToggle(this.props.isOpen, this.getToggleProps());

        if (typeof document !== 'undefined') {
            if (this.props.keyboard) {
                this.bindKeyboard();
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOpen !== nextProps.isOpen) {
            this.setState({
                animating: true
            }, () => {
                this.onToggle(nextProps.isOpen, this.getToggleProps());
            });
        }

        if (this.props.keyboard !== nextProps.keyboard) {
            if (nextProps.keyboard) {
                this.bindKeyboard();
            } else {
                this.unbindKeyboard();
            }
        }
    }

    componentWillUnmount() {
        if (this.props.isOpen) {
            this.onToggle(false, this.getToggleProps());
        }

        if (typeof document !== 'undefined') {
            this.unbindKeyboard();
        }
    }

    onToggle(state, props) {
        if (this.props.onToggle) {
            this.props.onToggle(state, props);
        }

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
                toggleClass(container, 'tg-modal-open', state);

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

    onCancel = (e, extra) => {
        // Don't do anything while animating
        if (this.state.animating) {
            return;
        }

        if (this.props.isOpen && !this.props.isStatic) {
            if (this.props.onCancel) {
                this.props.onCancel(e, extra);
            }
        }
    };

    getToggleProps(isOpen) {
        return {
            scrollbarSize: typeof document !== 'undefined' ? getScrollbarSize() : null,
            className: isOpen ? 'tg-modal-open' : ''
        };
    }

    getAnimatorClass() {
        // Should be overwritten by the parent
        return null;
    }

    getAnimatorProps() {
        const { transitionName, transitionDuration } = this.props;
        const { animating } = this.state;

        return {
            classNames: transitionName,
            timeout: transitionDuration,
            onEntered: this.clearAnimating,
            onExited: this.clearAnimating,
            unmountOnExit: true,
            in: animating
        };
    }

    getAnimatorGroupProps() {
        const { wrapperClassName } = this.props;
        const { animating } = this.state;

        return {
            component: 'div',
            className: `tg-modal-wrapper ${wrapperClassName} ${this.state.animating ? 'tg-modal-animating' : ''}`.trim(),
        };
    }

    bindKeyboard() {
        // Ensure we don't bind twice
        this.unbindKeyboard();

        if (typeof document !== 'undefined') {
            this._keyHandler = this.handleKeys;

            document.addEventListener('keyup', this._keyHandler, false);
        }
    }

    clearAnimating = () => {
        this.setState({
            animating: false
        });
    };

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

    unbindKeyboard() {
        if (typeof document !== 'undefined') {
            if (this._keyHandler) {
                document.removeEventListener('keyup', this._keyHandler, false);
                this._keyHandler = null;
            }
        }
    }

    renderChild = (child) => {
        if (!child) {
            return child;
        }

        const { onCancel: onCancel } = this.props;
        const { addClose, headerOnCancel } = child.props || {};

        if (child.type === ModalHeader && addClose && !headerOnCancel) {
            return React.cloneElement(child, {
                ...child.props,
                onCancel
            });
        }

        return child;
    };

    renderModalBody() {
        const children = React.Children.map(this.props.children, this.renderChild);
        if (this.props.autoWrap) {
            return (
                <ModalBody>
                    {children}
                </ModalBody>
            );
        }

        return children;
    }

    renderModalHeader() {
        const { title, isStatic } = this.props;

        if (!title) {
            // No title: Return nothing
            return null;
        } else if (typeof title === 'string') {
            // Title is a string, return a ModalHeader
            return (
                <ModalHeader addClose={!isStatic} onCancel={this.onCancel}>
                    {title}
                </ModalHeader>
            );
        } else {
            // Fall back to rendering title directly (events should be handled by parent)
            return title;
        }
    }

    renderTransition = (element) => {
        const { TransitionClass } = this.props;
        return (
            <TransitionClass key={element.key} {...this.getAnimatorProps()}>
                {React.cloneElement(element)}
            </TransitionClass>
        );
    };

    renderModal() {
        const { isOpen, isBasic, isStatic, dialogClassName, className } = this.props;

        if (!isOpen) {
            return [];
        }

        return [
            this.renderTransition(
                <Backdrop isStatic={isStatic} onCancel={this.onCancel} key="backdrop" />
            ),
            this.renderTransition(
                <ModalDialog
                    key="dialog"
                    isBasic={isBasic}
                    onCancel={this.onCancel}
                    className={dialogClassName}
                    modalClassName={className}
                >
                    {this.renderModalHeader()}
                    {this.renderModalBody()}
                </ModalDialog>
            )];
    }

    render() {
        const { TransitionGroupClass } = this.props;
        return (
            <TransitionGroupClass {...this.getAnimatorGroupProps()}>
                {this.renderModal()}
            </TransitionGroupClass>
        );
    }
}

export default Modal;
