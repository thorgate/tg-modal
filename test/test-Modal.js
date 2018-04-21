import ReactDOM from 'react-dom';

import { assert } from 'chai';

import Modal from '../src';

import { buildContainer } from './util';


describe('Modal', () => {
    // TODO: Add more tests after we have removed BrowserModal indirection
    it('Smoke: it renders', () => {
        ReactDOM.findDOMNode(buildContainer(Modal, { onCancel: () => null, isOpen: true }));
    });
});
