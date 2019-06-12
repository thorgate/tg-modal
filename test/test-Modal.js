import React from 'react';
// import ReactDOM from 'react-dom';

import { expect } from 'chai';
import { shallow } from 'enzyme';

import Modal from '../src';

const onCancel = () => null;

describe('Modal', () => {
    it('Renders with correct classes (isOpen=false)', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen={false} />);

        expect(node).to.matchSnapshot();
    });

    it('Renders with correct classes (isOpen=true)', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen />);

        expect(node).to.matchSnapshot();
    });

    it('Renders with correct classes (wrapperClassName)', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen wrapperClassName="wrap-god" />);

        expect(node).to.matchSnapshot();
        expect(node.find('.wrap-god')).to.have.length(1);
    });

    it('Renders with correct classes (className)', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen className="goodest-boy" />);

        expect(node).to.matchSnapshot();
        expect(
            node
                .find(Modal.Dialog)
                .shallow()
                .find('.goodest-boy'),
        ).to.have.length(1);
    });

    it('Renders with correct classes (dialogClassName)', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen dialogClassName="goodest-boy" />);

        expect(node).to.matchSnapshot();
        expect(node.find('.goodest-boy')).to.have.length(1);
    });

    it('Renders with string title', () => {
        const node = shallow(<Modal onCancel={onCancel} isOpen title="sum title" />);

        expect(node).to.matchSnapshot();

        const headerNode = node.find(Modal.Header).shallow();
        expect(headerNode.find('.tg-modal-title').text()).to.equal('sum title');
    });

    it('Renders children', () => {
        const node = shallow(
            <Modal onCancel={onCancel} isOpen autoWrap title="sum title">
                am child
            </Modal>,
        );

        expect(node).to.matchSnapshot();

        const bodyNode = node.find(Modal.Body).shallow();
        expect(bodyNode.find('.tg-modal-body').text()).to.equal('am child');
    });

    it('Renders children even if null', () => {
        const node = shallow(
            <Modal onCancel={onCancel} isOpen autoWrap title="sum title">
                {[null, false, 'hello']}
            </Modal>,
        );

        expect(node).to.matchSnapshot();

        const bodyNode = node.find(Modal.Body).shallow();
        expect(bodyNode.find('.tg-modal-body').text()).to.equal('hello');
    });

    it('Adds event listener when open', () => {
        let boundEventListener = false;
        global.document.addEventListener = () => {
            boundEventListener = true;
        };

        shallow(<Modal onCancel={onCancel} isOpen />);
        expect(boundEventListener).to.equal(true);
    });

    it('Does not add event listener when closed', () => {
        let boundEventListener = false;
        global.document.addEventListener = () => {
            boundEventListener = true;
        };

        shallow(<Modal onCancel={onCancel} isOpen={false} />);
        expect(boundEventListener).to.equal(false);
    });

    it('Adds event listener when closed if keyboard is passed in', () => {
        let boundEventListener = false;
        global.document.addEventListener = () => {
            boundEventListener = true;
        };

        shallow(<Modal onCancel={onCancel} isOpen={false} keyboard />);
        expect(boundEventListener).to.equal(true);
    });
});
