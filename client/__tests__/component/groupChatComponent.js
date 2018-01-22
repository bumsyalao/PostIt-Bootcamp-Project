/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { GroupChat } from '../../components/Group/GroupChat';

configure({ adapter: new adapter() });

describe('GroupChat Component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    access: {
      user: { user: { userId: 1 } }
    },
    match: {
      params: ''
    },
    group: {
      groupName: 'bankue'
    },
    userGroups: [{
      groupName: 'bankue'
    }],
    messages: {
      map: spy
    },
    newMessage: jest.fn(() => Promise.resolve()),
    getMessages: jest.fn(() => Promise.resolve()),
    getGroup: jest.fn(() => Promise.resolve()),
    allUserGroups: jest.fn(() => Promise.resolve())
  };

  const component = shallow(
    <GroupChat {...props} />
  );

  it('should match the GroupChat snapshot', () => {
    const tree = toJson(component);
    expect(component.find('textarea').length).toEqual(1);
    expect(tree).toMatchSnapshot();
  });

  it('should set state when onChange function', () => {
    component.instance().onChange(
      { target: { value: 'Hi! Im a test', name: 'message' } });
    expect(component.state('message')).toEqual('Hi! Im a test');
  });

  it('should submit fields when onSubmit is called', () => {
    jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onChange(
      { target: { value: 'Hi can I help you', name: 'message' } });
    component.instance().onChange(
      { target: { value: 'urgent', name: 'messagePriority' } });
    component.find('#submit-message').simulate('click');
    expect(component.find('#submit-message').length).toEqual(1);
    expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
  });
  it('should run onSubmit function', () => {
    component.instance().onChange(
      { target: { value: 'Hi Im a test message', name: 'message' } });
    component.instance().onChange(
      { target: { value: 'normal', name: 'messagePriority' } });
    expect(component.state('message')).toEqual('Hi Im a test message');
    expect(component.state('messagePriority')).toEqual('normal');
    const newspy = jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onSubmit();
    expect(newspy).toHaveBeenCalled();
  });
});
