import React from 'react';

import App from './components/App';

import packageCfg from '../package.json';


React.render(<App packageCfg={packageCfg} />, document.getElementById('content'))
