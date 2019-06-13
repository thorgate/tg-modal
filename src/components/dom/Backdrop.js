import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Backdrop extends Component {
    static propTypes = {
        isStatic: PropTypes.bool,
        onCancel: PropTypes.func,
        className: PropTypes.string,
    };

    static defaultProps = {
        className: 'tg-modal-backdrop',
        isStatic: false,
        onCancel: null,
    };

    onCancel = (e) => {
        /* istanbul ignore else */
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        const { isStatic, onCancel } = this.props;

        if (!isStatic) {
            onCancel(e, null);
        }
    };

    onKeyPress = (e) => {
        const { keyCode } = e;

        if (keyCode === 13) {
            this.onCancel(e);
        }
    };

    render() {
        // remove warning for unused vars / missing proptype definition
        /* eslint no-unused-vars: 0, react/prop-types: 0 */
        const { isStatic, onCancel, ...rest } = this.props;

        return <div {...rest} onClick={this.onCancel} role="button" tabIndex={-1} onKeyPress={this.onKeyPress} />;
    }
}

export default Backdrop;
