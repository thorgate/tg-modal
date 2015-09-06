import React, {Component} from 'react';

import Modal from '../../../src/browser';


class SimpleModalExample extends Component {
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

                <Modal isOpen={this.state.isOpen} title="First modal" onRequestClose={this.toggleModal.bind(this)}>
                    <p>
                        Viral deep v squid chia, letterpress wayfarers artisan
                        meggings tote bag four loko keffiyeh hoodie cronut four
                        dollar toast flannel.
                    </p>

                    <p>
                        Pinterest 8-bit DIY pug cold-pressed Carles, typewriter
                        photo booth deep v quinoa four dollar toast trust fund
                        freegan. Food truck Godard semiotics, YOLO mixtape
                        asymmetrical selfies Thundercats 8-bit.
                    </p>
                </Modal>
            </div>
        );
    }
}

export default SimpleModalExample;
