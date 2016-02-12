import React, {PropTypes, Component} from 'react';

import Modal from '../../../src/browser';


class BasicConfirmModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            answer: null
        };
    }

    onCancel() {
        this.setState({
            answer: 'DO NOT WANT',
            isOpen: false
        });
    }

    onConfirm() {
        this.setState({
            answer: 'GIMME',
            isOpen: false
        });
    }

    showModal() {
        this.setState({
            isOpen: true
        });
    }

    renderAnswer() {
        return (
            <div className="response"><b>You answered:</b> {this.state.answer || '-'}</div>
        );
    }

    render() {
        return (
            <div className="modal-example">
                <div className="btn-group">
                    <a className="btn btn-primary" onClick={::this.showModal}>Open</a>
                    <a className="btn btn-secondary" onClick={this.props.toggleCode}>Code</a>
                </div>

                {this.renderAnswer()}

                <Modal
                    isOpen={this.state.isOpen} isBasic
                    onCancel={::this.onCancel}
                    onConfirm={::this.onConfirm}
                >
                    <Modal.Header addClose={false}>
                        Do you want cookies?
                    </Modal.Header>
                    <Modal.Body>
                        <p>
                            You can also use <b>enter</b> or <b>escape</b> to accept or decline.
                        </p>
                    </Modal.Body>
                    <div className="modal-footer">
                    <a className="btn btn-primary" onClick={::this.onConfirm}>OH YES</a>
                        <a className="btn btn-secondary" onClick={::this.onCancel}>NOPE</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BasicConfirmModalExample;
