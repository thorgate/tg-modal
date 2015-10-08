import React, {Component, PropTypes} from 'react';

import Backdrop from './Backdrop';
import getScrollbarSize from '../utils/scrollbarSize';

import TimedCSSTransitionGroup from '../remote/TimedCSSTransitionGroup';


const keyCodes = {
    ESCAPE: 27,
    ENTER: 13
};

class Modal extends Component {
    static displayName = 'Modal';

    static propTypes = {
        children: PropTypes.node,

        isOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        isBasic: PropTypes.bool,
        noWrap: PropTypes.bool,

        transitionName: PropTypes.string,
        transitionDuration: PropTypes.number,

        title: PropTypes.node,
        onToggle: PropTypes.func.isRequired,

        onRequestClose: PropTypes.func.isRequired,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        keyboard: PropTypes.bool
    };

    static defaultProps = {
        noWrap: false,
        keyboard: true,
        transitionName: 'fade',
        transitionDuration: 300
    };

    constructor(props) {
        super(props);

        this.state = {};

        // Make serverside actions work
        if (props.isOpen) {
            if (typeof window === 'undefined') {
                this.props.onToggle(this.props.isOpen, Modal.getScrollbarWidth());
            }
        }
    }

    componentDidMount() {
        this.props.onToggle(this.props.isOpen, Modal.getScrollbarWidth());

        if (this.props.keyboard) {
            this.bindKeyboard();
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.onToggle(nextProps.isOpen, Modal.getScrollbarWidth());

        if (this.props.isOpen !== nextProps.isOpen) {
            this.setState({
                animating: true
            });
        }

        if (this.props.keyboard !== nextProps.keyboard) {
            nextProps.keyboard ? this.bindKeyboard() : this.unbindKeyboard();
        }
    }

    componentWillUnmount() {
        this.unbindKeyboard();
    }

    onRequestClose(e) {
        e.preventDefault();

        // Don't do anything while animating
        if (this.state.animating) {
            return;
        }

        if (this.props.onCancel && this.props.isOpen) {
            this.props.onCancel();
        }

        if (!this.props.isStatic) {
            if (this.props.onRequestClose) {
                this.props.onRequestClose();
            }
        }
    }

    onBackdropClick(e) {
        if (!this.props.isStatic) {
            this.onRequestClose(e);
        } else {
            e.preventDefault();
        }
    }

    static getScrollbarWidth() {
        if (typeof document === 'undefined') {
            return null;
        }

        else {
            return getScrollbarSize();
        }
    }

    handleKeys(e) {
        // Handle escape press
        if (e.which === keyCodes.ESCAPE) {
            this.onRequestClose(e);
        } else if (e.which === keyCodes.ENTER) {
            // Don't do anything while animating
            if (!this.state.animating) {
                if (this.props.onConfirm) {
                    e.preventDefault();

                    this.props.onConfirm();
                }
            }
        }
    }

    bindKeyboard() {
        // Ensure we don't bind twice
        this.unbindKeyboard();

        if (typeof document !== 'undefined') {
            this._keyHandler = this.handleKeys.bind(this);

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

    clearAnimating() {
        this.setState({
            animating: false
        });
    }

    stopPropagate(e) {
        e.stopPropagation();
    }

    renderModalBody() {
        if (!this.props.noWrap) {
            return (
                <div className="modal-body">
                    {this.props.children}
                </div>
            );
        }

        return this.props.children;
    }

    renderModalHeader() {
        const {title, isStatic} = this.props;

        if (!title) {
            return null;
        }

        const closeBtn = !isStatic ? (
            <button className="close" aria-label="Close" onClick={this.onRequestClose.bind(this)}><span aria-hidden="true">&times;</span></button>
        ) : null;

        return (
            <div className="modal-header">
                <h1 className="modal-title">{title}</h1>
                {closeBtn}
            </div>
        );
    }

    renderModal() {
        if (!this.props.isOpen) {
            return [];
        }

        const cx = `modal${this.props.isBasic ? ' modal-basic' : ''}`;

        const parts = [(
            <div className={cx} key="modal" onClick={this.onBackdropClick.bind(this)}>
                <div className="modal-dialog" key="dialog">
                    <div className="modal-content" onClick={this.stopPropagate.bind(this)}>
                        {this.renderModalHeader()}
                        {this.renderModalBody()}
                    </div>
                </div>
            </div>
        ), (
            <Backdrop isStatic={this.props.isStatic} onRequestClose={this.onBackdropClick.bind(this)} key="backdrop" />
        )];

        return parts;
    }

    render() {
        return (
            <div>
                <TimedCSSTransitionGroup
                    transitionName={this.props.transitionName}
                    transitionEnter={this.props.transitionDuration}
                    transitionLeave={this.props.transitionDuration}
                    afterEnter={this.clearAnimating.bind(this)}
                    afterLeave={this.clearAnimating.bind(this)}
                    component="div"
                >
                    {this.renderModal()}
                </TimedCSSTransitionGroup>
            </div>
        );
    }
}

export default Modal;
