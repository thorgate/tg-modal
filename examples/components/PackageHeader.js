import React, {Component, PropTypes} from 'react';


class PackageHeader extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <p className="lead">{this.props.name}</p>

                    <p className="lead">
                        {this.props.description}
                    </p>

                    <small className="version">Currently {this.props.version}</small>
                </div>
            </div>
        );
    }
}

export default PackageHeader;
