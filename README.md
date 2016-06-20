# tg-modal

## Introduction

tg-modal is a react component for Modals. It aims to provide a standalone
`Modal` without the need of adding a big UI library to your dependencies.

[![NPM version][npm-image]][npm-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

## Installation

```sh
npm install tg-modal
```

## React 0.14+

Please also make sure you install `react-addons-transition-group`

## React 0.13.X

To use with 0.13.X of react, just import modal from `tg-modal/v013`

### Import

```js
import Modal from 'tg-modal';
```

### Styles

To get the actual modal working (it might be invisible without them), one should import
default styles to your own assets. These are available as `tg-modal/dist/default.scss`.

> SCSS available at: `tg-modal/dist/default.scss`

### Custom styles

To use your own styles, the current recommendation is importing the default styles,
and customizing them.

## Usage

Assuming you have included the style-sheet, you can render a simple modal like this:

```js
// Import the modal
import Modal from 'tg-modal';

<Modal isOpen={true} title="First modal" isStatic>
    Modal body...
</Modal>
```

This will render a static modal which can't be hidden by the user.

### PropTypes

#### Modal

    Property            |   Type        |   Description
:-----------------------|:--------------|:--------------------------------
    onCancel            |   func        |   Called when user cancels the modal (Close button, backdrop click or `ESC` pressed). `function (event, keyboard) {}`
    onConfirm           |   func        |   Called after confirm the modal (Currently only by pressing `ENTER`) `function () {}`
    isOpen              |   bool        |   Should the modal be visible
    title               |   node        |   When set `Modal` will render this as child of `Modal.Header` element.
    isStatic            |   bool        |   is the modal Static (backdrop click won't trigger `onCancel`)
    isBasic             |   bool        |   is the modal Basic (backdrop only, best for confirms)
    keyboard            |   bool        |   Should the modal listen to keyboard events (`ENTER` or `ESCAPE` press) [default: true]
    autoWrap            |   bool        |   If true, children will be wrapped inside `Modal.Body` [default: false]
    onToggle            |   func        |   function called after modal is toggled. `function (isOpen, props) { }`
    transitionName      |   string      |   Name of animation to use for open/close (to see how to define custom ones see default styles) [default: fade]
    transitionDuration  |   int         |   Duration of the transition in milliseconds [default: 300]

Props not specified here are considered internal, and are prone to change.

#### Modal.Header

    Property            |   Type        |   Description
:-----------------------|:--------------|:--------------------------------
    children            |   node        |   Contents
    isStatic            |   bool        |   If true then the close button won't trigger `onCancel`
    addClose            |   bool        |   Show the close button [default: true]
    onCancel            |   func        |   Callback to trigger when the close button is clicked

#### Modal.Body

        Property            |   Type        |   Description
    :-----------------------|:--------------|:--------------------------------
        children            |   node        |   Contents
        className           |   string      |   Class name to add to the wrapper div [default: modal-body]

### Examples

Examples are available [here][public-url].

## Troubleshooting

If you encounter a problem, please [file an issue](https://github.com/thorgate/tg-modal/issues).

## Migrating to 0.3

see [migrating](./Migrate.md)

## License

MIT © [Thorgate](http://github.com/thorgate)

[npm-url]: https://npmjs.org/package/tg-modal
[npm-image]: https://img.shields.io/npm/v/tg-modal.svg?style=flat-square

[depstat-url]: https://david-dm.org/thorgate/tg-modal
[depstat-image]: https://david-dm.org/thorgate/tg-modal.svg?style=flat-square

[download-badge]: https://img.shields.io/npm/dm/tg-modal.svg?style=flat-square

[public-url]: https://thorgate.github.io/tg-modal
