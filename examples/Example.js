import React, {Component, PropTypes} from 'react';


class Example extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        onToggle: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            showCode: false
        };
    }

    toggleCode(e) {
        e.preventDefault();

        this.setState({
            showCode: !this.state.showCode
        });
    }

    renderCode() {
        if (!this.state.showCode) {
            return null;
        }

        return (
            <pre>
                {this.props.children}
            </pre>
        );
    }

    render() {
        const {title, description, onToggle} = this.props;

        return (
            <div>
                <h2>{title}</h2>
                <p>
                    {description}

                    <a onClick={onToggle}>Launch</a>
                    <a onClick={this.toggleCode.bind(this)}>See Code</a>
                </p>

                {this.renderCode()}
            </div>
        );
    }
}

export default Example;
