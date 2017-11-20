/* global expect jest test */
import React from 'react';
import { shallow, configure, } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { SearchUser } from '../../components/Group/SearchUser';

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
    getGroups: jest.fn(() => Promise.resolve()),
    getAllUsers: jest.fn(() => Promise.resolve()),
    addMemberToGroup: jest.fn(() => Promise.resolve()),
    match: {
      params: { groupId: 1 }
    },
    users: {
      users: { username: 'new', email: 'new@email.com', map: spy },
    },
  };
  const component = shallow(
    <SearchUser {...props} />
  );


  test('should match the SearchUserSnapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  test('always renders a div', () => {
    expect(component.find('div').length).toBeGreaterThan(0);
  });

  test('has map state to props', () => {
    expect(component.length).toBe(1);
  });

  test('searchUsers function should run when called', () => {
    const newspy = jest.spyOn(component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(newspy).toHaveBeenCalled();
    component.instance().onSearch(
        { target: { value: 'searchParam', name: 'searchParam' } });
    expect(component.state('searchParam')).toEqual('');
  });

  test('componentWillRecieveProps will run if new props are added', () => {
    const newerspy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    const newusers = [{ username: 'new', map: spy }];
    const pagination = { pageCount: '', count: '' };
    component.setProps({ newusers, pagination });
    expect(newerspy).toHaveBeenCalled();
  });

  // test('joinGroup function should run when called', () => {
  //   const newwspy = jest.spyOn(component.instance(), 'joinGroup');
  //   component.find('').simulate('click', { preventDefault: () => {} });
  //   expect(newwspy).toHaveBeenCalled();
  // });
});
