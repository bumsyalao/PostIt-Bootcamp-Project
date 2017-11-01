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
      users: spy
    },

    getAllUsers: jest.fn(() => Promise.resolve())
  };
  const nextProps = {
    user: { users: spy },
    pagination: {
      pageCount: spy,
      count: spy
    }
  };
  const component = shallow(
    <UsersPage {...props} />
  );

  test('should render componemt', () => {
    expect(component.exists()).toBe(true);
  });

  test('should match UsersPage component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
