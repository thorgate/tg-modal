import React, { Component, PropTypes } from 'react';


class ModalDialog extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,

        onCancel: PropTypes.func.isRequired,
        isBasic: PropTypes.bool,
        animating: PropTypes.bool
    };

    static defaultProps = {
        className: 'modal-dialog'
    };

    onCancel = (e) => {
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
        const wrapperClassName = `modal${isBasic ? ' modal-basic' : ''}`;

        return (
            <div className={wrapperClassName} onClick={this.onCancel}>
                <div className={className}>
                    <div className="modal-content" onClick={this.stopPropagate}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;
