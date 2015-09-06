import React, {Component, PropTypes} from 'react';


class Backdrop extends Component {
    static propTypes = {
        isStatic: PropTypes.bool,
        onRequestClose: PropTypes.func
    };

    render() {
        const props = {
            className: 'modal-backdrop'
        };

        if (!this.props.isStatic) {
            props.onClick = this.props.onRequestClose;
        }

        return (
            <div {...props}></div>
        );
    }
}


export default Backdrop;
