# tg-modal

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Universal modal component for React.

## Install

```sh
npm install tg-modal
```

## Basic Usage

See the examples.

## Serverside rendering

Note: If you are fine with the small FOUC on page-load (class is added when Modal mounts clientside), you don't actually need this.

Serverside rendering is simple when you are using flux (or redux). Just extend the base `Modal` component
and override the methods: actionShow/actionHide.

Note: You can also provide those callbacks as props each time you render a `Modal`, but that isn't DRY.

For example (in redux):

```js

class MyModal extends Modal {
    actionShow(bodyProps) {
        // Dispatch modalState action with bodyProps ({className: 'modal-open'})
        this.props.dispatch(modalState(bodyProps));
    }
    
    actionHide(bodyProps) {
        // Dispatch modalState action with bodyProps ({className: ''})
        this.props.dispatch(modalState(bodyProps));
    }
}
```

Then when you are doing serverside rendering, you can ask your store for the current bodyProps,
and modify your return html accordingly.

### Halp, im not using flux/redux

> Well, you should be.

If you are not using flux/redux and still want to prerender your modals serverside, 
you can take a look at the following files:

 - [server.js](https://github.com/thorgate/tg-modal/tree/master/examples/server.js)
 - [render.js](https://github.com/thorgate/tg-modal/tree/master/examples/render.js)
 - [Prerendered.js](https://github.com/thorgate/tg-modal/tree/master/examples/components/Prerendered.js)
 - [Serverside.js](https://github.com/thorgate/tg-modal/tree/master/examples/components/Serverside.js)

## Known issues

 - Missing an Uncontrolled modal (ModalTrigger component)
 - Problems with animations
  - We depend on react/addons, but we shouldn't
  - Animations break if we close trigger close/reopen while the opposite action is still transitioning
  - We shouldn't trigger callBacks while transitions are still running
 - missing tests

## License

MIT © [Thorgate](http://github.com/thorgate)

[npm-url]: https://npmjs.org/package/tg-modal
[npm-image]: https://img.shields.io/npm/v/tg-modal.svg?style=flat-square

[travis-url]: https://travis-ci.org/thorgate/tg-modal
[travis-image]: https://img.shields.io/travis/thorgate/tg-modal.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/thorgate/tg-modal
[coveralls-image]: https://img.shields.io/coveralls/thorgate/tg-modal.svg?style=flat-square

[depstat-url]: https://david-dm.org/thorgate/tg-modal
[depstat-image]: https://david-dm.org/thorgate/tg-modal.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/tg-modal.svg?style=flat-square
