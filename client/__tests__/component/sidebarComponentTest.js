/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
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
  const props = {
    logout: spy,
    history: { push: spy }
  };
  const component = shallow(
    <Sidebar {...props} />

  );

  it('should match the Sidebar component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });

  it('calls logout function', () => {
    const logoutSpy = jest.spyOn(
      component.instance(), 'logout'
    );
    component.instance().logout({ preventDefault: () => {} });
    expect(logoutSpy).toHaveBeenCalled();
  });
});
