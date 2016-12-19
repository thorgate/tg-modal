// Render serverside example in the client
import React from 'react';
import ReactDOM from 'react-dom';

import Prerendered from './components/Prerendered';
import { Kiosk } from './components/Serverside';

// Load styles
require('./styles/main.scss');

const kiosk = new Kiosk();

ReactDOM.render(<Prerendered initialOpen kiosk={kiosk} />, document.getElementById('content'));
