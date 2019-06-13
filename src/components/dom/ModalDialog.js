import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalDialog extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        modalClassName: PropTypes.string,

        onCancel: PropTypes.func.isRequired,
        isBasic: PropTypes.bool,
    };

    static defaultProps = {
        children: null,
        className: 'tg-modal-dialog',
        isBasic: false,
        modalClassName: '',
    };

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
        const { children, isBasic, className, modalClassName } = this.props;

        return (
            <div
                className={`tg-modal${isBasic ? ' tg-modal-basic' : ''} ${modalClassName}`}
                onClick={this.onCancel}
                onKeyPress={this.onKeyPress}
                tabIndex={-1}
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

export default ModalDialog;
