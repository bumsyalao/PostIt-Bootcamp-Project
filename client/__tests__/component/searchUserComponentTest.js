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

  it('should run searchUsers function when called', () => {
    const newspy = jest.spyOn(component.instance(), 'componentWillMount');
    component.instance().componentWillMount();
    expect(newspy).toHaveBeenCalled();
    component.instance().onSearch(
        { target: { value: 'searchParam', name: 'searchParam' } });
    expect(component.state('searchParam')).toEqual('');
  });

  it('should run componentWillRecieveProps if new props are added', () => {
    const newerspy = jest.spyOn(component.instance(), 'componentWillReceiveProps');
    const newusers = [{ username: 'new', map: spy }];
    const pagination = { pageCount: '', count: '' };
    component.setProps({ newusers, pagination });
    expect(newerspy).toHaveBeenCalled();
  });

  it('calls JoinGroup function', () => {
    const joinGroupSpy = jest.spyOn(
      component.instance(), 'joinGroup'
    );
    const event = {
      target: {
        id: 1
      },
      preventDefault: spy
    };
    component.instance().joinGroup(event);
    expect(joinGroupSpy).toHaveBeenCalled();
  });

  it('calls searchUsers method', () => {
    const searchUsersSpy = jest.spyOn(
    component.instance(), 'searchUsers'
    );
    const event = {
      target: {
        icon_prefix: 'search'
      }
    };

    component.instance().searchUsers(event);
    expect(searchUsersSpy).toHaveBeenCalled();
  });

  it('calls onSearch function', () => {
    const onSearchSpy = jest.spyOn(
        component.instance(), 'onSearch'
      );
    component.setState({
      searchParam: 'search'
    });
    component.instance().onSearch();
    expect(onSearchSpy).toHaveBeenCalled();
  });

  it('calls handlePageClick function', () => {
    const handlePageClickSpy = jest.spyOn(
      component.instance(), 'handlePageClick'
    );
    const data = {
      selected: 1
    };
    component.instance().handlePageClick(data);
    expect(handlePageClickSpy).toHaveBeenCalled();
  });
});
