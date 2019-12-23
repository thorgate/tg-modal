import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';

import theMarkdown from '../../files/example.md';

import Modal from '../../../src/components/Modal';

const MarkdownModalExample = ({ toggleCode }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        setIsOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className="markdown-wrapper">
            <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={toggleModal}>
                    Open
                </button>
                <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                    Code
                </button>
            </div>

            <Modal isOpen={isOpen} onCancel={toggleModal}>
                <div className="tg-modal-body">
                    <ReactMarkdown source={theMarkdown} />
                </div>
            </Modal>
        </div>
    );
}

MarkdownModalExample.propTypes = {
    toggleCode: PropTypes.func.isRequired,
};

export default MarkdownModalExample;
