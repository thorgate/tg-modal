import { assert } from 'chai';

import ModalBody from '../src/components/dom/ModalBody';

import { testRenderFunctional } from './util';

beforeEach(() => {
    ModalBody.defaultProps['data-testid'] = 'Modal.Body';
});

describe('ModalBody', () => {
    it('renders correctly', () => {
        const container = testRenderFunctional(ModalBody, {}, 'Modal.Body');

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('tg-modal-body'));
    });

    it('className works', () => {
        const container = testRenderFunctional(ModalBody, { className: 'foo' }, 'Modal.Body');

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('foo'));
    });

    it('children work', () => {
        const container = testRenderFunctional(ModalBody, { children: 'hello world' }, 'Modal.Body');

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has correct contents
        assert.equal(container.textContent, 'hello world');
    });
});
