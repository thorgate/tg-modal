import React from 'react';

import TestUtils from 'react-dom/test-utils';

/* eslint-disable import/prefer-default-export */
export function buildContainer(component, props) {
    const elem = React.createElement(component, props);
    const container = TestUtils.renderIntoDocument(elem);

    return TestUtils.findRenderedComponentWithType(container, component);
}
