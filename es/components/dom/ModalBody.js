import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';

var ModalBody = function (_Component) {
    _inherits(ModalBody, _Component);

    function ModalBody() {
        _classCallCheck(this, ModalBody);

        return _possibleConstructorReturn(this, (ModalBody.__proto__ || _Object$getPrototypeOf(ModalBody)).apply(this, arguments));
    }

    _createClass(ModalBody, [{
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                this.props,
                this.props.children
            );
        }
    }]);

    return ModalBody;
}(Component);

ModalBody.displayName = 'Modal.Body';
ModalBody.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};
ModalBody.defaultProps = {
    className: 'modal-body'
};


export default ModalBody;