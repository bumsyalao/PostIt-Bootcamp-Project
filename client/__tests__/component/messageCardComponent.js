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
    username: spy,
    User: { username: spy },
    messagePriority: spy,
    message: spy

  };
  spy.toUppercase();
  const component = shallow(
    <MessageCard {...props} />
  );

  test('should render component', () => {
    expect(component.exists()).toBe(true);
  });

  test('should match the Message card snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
