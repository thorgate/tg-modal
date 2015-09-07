import React, {Component, PropTypes} from 'react/addons';

import Backdrop from './Backdrop';
import getScrollbarSize from '../utils/scrollbarSize';


const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
const keyCodes = {
    ESCAPE: 27,
    ENTER: 13
};

class Modal extends Component {
    static propTypes = {
        children: PropTypes.node,

        isOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        isBasic: PropTypes.bool,
        noWrap: PropTypes.bool,
        transitionName: PropTypes.string,

        title: PropTypes.node,
        onToggle: PropTypes.func.isRequired,

        onRequestClose: PropTypes.func.isRequired,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        noWrap: false,
        transitionName: 'fade'
    };

    constructor(props) {
        super(props);

        // Make serverside actions work
        if (props.isOpen) {
            if (typeof window === 'undefined') {
                this.props.onToggle(this.props.isOpen, Modal.getScrollbarWidth());
            }
        }
    }

    componentDidMount() {
        this.props.onToggle(this.props.isOpen, Modal.getScrollbarWidth());

        if (typeof document !== 'undefined') {
            document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.props.onToggle(nextProps.isOpen, Modal.getScrollbarWidth());
    }

    componentWillUnmount() {
        if (typeof document !== 'undefined') {
            document.removeEventListener('keydown', this.onKeyDown.bind(this), false);
        }
    }

    onKeyDown(e) {
        // Handle escape press
        if (e.which === keyCodes.ESCAPE) {
            this.onRequestClose(e);
        } else if (e.which === keyCodes.ENTER) {
            if (this.props.onConfirm) {
                e.preventDefault();

                this.props.onConfirm();
            }
        }
    }

    onRequestClose(e) {
        e.preventDefault();

        if (this.props.onCancel && this.props.isOpen) {
            this.props.onCancel();
        }

        if (!this.props.isStatic) {
            // Don't call it if we are already closing
            if (this.props.onRequestClose && this.props.isOpen) {
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

        const parts = [
            (<div className={cx} key="modal" onClick={this.onBackdropClick.bind(this)}>
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
                <ReactCSSTransitionGroup transitionName={this.props.transitionName} component="div">
                    {this.renderModal()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }

    static getScrollbarWidth() {
        if (typeof document === 'undefined') {
            return null;
        }

        else {
            return getScrollbarSize();
        }
    }
}

export default Modal;
