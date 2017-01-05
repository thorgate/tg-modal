import React from 'react';

import TestUtils from 'react-addons-test-utils';


export function buildContainer(component, props) {
    const elem = React.createElement(component, props);
    const container = TestUtils.renderIntoDocument(elem);

    return TestUtils.findRenderedComponentWithType(container, component);
}
