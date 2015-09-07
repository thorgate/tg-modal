// Render serverside example in the client
import React from 'react';

import Prerendered from './components/Prerendered';
import {Kiosk} from './components/Serverside';


// Load styles
require('./styles/main.scss');
require('../src/styles/default.scss');


const kiosk = new Kiosk();

React.render(<Prerendered initialOpen={true} kiosk={kiosk} />, document.getElementById('content'));

