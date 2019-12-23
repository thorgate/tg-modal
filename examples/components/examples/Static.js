import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src';

const StaticModalExample = ({ toggleCode }) => {
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

            <Modal isOpen={isOpen} isStatic title="This is very important" onCancel={toggleModal}>
                <Modal.Body>
                    <p>Mauris non tempor quam, et lacinia.</p>
                </Modal.Body>

                <div className="tg-modal-footer">
                    <button type="button" className="btn btn-primary" onClick={toggleModal}>
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
}

StaticModalExample.propTypes = {
    toggleCode: PropTypes.func.isRequired,
};

export default StaticModalExample;
