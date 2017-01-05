import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import { assert } from 'chai';
import sinon from 'sinon';

import ModalHeader from '../src/components/dom/ModalHeader';

import { buildContainer } from './util';


describe('ModalHeader', () => {
    it('renders correctly', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world' }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('modal-header'));

        // H1 is rendered into the container
        assert.equal(container.querySelectorAll('h1.modal-title').length, 1);

        // H1 value is correct
        assert.equal(container.querySelector('h1.modal-title').textContent, 'Hello world');

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.close').length, 1);
    });

    it('raw children work', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: (<span>Sup</span>) }));

        assert.equal(container.nodeName, 'SPAN');
        assert.equal(container.textContent, 'Sup');
    });

    it('className works', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { className: 'foo', children: 'Hello world' }));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('foo'));
    });

    it('addClose=false does not add close button', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { addClose: false, children: 'Hello world' }));

        // Close button is not rendered into the container
        assert.equal(container.querySelectorAll('button.close').length, 0);
    });

    it('onCancel is called after click', () => {
        const spy = sinon.spy();

        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world', onCancel: spy }));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.close'));

        // test spy was called once
        assert.equal(spy.callCount, 1);
    });

    it('onCancel is not called when isStatic is true', () => {
        const spy = sinon.spy();

        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world', onCancel: spy, isStatic: true }));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.close'));

        // test spy was not called
        assert.equal(spy.callCount, 0);
    });

    it('click handler works w/o onCancel', () => {
        const container = ReactDOM.findDOMNode(buildContainer(ModalHeader, { children: 'Hello world' }));

        // Close button is rendered into the container
        assert.equal(container.querySelectorAll('button.close').length, 1);

        // Trigger click
        TestUtils.Simulate.click(container.querySelector('button.close'));
    });
});
