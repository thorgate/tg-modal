import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ModalDialog extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,

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
        const { children, isBasic, className } = this.props;
        const wrapperClassName = `tg-modal${isBasic ? ' tg-modal-basic' : ''}`;

        return (
            <div className={wrapperClassName} onClick={this.onCancel}>
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
