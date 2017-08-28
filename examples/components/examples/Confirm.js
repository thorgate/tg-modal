import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/browser';


class ConfirmModalExample extends Component {
    static propTypes = {
        initialOpen: PropTypes.bool,
        toggleCode: PropTypes.func.isRequired
    };

    static defaultProps = {
        initialOpen: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.initialOpen,
            answer: null
        };
    }

    onCancel = () => {
        this.setState({
            answer: 'DO NOT WANT',
            isOpen: false
        });
    };

    onConfirm = () => {
        this.setState({
            answer: 'GIMME',
            isOpen: false
        });
    };

    showModal = () => {
        this.setState({
            isOpen: true
        });
    };

    renderAnswer() {
        return (
            <div className="response"><b>You answered:</b> {this.state.answer || '-'}</div>
        );
    }

    render() {
        return (
            <div className="modal-example">
                <div className="btn-group">
                    <a className="btn btn-primary" onClick={this.showModal}>Open</a>
                    <a className="btn btn-secondary" onClick={this.props.toggleCode}>Code</a>
                </div>

                {this.renderAnswer()}

                <Modal
                    isOpen={this.state.isOpen}
                    onCancel={this.onCancel}
                    onConfirm={this.onConfirm}
                >
                    <Modal.Header addClose={false}>
                        Do you want cookies?
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            You can also use <b>enter</b> or <b>escape</b> to accept or decline.
                        </p>
                    </Modal.Body>
                    <div className="tg-modal-footer">
                        <a className="btn btn-primary" onClick={this.onConfirm}>OH YES</a>
                        <a className="btn btn-secondary" onClick={this.onCancel}>NOPE</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ConfirmModalExample;
