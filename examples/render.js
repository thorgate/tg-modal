import React from 'react';
import ReactDOM from 'react-dom';

import Prerendered from './components/Prerendered';

// Load styles
require('./styles/main.scss');
require('../src/styles/default.scss');

ReactDOM.hydrate(<Prerendered initialOpen />, document.getElementById('content'));
