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

## Known issues

 - Missing an Uncontrolled modal (ModalTrigger component)
 - Problems with animations
  - We depend on react/addons, but we shouldn't
  - Animations break if we close trigger close/reopen while the opposite action is still transitioning
  - We shouldn't trigger callBacks while transitions are still running
 - Scrollbar width is hardcoded to 17px. This should be calculated in the browser.
 - onToggle hooks for serverside rendering
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
