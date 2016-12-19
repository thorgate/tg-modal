import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import packageCfg from '../package.json';


// Load styles
require('./styles/main.scss');
require('../src/styles/default.scss');


ReactDOM.render(<App packageCfg={packageCfg} />, document.getElementById('content'));
