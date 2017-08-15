import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Example extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        component: PropTypes.func.isRequired,
        src: PropTypes.string.isRequired,
        children: PropTypes.node
    };

    constructor(props) {
        super(props);

        this.state = {
            showCode: false
        };
    }

    toggleCode = (e) => {
        e.preventDefault();

        this.setState({
            showCode: !this.state.showCode
        });
    };

    renderCode() {
        if (!this.state.showCode) {
            return null;
        }

        return (
            <div className="code-block">
                <pre>
                    {this.props.src}
                </pre>
            </div>
        );
    }

    render() {
        const { title, component, children } = this.props;

        const modal = React.createElement(component, {
            toggleCode: this.toggleCode
        });

        return (
            <div className="example-block">
                <h4>
                    {title}
                </h4>
                <p>
                    {children}
                </p>

                <div>
                    {modal}
                </div>

                {this.renderCode()}
            </div>
        );
    }
}

export default Example;
