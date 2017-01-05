import ReactDOM from 'react-dom';

import { assert } from 'chai';

import Modal from '../src';

import { buildContainer } from './util';


describe('Modal Backdrop', () => {
    it('renders correctly', () => {
        ReactDOM.findDOMNode(buildContainer(Modal, {}));
    });
});
