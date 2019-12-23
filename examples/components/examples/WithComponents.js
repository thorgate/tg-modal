import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

const WithComponentsModalExample = ({ toggleCode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        setIsOpen((prevOpen) => !prevOpen);
    };

    return (
        <div>
            <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={toggleModal}>
                    Open
                </button>
                <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                    Code
                </button>
            </div>

            <Modal isOpen={isOpen} dialogClassName="tg-modal-dialog custom-dialog" onCancel={toggleModal}>
                <Modal.Header className="tg-modal-header custom-header" addClose={false}>
                    Header component!
                </Modal.Header>
                <Modal.Body className="tg-modal-body custom-body">
                    <p>I’m a modal with custom classes for Dialog, Header and Body.</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

WithComponentsModalExample.propTypes = {
    initialOpen: PropTypes.bool,
    toggleCode: PropTypes.func.isRequired,
};

WithComponentsModalExample.defaultProps = {
    initialOpen: false,
};

export default WithComponentsModalExample;
