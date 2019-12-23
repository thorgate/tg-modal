import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

const BasicModalExample = ({ initialOpen, toggleCode }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

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

            <Modal isOpen={isOpen} isBasic autoWrap title="Howdy!" onCancel={toggleModal}>
                <p>I’m a basic modal</p>
            </Modal>
        </div>
    );
}

BasicModalExample.propTypes = {
    initialOpen: PropTypes.bool,
    toggleCode: PropTypes.func.isRequired,
};

BasicModalExample.defaultProps = {
    initialOpen: false,
};

export default BasicModalExample;
