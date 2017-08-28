import ReactDOM from 'react-dom';

import { assert } from 'chai';

import ModalBody from '../src/components/dom/ModalBody';

import { buildContainer } from './util';


describe('ModalBody', () => {
    it('renders correctly', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalBody, {}));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('tg-modal-body'));
    });

    it('className works', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalBody, { className: 'foo' }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('foo'));
    });

    it('children work', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalBody, { children: 'hello world' }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has correct contents
        assert.equal(container.textContent, 'hello world');
    });
});
