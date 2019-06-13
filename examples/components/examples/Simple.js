import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';

class SimpleModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    toggleModal = () => {
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

                <Modal isOpen={isOpen} autoWrap title="First modal" onCancel={this.toggleModal}>
                    <p>
                        Viral deep v squid chia, letterpress wayfarers artisan meggings tote bag four loko keffiyeh
                        hoodie cronut four dollar toast flannel.
                    </p>

                    <p>
                        Pinterest 8-bit DIY pug cold-pressed Carles, typewriter photo booth deep v quinoa four dollar
                        toast trust fund freegan. Food truck Godard semiotics, YOLO mixtape asymmetrical selfies
                        Thundercats 8-bit.
                    </p>
                </Modal>
            </div>
        );
    }
}

export default SimpleModalExample;
