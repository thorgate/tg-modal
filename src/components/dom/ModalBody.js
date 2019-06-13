import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalBody extends Component {
    static displayName = 'Modal.Body';

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
    };

    static defaultProps = {
        children: null,
        className: 'tg-modal-body',
    };

    render() {
        const { children } = this.props;

        return <div {...this.props}>{children}</div>;
    }
}

export default ModalBody;
