import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PackageHeader extends Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        version: PropTypes.string.isRequired,
    };

    render() {
        const { name, description, version } = this.props;

        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="logo logo-square" />
                    <h1>{name}</h1>
                    <h2>{description}</h2>
                    <h3>
                        Currently <span className="version">{version}</span>
                    </h3>
                </div>
            </div>
        );
    }
}

export default PackageHeader;
