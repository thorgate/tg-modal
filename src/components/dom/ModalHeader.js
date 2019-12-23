import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalHeader extends Component {
    constructor(props) {
        super(props);

        // warn if something is wrong with props
        if (props.addClose && !props.onCancel) {
            // eslint-disable-next-line no-console
            console.warn(`${ModalHeader.displayName}: addClose is defined but onCancel is missing!`);
        }
    }

    onCancel = (e) => {
        /* istanbul ignore else */
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const { isStatic, onCancel } = this.props;

        if (!isStatic && onCancel) {
            onCancel(e, null);
        }
    };

    render() {
        const { children, addClose, className } = this.props;

        if (typeof children !== 'string') {
            return children;
        }

        const closeBtn = addClose ? (
            <button className="tg-modal-close" aria-label="Close" type="button" onClick={this.onCancel}>
                <span aria-hidden="true">&times;</span>
            </button>
        ) : null;

        return (
            <div className={className}>
                <h1 className="tg-modal-title">{children}</h1>
                {closeBtn}
            </div>
        );
    }
}

ModalHeader.displayName = 'Modal.Header';

ModalHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isStatic: PropTypes.bool,
    addClose: PropTypes.bool,
    onCancel: PropTypes.func,
};

ModalHeader.defaultProps = {
    addClose: true,
    children: null,
    className: 'tg-modal-header',
    isStatic: false,
    onCancel: null,
};

export default ModalHeader;
