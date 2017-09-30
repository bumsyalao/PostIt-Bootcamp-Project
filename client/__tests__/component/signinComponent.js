
/* global expect jest test */
import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignInForm from '../../components/SignIn/SignInForm.jsx';

configure({ adapter: new Adapter() });

describe('SignInForm Component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    match: {
      path: ''
    },
    access: {
      isAuthenticated: false
    },
    history: {
      push: spy
    },
    signInUser: jest.fn(() => {
      return Promise.resolve();
    })
  };
  const component = shallow(
    <SignInForm {...props} />);
  test('should match the SignInForm snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(2);
    expect(tree).toMatchSnapshot();
  });
  test('it should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku', name: 'username' } });
    component.instance().onChange(
      { target: { value: 'banku123', name: 'password' } });
    expect(component.state('username')).toEqual('banku@gmail.com');
    expect(component.state('password')).toEqual('banku123');
  });
  test(
    'it should submit fields in state when onSubmit function is called', () => {
      jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onChange(
        { target: { value: 'banku', name: 'username' } });
      component.instance().onChange(
        { target: { value: 'banku123', name: 'password' } });
      component.find('#submit-signin').simulate('click');
      expect(component.find('#submit-signin').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(1);
    });
  test('onSubmit function should run', () => {
    component.instance().onChange(
      { target: { value: 'banku', name: 'username' } });
    component.instance().onChange(
      { target: { value: 'banku123', name: 'password' } });
    expect(component.state('username')).toEqual('banku');
    expect(component.state('password')).toEqual('banku123');
    const newspy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit();
    expect(newspy).toHaveBeenCalled();
  });
});
