/* global expect jest test */
import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import adapter from 'enzyme-adapter-react-16';
import { ListGroup } from '../../components/Group/ListGroup';
import { GroupCard } from '../../components/Group/GroupCard';

configure({ adapter: new adapter() });

describe('ListGroup component', () => {
  const spy = jest.fn();
  beforeEach(() => {
    global.Materialize = { toast: jest.fn() };
  });
  afterEach(() => {
    spy.mockReset();
  });
  const props = {
    history: {
      push: spy
    },
    groupList: {
      map: spy
    },
    groups: [{
      id: 'vgh',
      groupname: 'Bunmi'
    }],
    getGroups: jest.fn(() => Promise.resolve()),
    addMemberToGroup: jest.fn(() => Promise.resolve()),
    listAllUsers: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <ListGroup {...props} />
  );
  const childComponent = shallow(
    <GroupCard {...props} />
  );
  test('should match the ListGroupSnapshot', () => {
    const tree = toJson(component);
    expect(component.find('GroupCard').length).toEqual(0);
    expect(tree).toMatchSnapshot();
  });

  test('it should run function onClick', () => {
    const newerspy = jest.spyOn(component.instance(), 'joinGroup');
    component.find('#id').simulate('click');
    expect(newerspy).toHaveBeenCalled();
  });
});
