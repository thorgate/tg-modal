import React, {Component, PropTypes} from 'react';

import Example from './Example';
import PackageHeader from './PackageHeader';

import * as examples from './examples';


// Load styles
require('../styles/main.scss');
require('../../src/styles/default.scss');

// The example app
class App extends Component {
    static propTypes = {
        packageCfg: PropTypes.object.isRequired
    };

    render() {
        const {name, description, version} = this.props.packageCfg;

        return (
            <div>
                <PackageHeader name={name} description={description} version={version} />

                <div className="container container--main">
                    <div className="link-block">
                        <Example title="Simple modal"
                                 description="Modal with one paragraph of text."
                                 src={EXAMPLE_SRC.Simple}>
                            <examples.Simple />
                        </Example>

                        <Example title="Basic modal"
                                 description="Modals can also reduce its complexity"
                                 src={EXAMPLE_SRC.Basic}>
                            <examples.Basic />
                        </Example>

                        <Example title="Static modal"
                                 description="Modals can be static"
                                 src={EXAMPLE_SRC.Static}>
                            <examples.Static />
                        </Example>

                        <Example title="Action modal"
                                 description="Modals can be used for user actions/confirmation boxes"
                                 src={EXAMPLE_SRC.Confirm}>
                            <examples.Confirm />
                        </Example>

                        <Example title="Action modal (basic)"
                                 description="Also works in basic/static mode"
                                 src={EXAMPLE_SRC.BasicConfirm}>
                            <examples.BasicConfirm />
                        </Example>

                        <Example title="Scrolling"
                                 description="Modals with content that exceeds the viewport will be scrollable"
                                 src={EXAMPLE_SRC.Long}>
                            <examples.Long />
                        </Example>

                        <Example title="Special content"
                                 description="Modals render react components. This example uses react-remarkable to display markdown"
                                 src={EXAMPLE_SRC.Markdown}>
                            <examples.Markdown />
                        </Example>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6 text-left">
                                <a href="https://twitter.com/thorgate">Twitter</a> |
                                <a href="https://github.com/thorgate">Github</a> |
                                <a href="https://www.npmjs.com/~thorgate">NPM</a>
                            </div>

                            <div className="col-xs-6 text-right text-muted">
                                Open source (MIT). Made with Love by <a href="http://thorgate.eu">Thorgate</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
