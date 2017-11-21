/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import Dashboard from '../../components/Dashboard';

configure({ adapter: new adapter() });

describe('Dashboard component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const component = shallow(
    <Dashboard />
  );
  it('should render self and sub components', () => {
    expect(component.exists()).toBe(true);
  });
});
