import React, {Component} from 'react';
import Markdown from 'react-remarkable';

import Modal from '../src/browser';

import Example from './Example';
import theMarkdown from './example.md';


// Load styles
require('./style.scss');
require('../src/styles/default.scss');


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            examples: {
                first: false,
                long: false,
                md: false
            }
        };
    }

    toggleModal(target) {
        return (e) => {
            if (e) {
                e.preventDefault();
            }

            const examples = this.state.examples;
            examples[target] = !examples[target];

            this.setState({
                examples: examples
            });
        };
    }

    render() {
        const {first, long, md} = this.state.examples;

        // TODO: Support all the following cases:
        //  - basic
        //  - static
        //  - actions (onConfirm, onCancel) + own buttons
        //  - Keyboard events (escape/ enter)

        // TODO: Fix backdrop click reopen bug
        // TODO: Code examples
        // TODO: Provide a hook for isomorphic rendering (onToggle)

        return (
            <div>
                <h1>tg-modal</h1>

                <div className="link-block">
                    <Example title="Simple modal" description="Modal with one paragraph of text." onToggle={this.toggleModal('first')}>
                        The code...
                    </Example>

                    <Example title="Basic modal" description="Modal can also reduce its complexity" onToggle={this.toggleModal('basic')}>
                        The code...
                    </Example>

                    <Example title="Static modal" description="Modal can be static" onToggle={this.toggleModal('static')}>
                        The code...
                    </Example>

                    <Example title="Action modal" description="Modals can be used for user actions" onToggle={this.toggleModal('action')}>
                        The code...
                    </Example>

                    <Example title="Action modal (basic)" description="Also works in basic mode" onToggle={this.toggleModal('actionBasic')}>
                        The code...
                    </Example>

                    <Example title="Scrolling modal" description="Modals with long content will be scrollable" onToggle={this.toggleModal('long')}>
                        The code...
                    </Example>

                    <Example title="Markdown modal" description="Modals can render everything. This example uses react-remarkable to display markdown" onToggle={this.toggleModal('md')}>
                        The code...
                    </Example>
                </div>

                <Modal isOpen={first} title="First modal" onRequestClose={this.toggleModal('first')}>
                    <p>
                        Viral deep v squid chia, letterpress wayfarers artisan
                        meggings tote bag four loko keffiyeh hoodie cronut four
                        dollar toast flannel.
                    </p>

                    <p>
                        Pinterest 8-bit DIY pug cold-pressed Carles, typewriter
                        photo booth deep v quinoa four dollar toast trust fund
                        freegan. Food truck Godard semiotics, YOLO mixtape
                        asymmetrical selfies Thundercats 8-bit.
                    </p>
                </Modal>

                <Modal isOpen={long} title="Long modal" onRequestClose={this.toggleModal('long')}>
                    <p>
                        Viral deep v squid chia, letterpress wayfarers artisan
                        meggings tote bag four loko keffiyeh hoodie cronut four
                        dollar toast flannel.
                    </p>

                    <p>
                        Pinterest 8-bit DIY pug cold-pressed Carles, typewriter
                        photo booth deep v quinoa four dollar toast trust fund
                        freegan. Food truck Godard semiotics, YOLO mixtape
                        asymmetrical selfies Thundercats 8-bit.
                    </p>

                    <p>
                        Helvetica banh mi Wes Anderson aesthetic, stumptown keytar
                        ugh beard VHS you probably haven't heard of them Carles
                        Neutra bespoke pour-over Odd Future. Crucifix banjo Tumblr
                        3 wolf moon, readymade tilde master cleanse. Neutra fingerstache
                        seitan, cornhole hoodie Pinterest messenger bag food
                        truck authentic cold-pressed wayfarers narwhal pug blog yr.
                        Heirloom vinyl kitsch, jean shorts banjo cold-pressed
                        slow-carb skateboard keffiyeh next level farm-to-table
                        pickled whatever. Whatever Brooklyn trust fund, migas
                        skateboard Marfa typewriter Tumblr pork belly farm-to-table.
                        Fashion axe paleo selfies, put a bird on it small batch artisan
                        salvia lomo messenger bag polaroid synth leggings drinking
                        vinegar letterpress organic. Slow-carb church-key chambray
                        disrupt, Portland you probably haven't heard of them Schlitz
                        literally PBR&amp;B trust fund fap.
                    </p>

                    <p>
                        Fashion axe bitters chillwave, try-hard four loko retro pour-over
                        raw denim cronut meh kale chips chambray. Beard drinking vinegar
                        retro, quinoa 3 wolf moon artisan sustainable. DIY Bushwick hashtag
                        Schlitz, church-key synth tousled freegan typewriter Banksy.
                        Authentic disrupt YOLO, ugh selfies health goth iPhone chillwave.
                        Direct trade single-origin coffee iPhone Marfa. Organic 8-bit butcher
                        normcore, salvia Odd Future twee cray. Gentrify fixie Tumblr raw denim craft beer.
                    </p>

                    <p>
                        Literally Williamsburg butcher, small batch drinking vinegar
                        bicycle rights messenger bag. Readymade 3 wolf moon blog ennui
                        mumblecore selvage sartorial plaid, tousled fap paleo. You probably
                        haven't heard of them YOLO actually, leggings four dollar toast
                        street art kale chips Kickstarter 8-bit messenger bag. Artisan
                        Truffaut actually beard, authentic vegan pour-over tattooed Marfa
                        tote bag narwhal try-hard. Blog gluten-free single-origin coffee
                        crucifix pug, Pitchfork you probably haven't heard of them distillery
                        master cleanse meggings cardigan. Brooklyn artisan whatever food truck,
                        Carles tilde pug tofu pour-over put a bird on it Banksy migas you
                        probably haven't heard of them mlkshk flannel. Hoodie mlkshk four
                        dollar toast sriracha, Brooklyn Bushwick pug 8-bit.
                    </p>

                    <p>
                        Blog typewriter you probably haven't heard of them locavore,
                        letterpress twee authentic. Yr distillery post-ironic, ennui irony
                        American Apparel literally Tumblr. Kickstarter +1 chillwave sartorial
                        distillery, normcore Carles single-origin coffee American Apparel flannel.
                        Authentic pour-over stumptown forage, cray direct trade literally Pinterest
                        locavore 3 wolf moon organic slow-carb vegan. Mlkshk dreamcatcher try-hard,
                        butcher Blue Bottle cred PBR typewriter bespoke. Listicle ennui pork belly
                        sriracha, Bushwick meggings letterpress DIY butcher McSweeney's slow-carb
                        forage direct trade. Carles jean shorts VHS, chambray hashtag PBR Echo Park
                        authentic retro listicle ugh raw denim skateboard literally.
                    </p>

                    <p>
                        Banksy hoodie pop-up, Pitchfork skateboard DIY typewriter selvage
                        dreamcatcher. Art party hoodie XOXO, typewriter slow-carb ugh Odd
                        Future lo-fi mumblecore PBR&amp;B letterpress stumptown Brooklyn normcore
                        viral. You probably haven't heard of them Neutra plaid Shoreditch ethical,
                        kitsch fashion axe. IPhone deep v Intelligentsia, +1 squid Pinterest
                        Williamsburg gentrify selvage Bushwick chambray master cleanse mixtape
                        Godard polaroid. Stumptown listicle butcher Echo Park PBR&amp;B Brooklyn
                        typewriter Bushwick locavore, pickled lo-fi. +1 fingerstache bicycle rights
                        trust fund, blog try-hard banh mi disrupt Bushwick. High Life migas quinoa
                        cray, roof party wolf chambray ennui bicycle rights viral Wes Anderson
                        chia butcher.
                    </p>
                </Modal>

                <Modal isOpen={md} onRequestClose={this.toggleModal('md')}>
                    <Markdown source={theMarkdown} />
                </Modal>
            </div>
        );
    }
}

export default App;
