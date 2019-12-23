import { render } from '@testing-library/react';
import React from 'react';

import TestUtils from 'react-dom/test-utils';

/* eslint-disable import/prefer-default-export */
export function buildContainer(component, props) {
    const elem = React.createElement(component, props);
    const container = TestUtils.renderIntoDocument(elem);

    return TestUtils.findRenderedComponentWithType(container, component);
}

export function testRenderFunctional(component, props, testID) {
    const elem = React.createElement(component, props);
    const { getByTestId } = render(elem);

    return getByTestId(testID);
}
