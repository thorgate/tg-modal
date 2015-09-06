import React, {Component} from 'react';

import Modal from '../../../src/browser';


class StaticModalExample extends Component {
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

                <Modal isOpen={this.state.isOpen} isStatic title="Something really important" onRequestClose={this.toggleModal.bind(this)}>
                    <p>
                        Do you agree?
                    </p>

                    <a href="" className="btn btn-danger" onClick={this.toggleModal.bind(this)}>I understand</a>
                </Modal>
            </div>
        );
    }
}

export default StaticModalExample;
