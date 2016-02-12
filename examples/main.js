import React from 'react';

import App from './components/App';

import packageCfg from '../package.json';

import {getRenderer} from '../src/react-utils';


// Load styles
require('./styles/main.scss');
require('../src/styles/default.scss');


getRenderer().render(<App packageCfg={packageCfg} />, document.getElementById('content'));
