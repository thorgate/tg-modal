import React, { PropTypes, Component } from 'react';

import Modal from '../../../src/browser';


class SimpleModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    }

    toggleModal = () => {
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

                <Modal isOpen={this.state.isOpen} autoWrap title="First modal" onCancel={this.toggleModal}>
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
