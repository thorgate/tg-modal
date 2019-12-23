import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

const SimpleModalExample = ({ toggleCode }) => {
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

            <Modal isOpen={isOpen} autoWrap title="First modal" onCancel={toggleModal}>
                <p>
                    Viral deep v squid chia, letterpress wayfarers artisan meggings tote bag four loko keffiyeh
                    hoodie cronut four dollar toast flannel.
                </p>

                <p>
                    Pinterest 8-bit DIY pug cold-pressed Carles, typewriter photo booth deep v quinoa four dollar
                    toast trust fund freegan. Food truck Godard semiotics, YOLO mixtape asymmetrical selfies
                    Thundercats 8-bit.
                </p>
            </Modal>
        </div>
    );
}

SimpleModalExample.propTypes = {
    toggleCode: PropTypes.func.isRequired,
};

export default SimpleModalExample;
