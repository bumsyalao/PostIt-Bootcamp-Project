/* global expect jest test */
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import adapter from 'enzyme-adapter-react-16';
import { CreateGroup } from '../../components/Group/CreateGroup';


configure({ adapter: new adapter() });

describe('Create Group component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    history: {
      push: spy
    },
    createGroup: jest.fn(() => Promise.resolve())
  };
  const component = shallow(<CreateGroup {...props} />);

  it('should render self and sub components', () => {
    expect(component.exists()).toBe(true);
  });
  it('should set state when onChange function is called', () => {
    component.instance().onChange({ target: { value: 'banku', id: 'groupname' } });
    expect(component.state('groupname')).toEqual('banku');
  });
  it('it should submit fields when onSubmit is called', () => {
    jest.spyOn(component.instance(), 'onSubmit');
    component.instance().onChange({ target: { value: 'banku', id: 'groupname' } });
    component.find('#submit-group').simulate('click');
    expect(component.find('#submit-group').length).toEqual(1);
    expect(component.instance().onSubmit.mock.calls.length).toEqual(0);
  });
});
