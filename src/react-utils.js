/* eslint react/no-deprecated: [1, {"react": "0.12.0"}] */
import React from 'react';


export const findDOMNode = (component) => {
    if (React.version >= '0.14.0') {
        return require('react-dom').findDOMNode(component);
    } else { /* istanbul ignore next */
        return React.findDOMNode(component);
    }
};


export const getTransitionGroup = () => {
    if (React.version >= '0.14.0') {
        return require('react-addons-transition-group');
    } else { /* istanbul ignore next */
        return require('react/addons').addons.TransitionGroup;
    }
};


export const getTestUtils = () => {
    if (React.version >= '0.14.0') {
        return require('react-addons-test-utils');
    } else { /* istanbul ignore next */
        return require('react/addons').addons.TestUtils;
    }
};


export const getRenderer = () => {
    if (React.version >= '0.14.0') {
        return require('react-dom');
    } else { /* istanbul ignore next */
        return React;
    }
};
