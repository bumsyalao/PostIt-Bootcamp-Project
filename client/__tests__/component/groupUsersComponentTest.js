/* global expect jest test */
import React from 'react';
import { shallow, configure, } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { GroupUsers } from '../../components/Group/GroupUsers';

configure({ adapter: new adapter() });

describe(' Search User component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });

  const props = {
    listAllUsers: jest.fn(() => Promise.resolve()),
    match: {
      params: { groupid: 1 }
    },
    groupList: [
      { users: [{ username: 'new', userId: 1 }] }
    ],
  };
  const component = shallow(
    <GroupUsers {...props} />
  );


  it('should match the SearchUserSnapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('always renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });

  it('has map state to props', () => {
    expect(component.length).toBe(1);
  });

  it('should run componentWillMount method', () => {
    const newspy = jest.spyOn(component.instance(), 'componentWillMount');
    const id = 1;
    component.instance().componentWillMount(id);
    expect(newspy).toHaveBeenCalled();
  });
});
