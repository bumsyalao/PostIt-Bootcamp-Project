/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import PageNotFound from '../../components/PageNotFound';

configure({ adapter: new adapter() });

describe('PageNotFound component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });

  const component = shallow(
    <PageNotFound />
  );

  test('should match the PageNotFound component snapshot', () => {
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
  });
});
