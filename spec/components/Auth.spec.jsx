import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import Auth from '../../common/components/Auth/Auth';

describe('Auth', () => {
  const props = {
    actions: {
      errorAuth: sinon.stub(),
      authentificate: sinon.stub()
    },
    auth: {
      error: ''
    }
  };
  const renderer = mount(<Auth {...props} />);
  const emailField = renderer.find('[name="email"]');
  const passwordField = renderer.find('[name="password"]');
  const submitButton = renderer.find('.submit');

  const username = 'email@example.com';
  const password = 'password';

  it('Should render correctly', () => {
    return expect(renderer).to.be.ok;
  });

  it('Email', () => {
    const errorAuth = sinon.spy();
    const errorAuth2 = sinon.spy();

    renderer.props().actions.errorAuth = errorAuth;
    submitButton.simulate('click');
    expect(errorAuth.called).to.equal(true);
    expect(errorAuth.calledWith('Field email can`t be blank')).to.equal(true);

    renderer.props().actions.errorAuth = errorAuth2;
    emailField.node.value = username;
    emailField.simulate('change');

    expect(emailField.node.value).to.equal(username);
    expect(renderer.instance().refEmail.value).to.equal(username);
    submitButton.simulate('click');
    expect(errorAuth.called).to.equal(true);
    expect(errorAuth2.calledWith('Field email can`t be blank')).to.equal(false);
  });

  it('Password', () => {
    const errorAuth = sinon.spy();
    const errorAuth2 = sinon.spy();
    renderer.props().actions.errorAuth = errorAuth;
    submitButton.simulate('click');
    expect(errorAuth.called).to.equal(true);
    expect(errorAuth.calledWith('Field password can`t be blank')).to.equal(true);
    renderer.props().actions.errorAuth = errorAuth2;
    passwordField.node.value = password;
    passwordField.simulate('change');
    expect(passwordField.node.value).to.equal(password);
    expect(renderer.instance().refPassword.value).to.equal(password);
    submitButton.simulate('click');
    expect(errorAuth2.called).to.equal(false);
  });

  it('Authentificate', () => {
    const authentificate = sinon.spy();
    renderer.props().actions.authentificate = authentificate;
    submitButton.simulate('click');
    expect(authentificate.called).to.equal(true);
    expect(authentificate.calledWith({ username, password })).to.equal(true);
  });
});
