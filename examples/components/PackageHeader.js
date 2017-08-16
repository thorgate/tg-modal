import React, { Component } from 'react';
import PropTypes from 'prop-types';


class PackageHeader extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired
    };

    render() {
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="logo logo-square"></div>
                    <h1>{this.props.name}</h1>
                    <h2>{this.props.description}</h2>
                    <h3>Currently <span className="version">{this.props.version}</span></h3>
                </div>
            </div>
        );
    }
}

export default PackageHeader;
