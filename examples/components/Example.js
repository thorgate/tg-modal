import React, {Component, PropTypes} from 'react';


class Example extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        src: PropTypes.string.isRequired
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
            <div className="code-block">
                <pre>
                    {this.props.src}
                </pre>
            </div>
        );
    }

    render() {
        const {title, description} = this.props;

        return (
            <div className="example-block">
                <h2>
                    {title}

                    <a href="" className="btn btn-link" onClick={this.toggleCode.bind(this)}>Toggle Code</a>
                </h2>
                <p>
                    {description}
                </p>

                <div className="btn-group">
                    {this.props.children}
                </div>

                {this.renderCode()}
            </div>
        );
    }
}

export default Example;
