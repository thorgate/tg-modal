import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import { assert } from 'chai';
import sinon from 'sinon';

import ModalHeader from '../src/components/dom/ModalHeader';

import { buildContainer } from './util';

describe('ModalHeader', () => {
    it('renders correctly', () => {
        const spyConsoleWarn = sinon.spy();
        console.warn = spyConsoleWarn;

        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world' }));

        // test spy was not called yet
        assert.equal(spyConsoleWarn.callCount, 1);

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('tg-modal-header'));

        // H1 is rendered into the container
        assert.equal(container.querySelectorAll('h1.tg-modal-title').length, 1);

        // H1 value is correct
        assert.equal(container.querySelector('h1.tg-modal-title').textContent, 'Hello world');

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 1);
    });

    it('raw children work', () => {
        const spyConsoleWarn = sinon.spy();
        console.warn = spyConsoleWarn;

        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: <span>Sup</span> }));

        // test spy was not called yet
        assert.equal(spyConsoleWarn.callCount, 1);

        assert.equal(container.nodeName, 'SPAN');
        assert.equal(container.textContent, 'Sup');
    });

    it('className works', () => {
        const spyConsoleWarn = sinon.spy();
        console.warn = spyConsoleWarn;

        const container = ReactDOM.findDOMNode(
            buildContainer(ModalHeader, { className: 'foo', children: 'Hello world' }),
        );

        // test spy was not called yet
        assert.equal(spyConsoleWarn.callCount, 1);

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('foo'));
    });

    it('addClose=false does not add close button', () => {
        const container = ReactDOM.findDOMNode(
            buildContainer(ModalHeader, { addClose: false, children: 'Hello world' }),
        );

        // Close button is not rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 0);
    });

    it('onCancel is called after click', () => {
        const spy = sinon.spy();

        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world', onCancel: spy }));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.tg-modal-close'));

        // test spy was called once
        assert.equal(spy.callCount, 1);
    });

    it('onCancel is not called when isStatic is true', () => {
        const spy = sinon.spy();

        const container = ReactDOM.findDOMNode(
            buildContainer(ModalHeader, { children: 'Hello world', onCancel: spy, isStatic: true }),
        );

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.tg-modal-close'));

        // test spy was not called
        assert.equal(spy.callCount, 0);
    });

    it('addClose is defined and onCancel is not defined', () => {
        const spyConsoleWarn = sinon.spy();
        console.warn = spyConsoleWarn;

        const container = ReactDOM.findDOMNode(
            buildContainer(ModalHeader, { children: 'Hello world', addClose: true }),
        );

        // test spy was not called yet
        assert.equal(spyConsoleWarn.callCount, 1);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.tg-modal-close'));
    });

    it('click handler works w/o onCancel', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world' }));

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.tg-modal-close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.tg-modal-close'));
    });
});
