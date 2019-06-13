import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

class WithComponentsModalExample extends Component {
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

                <Modal isOpen={isOpen} dialogClassName="tg-modal-dialog custom-dialog" onCancel={this.toggleModal}>
                    <Modal.Header className="tg-modal-header custom-header" addClose={false}>
                        Header component!
                    </Modal.Header>
                    <Modal.Body className="tg-modal-body custom-body">
                        <p>I’m a modal with custom classes for Dialog, Header and Body.</p>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default WithComponentsModalExample;
