/**
 * This is adapted from Facebook's ReactCSSTransitionGroupChild which is in the React
 * addons and under the BSD License.
 */

import React, { Component, PropTypes } from 'react';

import validateTransitionProp from './validateTransitionProp';

import toggleClass from '../toggle-class';


const TICK = 17;


class TimedCSSTransitionGroupChild extends Component {
    static displayName = 'TimedCSSTransitionGroupChild';

    static propTypes = {
        children: PropTypes.node,

        name: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                enter: PropTypes.string,
                leave: PropTypes.string,
                active: PropTypes.string
            }),
            PropTypes.shape({
                enter: PropTypes.string,
                enterActive: PropTypes.string,
                leave: PropTypes.string,
                leaveActive: PropTypes.string,
                appear: PropTypes.string,
                appearActive: PropTypes.string
            })
        ]).isRequired,

        appear: validateTransitionProp,
        enter: validateTransitionProp,
        leave: validateTransitionProp,

        afterAppear: PropTypes.func,
        afterEnter: PropTypes.func,
        afterLeave: PropTypes.func
    };

    componentWillMount() {
        this.classNameQueue = [];
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    getRawKey() {
        return React.Children.only(this.props.children).key;
    }

    transition(animationType, finishCallback, userSpecifiedDelay) {
        const node = $RVfindDomNode(this);

        if (!node) {
            if (finishCallback) {
                finishCallback();
            }
            if (finishCallback) {
                finishCallback();
            }

            return;
        }

        const className = this.props.name[animationType] || `${this.props.name}-${animationType}`;
        const activeClassName = this.props.name[`${animationType}Active`] || `${className}-active`;
        let timeout = null;

        const endListener = (e) => {
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

    flushClassNameQueue() {
        this.classNameQueue.forEach((className) => {
            toggleClass($RVfindDomNode(this), className, true);
        });

        this.classNameQueue.length = 0;
        this.timeout = null;
    }

    queueClass(className) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(() => {
                this.flushClassNameQueue();
            }, TICK);
        }
    }

    chainedCall(action, done) {
        const handlerName = `after${action}`;

        return () => {
            if (this.props[handlerName]) {
                this.props[handlerName](this.getRawKey());
            }

            if (done) {
                done();
            }
        };
    }

    componentWillAppear(done) {
        done = this.chainedCall('Appear', done);

        if (this.props.appear !== false) {
            this.transition('appear', done, this.props.appear);
        } else {
            done();
        }
    }

    componentWillEnter(done) {
        done = this.chainedCall('Enter', done);

        if (this.props.enter !== false) {
            this.transition('enter', done, this.props.enter);
        } else {
            done();
        }
    }

    componentWillLeave(done) {
        done = this.chainedCall('Leave', done);

        if (this.props.leave !== false) {
            this.transition('leave', done, this.props.leave);
        } else {
            done();
        }
    }

    render() {
        return React.Children.only(this.props.children);
    }
}


export default TimedCSSTransitionGroupChild;
