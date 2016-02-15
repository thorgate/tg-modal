import React from 'react';
import {assert} from 'chai';
import sinon from 'sinon';

import Backdrop from '../dist/components/dom/Backdrop';
import {findDOMNode, getTestUtils} from '../dist/react-utils';


const TestUtils = getTestUtils();

function buildContainer(component, props) {
    const elem = React.createElement(component, props);
    const container = TestUtils.renderIntoDocument(elem);

    return TestUtils.findRenderedComponentWithType(container, component);
}

describe('dom backdrop works', () => {
    it('renders correctly', () => {
        const container = findDOMNode(buildContainer(Backdrop, {}));

        // Its a div
        assert.equal(container.nodeName, 'DIV');

        // It has the correct default class
        assert.ok(container.classList.contains('modal-backdrop'));
    });

    it('onCancel is called after click', () => {
        const spy = sinon.spy();

        const container = findDOMNode(buildContainer(Backdrop, {onCancel: spy}));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Trigger click
        TestUtils.Simulate.click(container);

        // test spy was called once
        assert.equal(spy.callCount, 1);
    });

    it('static wont call onCancel', () => {
        const spy = sinon.spy();
        const container = findDOMNode(buildContainer(Backdrop, {onCancel: spy, isStatic: true}));

        // test spy was not called yet
        assert.equal(spy.callCount, 0);

        // Trigger click
        TestUtils.Simulate.click(container);

        // test spy was not called since this is static
        assert.equal(spy.callCount, 0);
    });
});
