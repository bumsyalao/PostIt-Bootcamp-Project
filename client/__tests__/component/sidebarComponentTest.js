/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
// import feminist from '../../images/feminist.png';
import { Sidebar } from '../../components/Sidebar';

configure({ adapter: new adapter() });

describe('Sidebar component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });

  const component = shallow(
    <Sidebar />

  );

  test('should match the Sidebar component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
