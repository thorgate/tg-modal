// Render serverside example in the client
import React from 'react';

import Prerendered from './components/Prerendered';
import { Kiosk } from './components/Serverside';

// Load styles
require('./styles/main.scss');

const kiosk = new Kiosk();

$RVRenderer.render(<Prerendered initialOpen kiosk={kiosk} />, document.getElementById('content'));
