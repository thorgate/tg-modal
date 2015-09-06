import React, {Component, PropTypes} from 'react/addons';

import Backdrop from './Backdrop';


const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

class Modal extends Component {
    static propTypes = {
        children: PropTypes.node,

        isOpen: PropTypes.bool.isRequired,
        isStatic: PropTypes.bool,
        wrapBody: PropTypes.bool,

        title: PropTypes.node,
        onRequestClose: PropTypes.func.isRequired,
        onToggle: PropTypes.func.isRequired
    };

    static defaultProps = {
        wrapBody: true
    };

    componentDidMount() {
        this.props.onToggle(this.props.isOpen);
    }

    componentWillReceiveProps(nextProps) {
        this.props.onToggle(nextProps.isOpen);
    }

    onRequestClose(e) {
        e.preventDefault();

        this.props.onRequestClose();
    }

    stopPropagate(e) {
        e.stopPropagation();
    }

    renderModalBody() {
        if (this.props.wrapBody) {
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

        const parts = [
            (<div className="modal" key="modal" onClick={this.onRequestClose.bind(this)}>
                <div className="modal-dialog" key="dialog">
                    <div className="modal-content" onClick={this.stopPropagate.bind(this)}>
                        {this.renderModalHeader()}
                        {this.renderModalBody()}
                    </div>
                </div>
            </div>
        ), (
            <Backdrop isStatic={this.props.isStatic} onRequestClose={this.onRequestClose.bind(this)} key="backdrop" />
        )];

        return parts;
    }

    render() {
        return (
            <div>
                <ReactCSSTransitionGroup transitionName="fade" component="div">
                    {this.renderModal()}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Modal;
