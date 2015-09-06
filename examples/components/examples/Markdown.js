import React, {Component} from 'react';

import Markdown from 'react-remarkable';

import theMarkdown from '../../files/example.md';

import Modal from '../../../src/browser';


class MarkdownModalExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggleModal(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
                <a href="" className="btn btn-primary" onClick={this.toggleModal.bind(this)}>Open</a>

                <Modal isOpen={this.state.isOpen} title="Awesome markdown" onRequestClose={this.toggleModal.bind(this)}>
                    <Markdown source={theMarkdown} />
                </Modal>
            </div>
        );
    }
}

export default MarkdownModalExample;
