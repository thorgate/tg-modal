import React, {Component, PropTypes} from 'react';


class ModalHeader extends Component {
    static displayName = 'Modal.Header';

    static propTypes = {
        children: PropTypes.node,
        isStatic: PropTypes.bool,
        addClose: PropTypes.bool,
        onCancel: PropTypes.func.isRequired
    };

    static defaultProps = {
        addClose: true
    };

    onCancel(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!this.props.isStatic) {
            this.props.onCancel(e, null);
        }
    }

    render() {
        const {isStatic, children, addClose} = this.props;

        const closeBtn = !isStatic && addClose ? (
            <button className="close" aria-label="Close" onClick={::this.onCancel}><span aria-hidden="true">&times;</span></button>
        ) : null;

        if (typeof children !== 'string') {
            return children;
        }

        return (
            <div className="modal-header">
                <h1 className="modal-title">{children}</h1>
                {closeBtn}
            </div>
        );
    }
}

export default ModalHeader;
