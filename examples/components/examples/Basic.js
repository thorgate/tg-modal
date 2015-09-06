import React, {Component} from 'react';

import Modal from '../../../src/browser';


class BasicModalExample extends Component {
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

                <Modal isOpen={this.state.isOpen} isBasic title="Hello" onRequestClose={this.toggleModal.bind(this)}>
                    <p>
                        I'm a basic modal!
                    </p>
                </Modal>
            </div>
        );
    }
}

export default BasicModalExample;
