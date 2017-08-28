import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ModalHeader extends Component {
    static displayName = 'Modal.Header';

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        isStatic: PropTypes.bool,
        addClose: PropTypes.bool,
        onCancel: PropTypes.func
    };

    static defaultProps = {
        className: 'tg-modal-header',
        addClose: true
    };

    constructor(props) {
        super(props);

        // warn if something is wrong with props
        if (props.addClose && !props.onCancel) {
            console.warn(`${ModalHeader.displayName}: addClose is defined but onCancel is missing!`);
        }
    }

    onCancel = (e) => {
        /* istanbul ignore else */
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
        const { children, addClose, className } = this.props;

        if (typeof children !== 'string') {
            return children;
        }

        const closeBtn = addClose ? (
            <button className="tg-modal-close" aria-label="Close" onClick={this.onCancel}><span aria-hidden="true">&times;</span></button>
        ) : null;

        return (
            <div className={className}>
                <h1 className="tg-modal-title">{children}</h1>
                {closeBtn}
            </div>
        );
    }
}

export default ModalHeader;
