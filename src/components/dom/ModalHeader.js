import React, { Component, PropTypes } from 'react';


class ModalHeader extends Component {
    static displayName = 'Modal.Header';

    static propTypes = {
        children: PropTypes.node,
        isStatic: PropTypes.bool,
        addClose: PropTypes.bool,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        addClose: true
    };

    onCancel = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!this.props.isStatic) {
            if (this.props.onCancel) {
                this.props.onCancel(e, null);
            }
        }
    };

    render() {
        const { children, addClose } = this.props;

        if (typeof children !== 'string') {
            return children;
        }

        const closeBtn = addClose ? (
            <button className="close" aria-label="Close" onClick={this.onCancel}><span aria-hidden="true">&times;</span></button>
        ) : null;

        return (
            <div className="modal-header">
                <h1 className="modal-title">{children}</h1>
                {closeBtn}
            </div>
        );
    }
}

export default ModalHeader;
