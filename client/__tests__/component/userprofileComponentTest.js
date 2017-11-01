/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { UserProfile } from '../../components/Users/UserProfile';

configure({ adapter: new adapter() });

describe('UserProfile Compoenent', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    access: {
      user: { id: 1 }
    },

    allUserGroups: jest.fn(() => Promise.resolve())
  };
  const nextProps = {
    user: spy,
    access: {
      user: spy
    }
  };
  const component = shallow(
    <UserProfile {...props} />
  );

  test('should render componemt', () => {
    expect(component.exists()).toBe(true);
  });

  test('should match User Profile component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
