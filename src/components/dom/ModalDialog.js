import React, {Component, PropTypes} from 'react';


class ModalDialog extends Component {
    static propTypes = {
        children: PropTypes.node,

        onCancel: PropTypes.func.isRequired,
        isBasic: PropTypes.bool,
        animating: PropTypes.bool
    };

    onCancel(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.props.onCancel();
    }

    stopPropagate(e) {
        e.stopPropagation();
    }

    render() {
        const {children, isBasic} = this.props;
        const className = `modal${isBasic ? ' modal-basic' : ''}`;

        return (
            <div className={className} onClick={::this.onCancel}>
                <div className="modal-dialog">
                    <div className="modal-content" onClick={::this.stopPropagate}>
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalDialog;
