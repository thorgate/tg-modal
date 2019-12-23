import path from 'path';
import fs from 'fs';

import { assert } from 'chai';
import { Component } from 'react';

import Modal from '../src';

function assertValidComponent(a, key, displayName, Base = Component) {
    assert.isDefined(a, `${key} should be defined`);
    assert.isFunction(a, `${key} should be a function`);

    if (Base !== null) {
        assert(a.prototype instanceof Base, `${key} should be a Component`);
    }

    assert(a && a.displayName === displayName, `${key} should be ${displayName}`);
}

describe('Exports work', () => {
    it('default export is correct', () => {
        assertValidComponent(Modal, 'default export', 'Modal');
    });

    it('Default styles are in dist folder', () => {
        assert(fs.existsSync(path.join(__dirname, '..', 'dist', 'default.css')), 'default.css should exist in dist/');
        assert(fs.existsSync(path.join(__dirname, '..', 'dist', 'default.scss')), 'default.scss should exist in dist/');
    });

    it('default.Body is Modal.Body', () => {
        assertValidComponent(Modal.Body, 'default.Body', 'Modal.Body', null);
    });

    it('default.Header is Modal.Header', () => {
        assertValidComponent(Modal.Header, 'default.Header', 'Modal.Header');
    });
});
