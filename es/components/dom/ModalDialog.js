import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';

var ModalDialog = function (_Component) {
    _inherits(ModalDialog, _Component);

    function ModalDialog() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ModalDialog);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ModalDialog.__proto__ || _Object$getPrototypeOf(ModalDialog)).call.apply(_ref, [this].concat(args))), _this), _this.onCancel = function (e) {
            /* istanbul ignore else */
            if (e && e.preventDefault) {
                e.preventDefault();
            }

            _this.props.onCancel(e, null);
        }, _this.stopPropagate = function (e) {
            e.stopPropagation();
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ModalDialog, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                isBasic = _props.isBasic,
                className = _props.className;

            var wrapperClassName = 'modal' + (isBasic ? ' modal-basic' : '');

            return React.createElement(
                'div',
                { className: wrapperClassName, onClick: this.onCancel },
                React.createElement(
                    'div',
                    { className: className },
                    React.createElement(
                        'div',
                        { className: 'modal-content', onClick: this.stopPropagate },
                        children
                    )
                )
            );
        }
    }]);

    return ModalDialog;
}(Component);

ModalDialog.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,

    onCancel: PropTypes.func.isRequired,
    isBasic: PropTypes.bool
};
ModalDialog.defaultProps = {
    className: 'modal-dialog'
};


export default ModalDialog;