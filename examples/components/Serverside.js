import React, { useContext } from 'react';
import { useCallback, createContext, useState } from 'react';

import Modal from '../../src/components/Modal';

export const ModalContext = createContext();

// Wrap the Modal component and hook into its open/close event
const ServerSideModal = ({ onToggle, ...rest }) => {
    const ctx = useContext(ModalContext);

    const wrappedOnToggle = useCallback((isOpen, bodyProps) => {
        // Pass action to our global state handler
        if (ctx && ctx.setBodyProps) {
            ctx.setBodyProps(bodyProps);
        }

        if (onToggle) {
            onToggle(isOpen, bodyProps);
        }
    }, [onToggle]);

    return (
        <Modal onToggle={wrappedOnToggle} {...rest} />
    );

};

export const ModalManager = ({ children, setBodyProps: propsSetBodyProps }) => {
    const [bodyProps, setBodyProps] = useState({ props: {} });

    const wrappedSetBodyProps = useCallback((newBodyProps) => {
        setBodyProps({ props: newBodyProps });

        // Pass props to outside as well
        if (propsSetBodyProps) {
            propsSetBodyProps(newBodyProps);
        }
    }, [propsSetBodyProps]);

    return (
        <ModalContext.Provider value={{ bodyProps: bodyProps.props, setBodyProps: wrappedSetBodyProps }}>
            {children}
        </ModalContext.Provider>
    );
};

export default ServerSideModal;
