import React, {Component, PropTypes} from 'react';


class Backdrop extends Component {
    static propTypes = {
        isStatic: PropTypes.bool,
        onCancel: PropTypes.func,
        className: PropTypes.string
    };

    static defaultProps = {
        className: 'modal-backdrop'
    };

    onCancel(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (!this.props.isStatic) {
            this.props.onCancel();
        }
    }

    render() {
        return (
            <div {...this.props} onClick={::this.onCancel}></div>
        );
    }
}


export default Backdrop;
