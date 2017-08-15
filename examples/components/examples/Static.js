import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src';


class StaticModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggleModal = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <div className="btn-group">
                    <a className="btn btn-primary" onClick={this.toggleModal}>Open</a>
                    <a className="btn btn-secondary" onClick={this.props.toggleCode}>Code</a>
                </div>

                <Modal isOpen={this.state.isOpen} isStatic title="This is very important" onCancel={this.toggleModal}>
                    <Modal.Body>
                        <p>
                            Mauris non tempor quam, et lacinia.
                        </p>
                    </Modal.Body>

                    <div className="modal-footer">
                        <a className="btn btn-primary" onClick={this.toggleModal}>Close</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default StaticModalExample;
