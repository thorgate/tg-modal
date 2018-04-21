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
        expect(node.find(Modal.Dialog).shallow().find('.goodest-boy')).to.have.length(1);
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
            </Modal>
        );

        expect(node).to.matchSnapshot();

        const bodyNode = node.find(Modal.Body).shallow();
        expect(bodyNode.find('.tg-modal-body').text()).to.equal('am child');
    });

    it('Renders children even if null', () => {
        const node = shallow(
            <Modal onCancel={onCancel} isOpen autoWrap title="sum title" children={[null, false, 'hello']} />
        );

        expect(node).to.matchSnapshot();

        const bodyNode = node.find(Modal.Body).shallow();
        expect(bodyNode.find('.tg-modal-body').text()).to.equal('hello');
    });
});
