import React, {Component, PropTypes} from 'react';

import ModalDialog from './dom/ModalDialog';
import ModalHeader from './dom/ModalHeader';
import ModalBody from './dom/ModalBody';
import Backdrop from './dom/Backdrop';


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

        transitionName: PropTypes.string,
        transitionDuration: PropTypes.number,

        title: PropTypes.node,

        // This is internally used
        onToggle: PropTypes.func
    };

    static defaultProps = {
        autoWrap: false,
        keyboard: true,
        transitionName: 'fade',
        transitionDuration: 300
    };

    constructor(props) {
        super(props);

        this.state = {};

        if (props.isOpen) {
            this.onToggle(props.isOpen, this.getToggleProps());
        }
    }

    componentDidMount() {
        this.onToggle(this.props.isOpen, this.getToggleProps());
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isOpen !== nextProps.isOpen) {
            this.setState({
                animating: true
            }, () => {
                this.onToggle(nextProps.isOpen, this.getToggleProps());
            });
        }
    }

    componentWillUnmount() {
        if (this.props.isOpen) {
            this.onToggle(false, Modal.getScrollbarWidth());
        }
    }

    onToggle(state, props) {
        if (this.props.onToggle) {
            this.props.onToggle(state, props);
        }
    }

    onCancel() {
        // Don't do anything while animating
        if (this.state.animating) {
            return;
        }

        if (this.props.isOpen && !this.props.isStatic) {
            if (this.props.onCancel) {
                this.props.onCancel();
            }
        }
    }

    getToggleProps() {
        return {};
    }

    getAnimatorClass() {
        // Should be overwritten by the parent
        return null;
    }

    getAnimatorProps() {
        const {animating} = this.state;

        return {
            transitionName: this.props.transitionName,
            transitionEnter: this.props.transitionDuration,
            transitionLeave: this.props.transitionDuration,
            afterEnter: ::this.clearAnimating,
            afterLeave: ::this.clearAnimating,
            animating
        };
    }

    clearAnimating() {
        this.setState({
            animating: false
        });
    }

    renderModalBody() {
        if (this.props.autoWrap) {
            return (
                <ModalBody>
                    {this.props.children}
                </ModalBody>
            );
        }

        return this.props.children;
    }

    renderModalHeader() {
        const {title, isStatic} = this.props;

        if (!title) {
            // No title: Return nothing
            return null;
        } else if (typeof title === 'string') {
            // Title is a string, return a ModalHeader
            return (
                <ModalHeader isStatic={isStatic} onCancel={::this.onCancel}>
                    {title}
                </ModalHeader>
            );
        } else {
            // Fall back to rendering title directly (events should be handled by parent)
            return title;
        }
    }

    renderModal() {
        const {isOpen, isBasic, isStatic} = this.props;

        if (!isOpen) {
            return [];
        }

        const parts = [(
            <ModalDialog isBasic={isBasic} onCancel={::this.onCancel} key="dialog">
                {this.renderModalHeader()}
                {this.renderModalBody()}
            </ModalDialog>
        ), (
            <Backdrop isStatic={isStatic} onCancel={::this.onCancel} key="backdrop" />
        )];

        return parts;
    }

    render() {
        return React.createElement(
            this.getAnimatorClass(),
            this.getAnimatorProps(),
            this.renderModal()
        );
    }
}

export default Modal;
