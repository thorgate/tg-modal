import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';

var Backdrop = function (_Component) {
    _inherits(Backdrop, _Component);

    function Backdrop() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Backdrop);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Backdrop.__proto__ || _Object$getPrototypeOf(Backdrop)).call.apply(_ref, [this].concat(args))), _this), _this.onCancel = function (e) {
            /* istanbul ignore else */
            if (e && e.preventDefault) {
                e.preventDefault();
            }

            if (!_this.props.isStatic) {
                _this.props.onCancel(e, null);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Backdrop, [{
        key: 'render',
        value: function render() {
            // remove warning for unused vars / missing proptype definition
            /* eslint no-unused-vars: 0, react/prop-types: 0 */
            var _props = this.props,
                isStatic = _props.isStatic,
                onCancel = _props.onCancel,
                rest = _objectWithoutProperties(_props, ['isStatic', 'onCancel']);

            return React.createElement('div', _extends({}, rest, { onClick: this.onCancel }));
        }
    }]);

    return Backdrop;
}(Component);

Backdrop.propTypes = {
    isStatic: PropTypes.bool,
    onCancel: PropTypes.func,
    className: PropTypes.string
};
Backdrop.defaultProps = {
    className: 'modal-backdrop'
};


export default Backdrop;