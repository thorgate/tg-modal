import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';

var ModalHeader = function (_Component) {
    _inherits(ModalHeader, _Component);

    function ModalHeader(props) {
        _classCallCheck(this, ModalHeader);

        // warn if something is wrong with props
        var _this = _possibleConstructorReturn(this, (ModalHeader.__proto__ || _Object$getPrototypeOf(ModalHeader)).call(this, props));

        _this.onCancel = function (e) {
            /* istanbul ignore else */
            if (e && e.preventDefault) {
                e.preventDefault();
            }

            if (!_this.props.isStatic) {
                if (_this.props.onCancel) {
                    _this.props.onCancel(e, null);
                }
            }
        };

        if (props.addClose && !props.onCancel) {
            console.warn(ModalHeader.displayName + ': addClose is defined but onCancel is missing!');
        }
        return _this;
    }

    _createClass(ModalHeader, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                addClose = _props.addClose,
                className = _props.className;


            if (typeof children !== 'string') {
                return children;
            }

            var closeBtn = addClose ? React.createElement(
                'button',
                { className: 'close', 'aria-label': 'Close', onClick: this.onCancel },
                React.createElement(
                    'span',
                    { 'aria-hidden': 'true' },
                    '\xD7'
                )
            ) : null;

            return React.createElement(
                'div',
                { className: className },
                React.createElement(
                    'h1',
                    { className: 'modal-title' },
                    children
                ),
                closeBtn
            );
        }
    }]);

    return ModalHeader;
}(Component);

ModalHeader.displayName = 'Modal.Header';
ModalHeader.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isStatic: PropTypes.bool,
    addClose: PropTypes.bool,
    onCancel: PropTypes.func
};
ModalHeader.defaultProps = {
    className: 'modal-header',
    addClose: true
};


export default ModalHeader;