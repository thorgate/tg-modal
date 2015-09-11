import { assert } from 'chai';
import React, {Component} from 'react';

import Modal from '../index';

export default {
    'Exports work': {
        'default export is not undefined'() {
            assert.isDefined(Modal, 'default export should be defined');
        },
        'default export is a function'() {
            assert.isFunction(Modal, 'default export should be a function');
        },
        'default export is a react component'() {
            assert(Modal.prototype instanceof Component, 'default export should be a react component');
        },
        'default export is our Modal component'() {
            assert(Modal && Modal.displayName === 'Modal', 'default export should be our Modal');
        }
    }
};
