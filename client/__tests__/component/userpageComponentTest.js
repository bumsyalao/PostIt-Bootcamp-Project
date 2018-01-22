/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { UsersPage } from '../../components/Users/UsersPage';

configure({ adapter: new adapter() });

describe('UserPage Compoenent', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    users: {
      users: [
        {
          email: 'alaobunmi93@gmail.com',
          id: 1,
          username: 'bunmi'
        }
      ]
    },

    getAllUsers: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <UsersPage {...props} />
  );

  it('should render componemt', () => {
    expect(component.exists()).toBe(true);
  });

  it('should match UsersPage component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
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
    component.instance().onSearch();
    expect(onSearchSpy).toHaveBeenCalled();
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

  it('has componentWillReceiveProps', () => {
    const componentWillReceivePropsSpy = jest.spyOn(
      component.instance(), 'componentWillReceiveProps'
    );
    const recieveProps = {
      users: [
          { id: 1, username: 'bunmi', email: 'alaobunmi93@gmail.com' },
          { id: 2, username: 'test', email: 'test@email.com' },
          { id: 3, username: 'michelle', email: 'michelle@email.com' },
          { id: 4, username: 'param', email: 'param@email.com' },
          { id: 5, username: 'mike', email: 'mike@email.com' }
      ],
      pagination: {
        count: 5,
        page: 1,
        pageCount: 1,
        pageSize: 5 }
    };
    component.instance().componentWillReceiveProps(recieveProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
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
