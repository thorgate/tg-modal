import React from 'react';
import PropTypes from 'prop-types';

const ModalBody = ({ children, ...rest }) => <div {...rest}>{children}</div>;

ModalBody.displayName = 'Modal.Body';

ModalBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

ModalBody.defaultProps = {
    children: null,
    className: 'tg-modal-body',
};

export default ModalBody;
