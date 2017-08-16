import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ModalBody extends Component {
    static displayName = 'Modal.Body';

    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'modal-body'
    };

    render() {
        return (
            <div {...this.props}>{this.props.children}</div>
        );
    }
}

export default ModalBody;
