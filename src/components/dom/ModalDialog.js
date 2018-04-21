import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ModalDialog extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        modalClassName: PropTypes.string,

        onCancel: PropTypes.func.isRequired,
        isBasic: PropTypes.bool
    };

    static defaultProps = {
        className: 'tg-modal-dialog'
    };

    onCancel = (e) => {
        /* istanbul ignore else */
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.props.onCancel(e, null);
    };

    stopPropagate = (e) => {
        e.stopPropagation();
    };

    render() {
        const { children, isBasic, className, modalClassName } = this.props;

        return (
            <div className={`tg-modal${isBasic ? ' tg-modal-basic' : ''} ${modalClassName}`} onClick={this.onCancel}>
                <div className={className}>
                    <div className="tg-modal-content" onClick={this.stopPropagate}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;
