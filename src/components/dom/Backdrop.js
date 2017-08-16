import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Backdrop extends Component {
    static propTypes = {
        isStatic: PropTypes.bool,
        onCancel: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'modal-backdrop'
    };

    onCancel = (e) => {
        /* istanbul ignore else */
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!this.props.isStatic) {
            this.props.onCancel(e, null);
        }
    };

    render() {
        // remove warning for unused vars / missing proptype definition
        /* eslint no-unused-vars: 0, react/prop-types: 0 */
        const { isStatic, onCancel, ...rest } = this.props;

        return (
            <div {...rest} onClick={this.onCancel}></div>
        );
    }
}


export default Backdrop;
