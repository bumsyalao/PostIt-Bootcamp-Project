/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
// import feminist from '../../images/feminist.png';
import SideBar from '../../components/SideBar';

configure({ adapter: new adapter() });

describe('SideBar component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });

  const component = shallow(
    <SideBar />
     
  );

  test('should match the SideBar component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
