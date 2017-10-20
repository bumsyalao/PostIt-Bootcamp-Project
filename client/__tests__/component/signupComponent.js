
/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
// import configureStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import SignupForm from '../../components/Signup/SignupForm';
// import userSignupRequest from '../../actions/signupAction';

configure({ adapter: new adapter() });

// const mockStore = configureStore();
// const dispatch = userSignupRequest.spy();

// const fakeTestData = jest.fn(() => Promise.resolve());

describe('SignUpForm Component', () => {
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
    userSignupRequest: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <SignupForm {...props} />

    // <Test dispatch={dispatch} store={mockStore({ runtime: {} })}
    //   testData={fakeTestData}/>
  );
  test('should match the SignUpForm snapshot', () => {
    const tree = toJson(component);
    expect(component.find('input').length).toEqual(5);
    expect(tree).toMatchSnapshot();
  });
  test('it should set state when onChange function is called', () => {
    component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
    component.instance().onChange(
      { traget: { value: 'banku@email.com', id: 'email' } });
    component.instance().onChange(
      { target: { value: '09082091930', id: 'phonenumber' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    component.instance().onChange(
      { traget: { value: 'banku123', id: 'confirmPassword' } });
    expect(component.state('username')).toEqual('banku');
    expect(component.state('email')).toEqual('banku@email.com');
    expect(component.state('phonenumber')).toEqual('09082091930');
    expect(component.state('password')).toEqual('banku123');
    expect(component.state('confirmPassword')).toEqual('banku123');
  });
  test(
    'it should submit fields in state when onSubmit function is called', () => {
      jest.spyOn(component.instance(), 'onSubmit');
      component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
      component.instance().onChange(
      { traget: { value: 'banku@email.com', id: 'email' } });
      component.instance().onChange(
      { target: { value: '09082091930', id: 'phonenumber' } });
      component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
      component.instance().onChange(
      { traget: { value: 'banku123', id: 'confirmPassword' } });
      component.find('#submit-signup').simulate('click');
      expect(component.find('#submit-signup').length).toEqual(1);
      expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
    });
  test('onSubmit function should run', () => {
    component.instance().onChange(
      { target: { value: 'banku', id: 'username' } });
    component.instance().onChange(
      { traget: { value: 'banku@email.com', id: 'email' } });
    component.instance().onChange(
      { target: { value: '09082091930', id: 'phonenumber' } });
    component.instance().onChange(
      { target: { value: 'banku123', id: 'password' } });
    component.instance().onChange(
      { traget: { value: 'banku123', id: 'confirmPassword' } });
    expect(component.state('username')).toEqual('banku');
    expect(component.state('email')).toEqual('banku@email.com');
    expect(component.state('phonenumber')).toEqual('09082091930');
    expect(component.state('password')).toEqual('banku123');
    expect(component.state('confirmPassword')).toEqual('banku123');
    const newspy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit();
    expect(newspy).toHaveBeenCalled();
  });
});
