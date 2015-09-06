import React, {Component} from 'react';

import Modal from '../../../src/browser';


class BasicConfirmModalExample extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            anwser: null
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

    onCancel() {
        this.setState({
            anwser: 'DO NOT WANT',
            isOpen: false
        });
    }

    onConfirm() {
        this.setState({
            anwser: 'GIMME',
            isOpen: false
        });
    }

    renderAnwser() {
        if (!this.state.anwser) {
            return null;
        }

        return (
            <span><b>You anwsered:</b> {this.state.anwser}</span>
        );
    }

    render() {
        return (
            <div className="modal-example">
                <a href="" className="btn btn-primary" onClick={this.toggleModal.bind(this)}>Open</a>

                {this.renderAnwser()}

                <Modal isOpen={this.state.isOpen} isBasic isStatic noWrap title="Do you want cookies?"
                       onRequestClose={this.toggleModal.bind(this)}
                       onCancel={this.onCancel.bind(this)}
                       onConfirm={this.onConfirm.bind(this)}>
                    <div className="modal-body">
                        <p>
                            You can also use keyboard to accept/decline. Try pressing ESCAPE or ENTER.
                        </p>
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-default" onClick={this.onCancel.bind(this)}>Im on a diet</a>
                        <a className="btn btn-success" onClick={this.onConfirm.bind(this)}>AWW, YEAH</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BasicConfirmModalExample;
