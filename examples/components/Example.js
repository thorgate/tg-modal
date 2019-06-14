import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Example extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        src: PropTypes.string.isRequired,
        children: PropTypes.node,
    };

    static defaultProps = {
        children: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            showCode: false,
        };
    }

    toggleCode = (e) => {
        e.preventDefault();

        this.setState((prevState) => ({
            showCode: !prevState.showCode,
        }));
    };

    renderCode() {
        const { showCode } = this.state;

        if (!showCode) {
            return null;
        }

        const { src } = this.props;

        return (
            <div className="code-block">
                <pre>{src}</pre>
            </div>
        );
    }

    render() {
        const { title, component, children } = this.props;

        const modal = React.createElement(component, {
            toggleCode: this.toggleCode,
        });

        return (
            <div className="example-block">
                <h4>{title}</h4>
                <p>{children}</p>

                <div>{modal}</div>

                {this.renderCode()}
            </div>
        );
    }
}

export default Example;
