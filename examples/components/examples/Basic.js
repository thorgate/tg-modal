import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../src/components/Modal';


class BasicModalExample extends Component {
    static propTypes = {
        initialOpen: PropTypes.bool,
        toggleCode: PropTypes.func.isRequired
    };

    static defaultProps = {
        initialOpen: false
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.initialOpen
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

                <Modal isOpen={this.state.isOpen} isBasic autoWrap title="Howdy!" onCancel={this.toggleModal}>
                    <p>
                        I’m a basic modal
                    </p>
                </Modal>
            </div>
        );
    }
}

export default BasicModalExample;
