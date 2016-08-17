/**
 * This is adapted from Facebook's ReactCSSTransitionGroup which is in the React
 * addons and under the BSD License.
 */

import React, { Component, PropTypes } from 'react';

import validateTransitionProp from './validateTransitionProp';
import TimedCSSTransitionGroupChild from './TimedCSSTransitionGroupChild';


class TimedCSSTransitionGroup extends Component {
    static displayName = 'TimedCSSTransitionGroup';

    static propTypes = {
        transitionName: TimedCSSTransitionGroupChild.propTypes.name,

        transitionAppear: validateTransitionProp,
        transitionEnter: validateTransitionProp,
        transitionLeave: validateTransitionProp,

        afterAppear: PropTypes.func,
        afterEnter: PropTypes.func,
        afterLeave: PropTypes.func
    };

    static defaultProps = {
        transitionAppear: false,
        transitionEnter: 1000,
        transitionLeave: 1000
    };

    _wrapChild = (child) => {
        const { props } = this;

        return (
            <TimedCSSTransitionGroupChild
                name={props.transitionName}
                appear={props.transitionAppear !== false ? props.transitionAppear : false}
                enter={props.transitionEnter !== false ? props.transitionEnter : false}
                leave={props.transitionLeave !== false ? props.transitionLeave : false}

                afterAppear={props.afterAppear}
                afterEnter={props.afterEnter}
                afterLeave={props.afterLeave}
            >
                {child}
            </TimedCSSTransitionGroupChild>
        );
    };

    render() {
        // remove warning for unused vars / missing proptype definition
        /* eslint no-unused-vars: 0, react/prop-types: 0 */
        const { afterEnter, afterLeave, animating, ...rest } = this.props;
        return React.createElement($RVTransitionGroup, { ...rest, childFactory: this._wrapChild });
    }
}


export default TimedCSSTransitionGroup;
