import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
import { PropTypes } from 'react';

import TimedCSSTransitionGroup from './remote/TimedCSSTransitionGroup';

import Modal from './components/Modal';
import toggleClass from './toggle-class';
import getScrollbarSize from './utils/scrollbarSize';

// This keeps track of how many modals that are open so that the
// container class and container padding for the scrollbar is correctly set.
var numberOfModalsOpen = 0;

var keyCodes = {
    ESCAPE: 27,
    ENTER: 13
};

/**
 * Wrapper for modal component that handles DOM specific stuff
 */

var BrowserModal = function (_Modal) {
    _inherits(BrowserModal, _Modal);

    function BrowserModal() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, BrowserModal);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BrowserModal.__proto__ || _Object$getPrototypeOf(BrowserModal)).call.apply(_ref, [this].concat(args))), _this), _this.handleKeys = function (e) {
            // Handle escape press
            if (e.which === keyCodes.ESCAPE) {
                _this.onCancel(e, true);
            } else if (e.which === keyCodes.ENTER) {
                // Don't do anything while animating
                if (!_this.state.animating) {
                    if (_this.props.onConfirm) {
                        e.preventDefault();

                        _this.props.onConfirm();
                    }
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(BrowserModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            _get(BrowserModal.prototype.__proto__ || _Object$getPrototypeOf(BrowserModal.prototype), 'componentDidMount', this).call(this);

            if (typeof document !== 'undefined') {
                if (this.props.keyboard) {
                    this.bindKeyboard();
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            _get(BrowserModal.prototype.__proto__ || _Object$getPrototypeOf(BrowserModal.prototype), 'componentWillUnmount', this).call(this);

            if (typeof document !== 'undefined') {
                this.unbindKeyboard();
            }
        }
    }, {
        key: 'getToggleProps',
        value: function getToggleProps(isOpen) {
            return {
                scrollbarSize: typeof document !== 'undefined' ? getScrollbarSize() : null,
                className: isOpen ? 'modal-open' : ''
            };
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            _get(BrowserModal.prototype.__proto__ || _Object$getPrototypeOf(BrowserModal.prototype), 'componentWillReceiveProps', this).call(this, nextProps);

            if (this.props.keyboard !== nextProps.keyboard) {
                if (nextProps.keyboard) {
                    this.bindKeyboard();
                } else {
                    this.unbindKeyboard();
                }
            }
        }
    }, {
        key: 'onToggle',
        value: function onToggle(state, props) {
            // Call super (calls props.onToggle)
            _get(BrowserModal.prototype.__proto__ || _Object$getPrototypeOf(BrowserModal.prototype), 'onToggle', this).call(this, state, props);

            // Add body class and padding to scrollbar.
            if (typeof document !== 'undefined') {
                var container = document.body;

                // Increment modal count when opening.
                if (state) {
                    numberOfModalsOpen += 1;
                }

                // Add toggle body class and update body padding if there is only one modal open.
                if (numberOfModalsOpen === 1) {

                    // Toggle open class.
                    toggleClass(container, 'modal-open', state);

                    if (state) {
                        this._origPadding = container.style.paddingRight;
                        container.style.paddingRight = parseInt(this._origPadding || 0, 10) + props.scrollbarSize + 'px';
                    } else {
                        container.style.paddingRight = this._origPadding;
                    }
                }

                // Decrement modal count when closing.
                if (!state) {
                    numberOfModalsOpen = Math.max(numberOfModalsOpen - 1, 0);
                }
            }
        }
    }, {
        key: 'bindKeyboard',
        value: function bindKeyboard() {
            // Ensure we don't bind twice
            this.unbindKeyboard();

            if (typeof document !== 'undefined') {
                this._keyHandler = this.handleKeys;

                document.addEventListener('keyup', this._keyHandler, false);
            }
        }
    }, {
        key: 'unbindKeyboard',
        value: function unbindKeyboard() {
            if (typeof document !== 'undefined') {
                if (this._keyHandler) {
                    document.removeEventListener('keyup', this._keyHandler, false);
                    this._keyHandler = null;
                }
            }
        }
    }, {
        key: 'getAnimatorClass',
        value: function getAnimatorClass() {
            return TimedCSSTransitionGroup;
        }
    }, {
        key: 'getAnimatorProps',
        value: function getAnimatorProps() {
            return _extends({}, _get(BrowserModal.prototype.__proto__ || _Object$getPrototypeOf(BrowserModal.prototype), 'getAnimatorProps', this).call(this), {
                component: 'div',
                className: 'modal-wrapper' + (this.state.animating ? ' animating' : '')
            });
        }
    }]);

    return BrowserModal;
}(Modal);

BrowserModal.propTypes = _extends({}, Modal.propTypes, {
    keyboard: PropTypes.bool
});
BrowserModal.defaultProps = _extends({}, Modal.defaultProps, {
    keyboard: true
});


export default BrowserModal;