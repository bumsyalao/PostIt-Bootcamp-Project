/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ConnectedUserProfile, { UserProfile } from '../../components/Users/UserProfile';

configure({ adapter: new adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({
  access: {
    isAuthenticated: true,
    user: {
      email: 'michelle@email.com',
      phoneNumber: '07045454545',
      userId: 3,
      username: 'michelle'
    }
  },
  users: {
    usergroups: [
      {
        groupId: 3,
        groupName: 'First group'
      }
    ]
  }
});

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
      user: { id: 1,
        username: 'bantu',
        email: 'bantu@email.com',
        phoneNumber: '09082091930' }
    },
    user: [],
    allUserGroups: jest.fn(() => Promise.resolve())
  };
  const nextProps = {

    user: [{ groupId: 3, groupName: 'First group' }],

    access: {
      user: {
        userId: 3,
        username: 'michelle',
        email: 'michelle@email.com',
        phoneNumber: '07045454545' }
    },
    allUserGroups: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <UserProfile {...props} />
  );

  it('should render componemt', () => {
    expect(component.exists()).toBe(true);
  });

  it('should match User Profile component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('it has componentWillReceiveProps', () => {
    const mountedComponent = shallow(
      <UserProfile {...props} />);
    mountedComponent.setState({
      groups: [
        {
          groupId: 3,
          groupName: 'First group'
        }
      ]
    });
    const componentWillReceivePropsSpy = jest.spyOn(
      mountedComponent.instance(), 'componentWillReceiveProps'
    );
    mountedComponent.instance().componentWillReceiveProps(nextProps);
    expect(componentWillReceivePropsSpy).toHaveBeenCalled();
  });

  it('has map state to props', () => {
    const mountedComponent = shallow(
      <ConnectedUserProfile {...props} store={store} />
    );
    expect(mountedComponent.length).toBe(1);
  });
});
