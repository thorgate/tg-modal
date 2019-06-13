import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMarkdown from 'react-markdown';

import theMarkdown from '../../files/example.md';

import Modal from '../../../src/components/Modal';

class MarkdownModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggleModal = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render() {
        const { toggleCode } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="markdown-wrapper">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                        Open
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                        Code
                    </button>
                </div>

                <Modal isOpen={isOpen} onCancel={this.toggleModal}>
                    <div className="tg-modal-body">
                        <ReactMarkdown source={theMarkdown} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MarkdownModalExample;
