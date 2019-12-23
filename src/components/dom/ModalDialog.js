import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalDialog extends Component {
    onCancel = (e) => {
        /* istanbul ignore else */
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const { onCancel } = this.props;

        onCancel(e, null);
    };

    stopPropagate = (e) => {
        e.stopPropagation();
    };

    onKeyPress = (e) => {
        const { keyCode } = e;

        if (keyCode === 13) {
            this.onCancel(e);
        }
    };

    render() {
        const { children, isBasic, className, modalClassName, nodeRef } = this.props;

        return (
            <div
                className={`tg-modal${isBasic ? ' tg-modal-basic' : ''} ${modalClassName}`}
                onClick={this.onCancel}
                onKeyPress={this.onKeyPress}
                tabIndex={-1}
                ref={nodeRef}
                role="button"
            >
                <div className={className} role="dialog">
                    <div className="tg-modal-content" onClick={this.stopPropagate} role="presentation">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

ModalDialog.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    modalClassName: PropTypes.string,

    onCancel: PropTypes.func.isRequired,
    nodeRef: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    isBasic: PropTypes.bool,
};

ModalDialog.defaultProps = {
    children: null,
    nodeRef: null,
    className: 'tg-modal-dialog',
    isBasic: false,
    modalClassName: '',
};

export default ModalDialog;
