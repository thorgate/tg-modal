import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * This is adapted from Facebook's ReactCSSTransitionGroup which is in the React
 * addons and under the BSD License.
 */

import React, { Component, PropTypes } from 'react';
import TransitionGroup from 'react-addons-transition-group';

import validateTransitionProp from './validateTransitionProp';
import TimedCSSTransitionGroupChild from './TimedCSSTransitionGroupChild';

var TimedCSSTransitionGroup = function (_Component) {
    _inherits(TimedCSSTransitionGroup, _Component);

    function TimedCSSTransitionGroup() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TimedCSSTransitionGroup);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimedCSSTransitionGroup.__proto__ || _Object$getPrototypeOf(TimedCSSTransitionGroup)).call.apply(_ref, [this].concat(args))), _this), _this._wrapChild = function (child) {
            var _this2 = _this,
                props = _this2.props;


            return React.createElement(
                TimedCSSTransitionGroupChild,
                {
                    name: props.transitionName,
                    appear: props.transitionAppear !== false ? props.transitionAppear : false,
                    enter: props.transitionEnter !== false ? props.transitionEnter : false,
                    leave: props.transitionLeave !== false ? props.transitionLeave : false,

                    afterAppear: props.afterAppear,
                    afterEnter: props.afterEnter,
                    afterLeave: props.afterLeave
                },
                child
            );
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimedCSSTransitionGroup, [{
        key: 'render',
        value: function render() {
            // remove warning for unused vars / missing proptype definition
            /* eslint no-unused-vars: 0, react/prop-types: 0 */
            var _props = this.props,
                afterEnter = _props.afterEnter,
                afterLeave = _props.afterLeave,
                animating = _props.animating,
                rest = _objectWithoutProperties(_props, ['afterEnter', 'afterLeave', 'animating']);

            return React.createElement(TransitionGroup, _extends({}, rest, { childFactory: this._wrapChild }));
        }
    }]);

    return TimedCSSTransitionGroup;
}(Component);

TimedCSSTransitionGroup.displayName = 'TimedCSSTransitionGroup';
TimedCSSTransitionGroup.propTypes = {
    transitionName: TimedCSSTransitionGroupChild.propTypes.name,

    transitionAppear: validateTransitionProp,
    transitionEnter: validateTransitionProp,
    transitionLeave: validateTransitionProp,

    afterAppear: PropTypes.func,
    afterEnter: PropTypes.func,
    afterLeave: PropTypes.func
};
TimedCSSTransitionGroup.defaultProps = {
    transitionAppear: false,
    transitionEnter: 1000,
    transitionLeave: 1000
};


export default TimedCSSTransitionGroup;