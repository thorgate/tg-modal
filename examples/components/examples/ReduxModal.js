import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import Modal from '../../../src/browser';


// redux actions and types
const OPEN_MODAL = 'redux-example/OPEN_MODAL';
const CLOSE_MODAL = 'redux-example/CLOSE_MODAL';

const openModal = () => ({ type: OPEN_MODAL });
const closeModal = () => ({ type: CLOSE_MODAL });


const ReduxModal = ({ isOpen, onOpen, onClose, toggleCode }) => (
    <div>
        <div className="btn-group">
            <a className="btn btn-primary" onClick={onOpen}>Open</a>
            <a className="btn btn-secondary" onClick={toggleCode}>Code</a>
        </div>

        <Modal isOpen={isOpen} isBasic autoWrap title="Howdy!" onCancel={onClose}>
            <p>
                I’m a Redux controlled modal
            </p>
        </Modal>
    </div>
);

ReduxModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    toggleCode: PropTypes.func.isRequired
};

// state is single reducer to display modal, so we return it
const mapStateToProps = state => ({
    isOpen: state
});

// map modal open and close actions
const mapDispatchToProps = dispatch => ({
    onOpen: () => dispatch(openModal()),
    onClose: () => dispatch(closeModal())
});


const ReduxModalConnector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReduxModal);


function reducer(state = false, action) {
    switch (action.type) {
    case OPEN_MODAL:
        return true;

    case CLOSE_MODAL:
        return false;

    default:
        return state;
    }
}

const store = createStore(reducer);

const ReduxApp = ({ toggleCode }) => (
    <Provider store={store}>
        <ReduxModalConnector toggleCode={toggleCode} />
    </Provider>
);

ReduxApp.propTypes = {
    toggleCode: PropTypes.func.isRequired
};

export default ReduxApp;
