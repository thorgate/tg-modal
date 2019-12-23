import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Example from './Example';
import PackageHeader from './PackageHeader';

import * as examples from './examples';

// Load styles
require('../styles/main.scss');

// The example app
class App extends Component {
    render() {
        const { packageCfg } = this.props;
        const { name, description, version } = packageCfg;

        return (
            <div>
                <PackageHeader name={name} description={description} version={version} />

                <div className="container container--main">
                    <div className="link-block">
                        <Example title="Simple modal" component={examples.Simple} src={EXAMPLE_SRC.Simple}>
                            Modal with one paragraph of text.
                        </Example>

                        <Example title="Basic modal" component={examples.Basic} src={EXAMPLE_SRC.Basic}>
                            Modals can also reduce their complexity.
                        </Example>

                        <Example title="Static modal" component={examples.Static} src={EXAMPLE_SRC.Static}>
                            Modals can be static.
                        </Example>

                        <Example title="Action modal" component={examples.Confirm} src={EXAMPLE_SRC.Confirm}>
                            Modals can be used for user actions/confirmation boxes.
                        </Example>

                        <Example
                            title="Action modal (basic)"
                            component={examples.BasicConfirm}
                            src={EXAMPLE_SRC.BasicConfirm}
                        >
                            Also works in basic/static mode
                        </Example>

                        <Example title="Scrolling" component={examples.Long} src={EXAMPLE_SRC.Long}>
                            Modals with content that exceeds the viewport will be scrollable
                        </Example>

                        <Example
                            title="Nested scrolling modals"
                            component={examples.NestedLong}
                            src={EXAMPLE_SRC.NestedLong}
                        >
                            Nested modals with content that exceeds the viewport are also scrollable
                        </Example>

                        <Example title="Special content" component={examples.Markdown} src={EXAMPLE_SRC.Markdown}>
                            Modals render react components. This example uses react-remarkable to display markdown
                        </Example>

                        <Example
                            title="Modal with Header and Body components"
                            component={examples.WithComponents}
                            src={EXAMPLE_SRC.WithComponents}
                        >
                            Modals can be customized with Modal.Header and Modal.Body components.
                        </Example>

                        <Example
                            title="Modal with Redux integration"
                            component={examples.ReduxModal}
                            src={EXAMPLE_SRC.ReduxModal}
                        >
                            Modal with controlling via Redux.
                        </Example>

                        <Example title="StrictMode modal" component={examples.StrictMode} src={EXAMPLE_SRC.StrictMode}>
                            Modal wrapped inside React.StrictMode
                        </Example>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-6">
                                <a href="http://thorgate.eu" className="logo logo-wide" aria-labelledby="tg-aria-label">
                                    <span className="hidden" id="tg-aria-label">
                                        Thorgate
                                    </span>
                                </a>

                                <span className="licence">Open source (MIT)</span>
                            </div>

                            <div className="col-xs-6 text-right">
                                <a href="https://twitter.com/thorgate">Twitter</a>
                                <a href="https://github.com/thorgate">Github</a>
                                <a href="https://www.npmjs.com/~thorgate">NPM</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

App.propTypes = {
    packageCfg: PropTypes.object.isRequired,
};

export default App;
