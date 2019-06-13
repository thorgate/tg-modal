import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src';

class StaticModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggleModal = (e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
        }));
    };

    render() {
        const { toggleCode } = this.props;
        const { isOpen } = this.state;

        return (
            <div>
                <div className="btn-group">
                    <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                        Open
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={toggleCode}>
                        Code
                    </button>
                </div>

                <Modal isOpen={isOpen} isStatic title="This is very important" onCancel={this.toggleModal}>
                    <Modal.Body>
                        <p>Mauris non tempor quam, et lacinia.</p>
                    </Modal.Body>

                    <div className="tg-modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.toggleModal}>
                            Close
                        </button>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default StaticModalExample;
