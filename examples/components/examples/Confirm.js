import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';


const ConfirmModalExample = ({ toggleCode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [answer, setAnswer] = useState(null);

    const showModal = () => {
        setIsOpen(true);
    };

    const onCancel = () => {
        setIsOpen(false);
        setAnswer('DO NOT WANT');
    };

    const onConfirm = () => {
        setIsOpen(false);
        setAnswer('GIMME');
    };

    return (
        <div className="modal-example">
            <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={showModal}>
                    Open
                </button>
                <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                    Code
                </button>
            </div>

            <div className="response">
                <b>You answered:</b> {answer || '-'}
            </div>

            <Modal isOpen={isOpen} onCancel={onCancel} onConfirm={onConfirm}>
                <Modal.Header addClose={false}>Do you want cookies?</Modal.Header>
                <Modal.Body>
                    <p>
                        You can also use <b>enter</b> or <b>escape</b> to accept or decline.
                    </p>
                </Modal.Body>
                <div className="tg-modal-footer">
                    <button type="button" className="btn btn-primary" onClick={onConfirm}>
                        OH YES
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        NOPE
                    </button>
                </div>
            </Modal>
        </div>
    );
}

ConfirmModalExample.propTypes = {
    initialOpen: PropTypes.bool,
    toggleCode: PropTypes.func.isRequired,
};

ConfirmModalExample.defaultProps = {
    initialOpen: false,
};

export default ConfirmModalExample;
