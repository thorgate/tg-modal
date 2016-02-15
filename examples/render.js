// Render serverside example in the client
import React from 'react';

import Prerendered from './components/Prerendered';
import {Kiosk} from './components/Serverside';

import {getRenderer} from '../src/react-utils';


// Load styles
require('./styles/main.scss');

const kiosk = new Kiosk();

getRenderer().render(<Prerendered initialOpen kiosk={kiosk} />, document.getElementById('content'));
