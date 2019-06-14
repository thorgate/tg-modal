import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { Kiosk } from './components/Serverside';
import Prerendered from './components/Prerendered';

const app = new Koa();
const contents = fs.readFileSync(path.join(__dirname, 'index.html'), { encoding: 'utf-8' });

function template(bodyClasses, rendered) {
    return contents
        .replace('bundle.js', '//localhost:8081/render.js')
        .replace('bundle.css', '//localhost:8081/bundle.css')
        .replace('<div id="content"></div>', `<div id="content">${rendered}</div>`)
        .replace('<body>', `<body class="${bodyClasses}">`);
}

app.use((ctx, next) => {
    const kiosk = new Kiosk();
    const rendered = ReactDOMServer.renderToString(<Prerendered initialOpen kiosk={kiosk} />);

    ctx.status = 200;
    ctx.body = template(kiosk.getState().className, rendered);

    return next();
});

app.listen(3000);
