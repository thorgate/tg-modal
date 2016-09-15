import React, { Component, PropTypes } from 'react';

import Modal from '../../../src/browser';


class LongNestedModalExample extends Component {
    static propTypes = {
        toggleCode: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            numberOfModals: 0
        };
    }

    addModal = () => {
        this.setState({numberOfModals: this.state.numberOfModals + 1});
    };

    removeModal = () => {
        this.setState({numberOfModals: Math.max(this.state.numberOfModals -1, 0)});
    };

    renderLongModal = (index) => {

        return (
            <Modal key={index} isOpen={true} title={`This is modal #${index + 1}`} autoWrap onCancel={this.removeModal}>

                <div className="btn-group" style={{marginBottom: '30px'}}>
                    <a className="btn btn-primary" onClick={this.addModal}>Add new long modal</a>
                </div>

                <p>
                    Pinterest 8-bit DIY pug cold-pressed Carles, typewriter
                    photo booth deep v quinoa four dollar toast trust fund
                    freegan. Food truck Godard semiotics, YOLO mixtape
                    asymmetrical selfies Thundercats 8-bit.
                </p>

                <p>
                    Helvetica banh mi Wes Anderson aesthetic, stumptown keytar
                    ugh beard VHS you probably have not heard of them Carles
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
                    disrupt, Portland you probably have not heard of them Schlitz
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
                    have not heard of them YOLO actually, leggings four dollar toast
                    street art kale chips Kickstarter 8-bit messenger bag. Artisan
                    Truffaut actually beard, authentic vegan pour-over tattooed Marfa
                    tote bag narwhal try-hard. Blog gluten-free single-origin coffee
                    crucifix pug, Pitchfork you probably have not heard of them distillery
                    master cleanse meggings cardigan. Brooklyn artisan whatever food truck,
                    Carles tilde pug tofu pour-over put a bird on it Banksy migas you
                    probably have not heard of them mlkshk flannel. Hoodie mlkshk four
                    dollar toast sriracha, Brooklyn Bushwick pug 8-bit.
                </p>

                <p>
                    Blog typewriter you probably have not heard of them locavore,
                    letterpress twee authentic. Yr distillery post-ironic, ennui irony
                    American Apparel literally Tumblr. Kickstarter +1 chillwave sartorial
                    distillery, normcore Carles single-origin coffee American Apparel flannel.
                    Authentic pour-over stumptown forage, cray direct trade literally Pinterest
                    locavore 3 wolf moon organic slow-carb vegan. Mlkshk dreamcatcher try-hard,
                    butcher Blue Bottle cred PBR typewriter bespoke. Listicle ennui pork belly
                    sriracha, Bushwick meggings letterpress DIY butcher McSweeney slow-carb
                    forage direct trade. Carles jean shorts VHS, chambray hashtag PBR Echo Park
                    authentic retro listicle ugh raw denim skateboard literally.
                </p>

                <p>
                    Banksy hoodie pop-up, Pitchfork skateboard DIY typewriter selvage
                    dreamcatcher. Art party hoodie XOXO, typewriter slow-carb ugh Odd
                    Future lo-fi mumblecore PBR&amp;B letterpress stumptown Brooklyn normcore
                    viral. You probably have not heard of them Neutra plaid Shoreditch ethical,
                    kitsch fashion axe. IPhone deep v Intelligentsia, +1 squid Pinterest
                    Williamsburg gentrify selvage Bushwick chambray master cleanse mixtape
                    Godard polaroid. Stumptown listicle butcher Echo Park PBR&amp;B Brooklyn
                    typewriter Bushwick locavore, pickled lo-fi. +1 fingerstache bicycle rights
                    trust fund, blog try-hard banh mi disrupt Bushwick. High Life migas quinoa
                    cray, roof party wolf chambray ennui bicycle rights viral Wes Anderson
                    chia butcher.
                </p>
            </Modal>
        )
    };

    render() {
        return (
            <div className="long">
                <div className="btn-group">
                    <a className="btn btn-primary" onClick={this.addModal}>Open</a>
                    <a className="btn btn-secondary" onClick={this.props.toggleCode}>Code</a>
                </div>

                {[...Array(this.state.numberOfModals).keys()].map(i => this.renderLongModal(i))}
            </div>
        );
    }
}

export default LongNestedModalExample;

