import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

class ConfirmModalExample extends Component {
    static propTypes = {
        initialOpen: PropTypes.bool,
        toggleCode: PropTypes.func.isRequired,
    };

    static defaultProps = {
        initialOpen: false,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.initialOpen,
            answer: null,
        };
    }

    onCancel = () => {
        this.setState({
            answer: 'DO NOT WANT',
            isOpen: false,
        });
    };

    onConfirm = () => {
        this.setState({
            answer: 'GIMME',
            isOpen: false,
        });
    };

    showModal = () => {
        this.setState({
            isOpen: true,
        });
    };

    renderAnswer() {
        const { answer } = this.state;

        return (
            <div className="response">
                <b>You answered:</b> {answer || '-'}
            </div>
        );
    }

    render() {
        const { toggleCode } = this.props;
        const { isOpen } = this.state;

        return (
            <div className="modal-example">
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={this.showModal}>
                        Open
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                        Code
                    </button>
                </div>

                {this.renderAnswer()}

                <Modal isOpen={isOpen} onCancel={this.onCancel} onConfirm={this.onConfirm}>
                    <Modal.Header addClose={false}>Do you want cookies?</Modal.Header>
                    <Modal.Body>
                        <p>
                            You can also use <b>enter</b> or <b>escape</b> to accept or decline.
                        </p>
                    </Modal.Body>
                    <div className="tg-modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onConfirm}>
                            OH YES
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={this.onCancel}>
                            NOPE
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ConfirmModalExample;
