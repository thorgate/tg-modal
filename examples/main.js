import React from 'react';

import App from './components/App';

import packageCfg from '../package.json';


// Load styles
require('./styles/main.scss');
require('../src/styles/default.scss');


$RVRenderer.render(<App packageCfg={packageCfg} />, document.getElementById('content'));
