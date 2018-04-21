import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * This is adapted from Facebook's ReactCSSTransitionGroupChild which is in the React
 * addons and under the BSD License.
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import validateTransitionProp from './validateTransitionProp';

import toggleClass from '../toggle-class';

var TICK = 17;

var TimedCSSTransitionGroupChild = function (_Component) {
    _inherits(TimedCSSTransitionGroupChild, _Component);

    function TimedCSSTransitionGroupChild() {
        _classCallCheck(this, TimedCSSTransitionGroupChild);

        return _possibleConstructorReturn(this, (TimedCSSTransitionGroupChild.__proto__ || _Object$getPrototypeOf(TimedCSSTransitionGroupChild)).apply(this, arguments));
    }

    _createClass(TimedCSSTransitionGroupChild, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.classNameQueue = [];
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }
        }
    }, {
        key: 'getRawKey',
        value: function getRawKey() {
            return React.Children.only(this.props.children).key;
        }
    }, {
        key: 'transition',
        value: function transition(animationType, finishCallback, userSpecifiedDelay) {
            var node = ReactDOM.findDOMNode(this);

            if (!node) {
                if (finishCallback) {
                    finishCallback();
                }
                if (finishCallback) {
                    finishCallback();
                }

                return;
            }

            var className = this.props.name[animationType] || this.props.name + '-' + animationType;
            var activeClassName = this.props.name[animationType + 'Active'] || className + '-active';
            var timeout = null;

            var endListener = function endListener(e) {
                if (e && e.target !== node) {
                    return;
                }

                clearTimeout(timeout);

                toggleClass(node, className, false);
                toggleClass(node, activeClassName, false);

                if (finishCallback) {
                    finishCallback();
                }
            };

            toggleClass(node, className, true);

            // Need to do this to actually trigger a transition.
            this.queueClass(activeClassName);

            // Clean-up the animation after the specified delay
            timeout = setTimeout(endListener, userSpecifiedDelay);
        }
    }, {
        key: 'flushClassNameQueue',
        value: function flushClassNameQueue() {
            var _this2 = this;

            this.classNameQueue.forEach(function (className) {
                toggleClass(ReactDOM.findDOMNode(_this2), className, true);
            });

            this.classNameQueue.length = 0;
            this.timeout = null;
        }
    }, {
        key: 'queueClass',
        value: function queueClass(className) {
            var _this3 = this;

            this.classNameQueue.push(className);

            if (!this.timeout) {
                this.timeout = setTimeout(function () {
                    _this3.flushClassNameQueue();
                }, TICK);
            }
        }
    }, {
        key: 'chainedCall',
        value: function chainedCall(action, done) {
            var _this4 = this;

            var handlerName = 'after' + action;

            return function () {
                if (_this4.props[handlerName]) {
                    _this4.props[handlerName](_this4.getRawKey());
                }

                if (done) {
                    done();
                }
            };
        }
    }, {
        key: 'componentWillAppear',
        value: function componentWillAppear(done) {
            done = this.chainedCall('Appear', done);

            if (this.props.appear !== false) {
                this.transition('appear', done, this.props.appear);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillEnter',
        value: function componentWillEnter(done) {
            done = this.chainedCall('Enter', done);

            if (this.props.enter !== false) {
                this.transition('enter', done, this.props.enter);
            } else {
                done();
            }
        }
    }, {
        key: 'componentWillLeave',
        value: function componentWillLeave(done) {
            done = this.chainedCall('Leave', done);

            if (this.props.leave !== false) {
                this.transition('leave', done, this.props.leave);
            } else {
                done();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.Children.only(this.props.children);
        }
    }]);

    return TimedCSSTransitionGroupChild;
}(Component);

TimedCSSTransitionGroupChild.displayName = 'TimedCSSTransitionGroupChild';
TimedCSSTransitionGroupChild.propTypes = {
    children: PropTypes.node,

    name: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
        enter: PropTypes.string,
        leave: PropTypes.string,
        active: PropTypes.string
    }), PropTypes.shape({
        enter: PropTypes.string,
        enterActive: PropTypes.string,
        leave: PropTypes.string,
        leaveActive: PropTypes.string,
        appear: PropTypes.string,
        appearActive: PropTypes.string
    })]).isRequired,

    appear: validateTransitionProp,
    enter: validateTransitionProp,
    leave: validateTransitionProp,

    afterAppear: PropTypes.func,
    afterEnter: PropTypes.func,
    afterLeave: PropTypes.func
};


export default TimedCSSTransitionGroupChild;