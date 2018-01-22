/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import MessageCard from '../../components/Group/MessageCard';

configure({ adapter: new adapter() });

describe('MessageCard Component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    createdAt: spy,
    username: 'blessing',
    User: { username: 'blessing' },
    messagePriority: spy,
    message: spy,

  };

  const component = shallow(
    <MessageCard {...props} />
  );

  it('should render component', () => {
    expect(component.exists()).toBe(true);
  });

  it('should match the Message card snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
