import _extends from 'babel-runtime/helpers/extends';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component, PropTypes } from 'react';

import ModalDialog from './dom/ModalDialog';
import ModalHeader from './dom/ModalHeader';
import ModalBody from './dom/ModalBody';
import Backdrop from './dom/Backdrop';

var Modal = function (_Component) {
    _inherits(Modal, _Component);

    function Modal(props) {
        _classCallCheck(this, Modal);

        var _this = _possibleConstructorReturn(this, (Modal.__proto__ || _Object$getPrototypeOf(Modal)).call(this, props));

        _this.onCancel = function (e, extra) {
            // Don't do anything while animating
            if (_this.state.animating) {
                return;
            }

            if (_this.props.isOpen && !_this.props.isStatic) {
                if (_this.props.onCancel) {
                    _this.props.onCancel(e, extra);
                }
            }
        };

        _this.clearAnimating = function () {
            _this.setState({
                animating: false
            });
        };

        _this.renderChild = function (child) {
            if (!child) {
                return child;
            }

            var onCancel = _this.props.onCancel;

            var _ref = child.props || {},
                addClose = _ref.addClose,
                headerOnCancel = _ref.headerOnCancel;

            if (child.type === ModalHeader && addClose && !headerOnCancel) {
                return React.cloneElement(child, _extends({}, child.props, {
                    onCancel: onCancel
                }));
            }

            return child;
        };

        _this.state = {};

        // validate children props and warn if something is wrong
        React.Children.forEach(props.children, function (child) {
            if (child && child.type === ModalHeader) {
                if (child.props.addClose && !child.props.onCancel) {
                    console.warn(ModalHeader.displayName + ': addClose is defined but onCancel is missing!');
                }
            }
        });
        return _this;
    }

    _createClass(Modal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.onToggle(this.props.isOpen, this.getToggleProps());
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            if (this.props.isOpen !== nextProps.isOpen) {
                this.setState({
                    animating: true
                }, function () {
                    _this2.onToggle(nextProps.isOpen, _this2.getToggleProps());
                });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.isOpen) {
                this.onToggle(false, this.getToggleProps());
            }
        }
    }, {
        key: 'onToggle',
        value: function onToggle(state, props) {
            if (this.props.onToggle) {
                this.props.onToggle(state, props);
            }
        }
    }, {
        key: 'getToggleProps',
        value: function getToggleProps() {
            return {};
        }
    }, {
        key: 'getAnimatorClass',
        value: function getAnimatorClass() {
            // Should be overwritten by the parent
            return null;
        }
    }, {
        key: 'getAnimatorProps',
        value: function getAnimatorProps() {
            var animating = this.state.animating;


            return {
                transitionName: this.props.transitionName,
                transitionEnter: this.props.transitionDuration,
                transitionLeave: this.props.transitionDuration,
                afterEnter: this.clearAnimating,
                afterLeave: this.clearAnimating,
                animating: animating
            };
        }
    }, {
        key: 'renderModalBody',
        value: function renderModalBody() {
            var children = React.Children.map(this.props.children, this.renderChild);
            if (this.props.autoWrap) {
                return React.createElement(
                    ModalBody,
                    null,
                    children
                );
            }

            return children;
        }
    }, {
        key: 'renderModalHeader',
        value: function renderModalHeader() {
            var _props = this.props,
                title = _props.title,
                isStatic = _props.isStatic;


            if (!title) {
                // No title: Return nothing
                return null;
            } else if (typeof title === 'string') {
                // Title is a string, return a ModalHeader
                return React.createElement(
                    ModalHeader,
                    { addClose: !isStatic, onCancel: this.onCancel },
                    title
                );
            } else {
                // Fall back to rendering title directly (events should be handled by parent)
                return title;
            }
        }
    }, {
        key: 'renderModal',
        value: function renderModal() {
            var _props2 = this.props,
                isOpen = _props2.isOpen,
                isBasic = _props2.isBasic,
                isStatic = _props2.isStatic,
                dialogClassName = _props2.dialogClassName;


            if (!isOpen) {
                return [];
            }

            var parts = [React.createElement(Backdrop, { isStatic: isStatic, onCancel: this.onCancel, key: 'backdrop' }), React.createElement(
                ModalDialog,
                { isBasic: isBasic, onCancel: this.onCancel, key: 'dialog', className: dialogClassName },
                this.renderModalHeader(),
                this.renderModalBody()
            )];

            return parts;
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(this.getAnimatorClass(), this.getAnimatorProps(), this.renderModal());
        }
    }]);

    return Modal;
}(Component);

Modal.displayName = 'Modal';
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,

    children: PropTypes.node,

    isStatic: PropTypes.bool,
    isBasic: PropTypes.bool,
    autoWrap: PropTypes.bool,
    dialogClassName: PropTypes.string,

    transitionName: PropTypes.string,
    transitionDuration: PropTypes.number,

    title: PropTypes.node,

    // This is internally used
    onToggle: PropTypes.func
};
Modal.defaultProps = {
    autoWrap: false,
    dialogClassName: 'modal-dialog',
    transitionName: 'fade',
    transitionDuration: 300
};


export default Modal;