import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        dialogClassName: PropTypes.string,

        transitionName: PropTypes.string,
        transitionDuration: PropTypes.number,

        title: PropTypes.node,

        TransitionClass: PropTypes.any.isRequired,
        TransitionGroupClass: PropTypes.any.isRequired,

        // This is internally used
        onToggle: PropTypes.func
    };

    static defaultProps = {
        autoWrap: false,
        dialogClassName: 'tg-modal-dialog',
        transitionName: 'tg-modal-fade',
        transitionDuration: 300
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
            this.onToggle(false, this.getToggleProps());
        }
    }

    onToggle(state, props) {
        if (this.props.onToggle) {
            this.props.onToggle(state, props);
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

    getToggleProps() {
        return {};
    }

    getAnimatorClass() {
        // Should be overwritten by the parent
        return null;
    }

    getAnimatorProps() {
        const { animating } = this.state;
        const { transitionName, transitionDuration } = this.props;

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
        return {};
    }

    clearAnimating = () => {
        this.setState({
            animating: false
        });
    };

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
        const { isOpen, isBasic, isStatic, dialogClassName } = this.props;

        if (!isOpen) {
            return [];
        }

        return [
            this.renderTransition(
                <Backdrop isStatic={isStatic} onCancel={this.onCancel} key="backdrop" />
            ),
            this.renderTransition(
                <ModalDialog isBasic={isBasic} onCancel={this.onCancel} key="dialog" className={dialogClassName}>
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
