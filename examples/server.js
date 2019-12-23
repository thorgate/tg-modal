import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Prerendered from './components/Prerendered';

const app = new Koa();
const contents = fs.readFileSync(path.join(__dirname, 'index.html'), { encoding: 'utf-8' });

const cssPath = (file) => `//localhost:8081/${file}`;

function template(bodyClasses, rendered) {
    return contents
        .replace('bundle.main.js', cssPath('render.main.js'))
        .replace('bundle.main.css', cssPath('bundle.main.css'))
        .replace('<div id="content"></div>', `<div id="content">${rendered}</div>`)
        .replace('<body>', `<body class="${bodyClasses}">`);
}

app.use((ctx, next) => {
    let bodyProps = {};
    const setBodyProps = (value) => {
        bodyProps = value;
    };

    const rendered = ReactDOMServer.renderToString(<Prerendered initialOpen setBodyProps={setBodyProps} />);

    ctx.status = 200;
    ctx.body = template(bodyProps.className, rendered);

    return next();
});

app.listen(3000, () => {
    console.log('');
    console.log('Make sure you have webpack running (yarn start) and then open http://127.0.0.1:3000/');
    console.log('   You should see an opened modal in the page (opened already in server-side HTML)');
    console.log('');
});
