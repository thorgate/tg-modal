import fs from 'fs';
import path from 'path';

import koa from 'koa';
import React from 'react';

import {Kiosk} from './components/Serverside';
import Prerendered from './components/Prerendered';


const app = koa();
const contents = fs.readFileSync(path.join(__dirname, 'index.html'), {encoding: 'utf-8'});

function template(bodyClasses, rendered) {
    return contents
            .replace('bundle.js', '//localhost:8081/render.js')
            .replace('<div id="content"></div>', `<div id="content">${rendered}</div>`)
            .replace('<body>', `<body class="${bodyClasses}">`);
}


function serverside() {
    return function * (next) {
        const kiosk = new Kiosk();
        const rendered = React.renderToString(<Prerendered initialOpen={true} kiosk={kiosk} />);

        this.body = template(kiosk.getState().className, rendered);
        yield * next;
    };
}


app.use(serverside());

app.listen(3000);
