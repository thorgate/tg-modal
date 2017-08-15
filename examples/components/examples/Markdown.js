import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Markdown from 'react-remarkable';

import theMarkdown from '../../files/example.md';

import Modal from '../../../src/browser';


class MarkdownModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div className="markdown-wrapper">
                <div className="btn-group">
                    <a className="btn btn-primary" onClick={this.toggleModal}>Open</a>
                    <a className="btn btn-secondary" onClick={this.props.toggleCode}>Code</a>
                </div>

                <Modal isOpen={this.state.isOpen} onCancel={this.toggleModal}>
                    <div className="modal-body">
                        <Markdown source={theMarkdown} />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MarkdownModalExample;
