/* global expect jest test */
import React from 'react';
import { shallow, configure } from 'enzyme';
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
    access: {
      user: {
        userId: 1
      }
    },
    groupList: {
      map: spy
    },
    groups: [{
      id: 1,
      groupname: 'Bunmi'
    }],
    getGroups: jest.fn(() => Promise.resolve()),
    addMemberToGroup: jest.fn(() => Promise.resolve()),
    listAllUsers: jest.fn(() => Promise.resolve()),
    allUserGroups: jest.fn(() => Promise.resolve())
  };
  const component = shallow(
    <ListGroup {...props} />
  );
  const childComponent = shallow(
    <GroupCard {...props} />
  );
  it('should match the ListGroupSnapshot', () => {
    const tree = toJson(component);
    expect(component.find('GroupCard').length).toEqual(0);
    expect(tree).toMatchSnapshot();
  });

  it('should render component and subcomponent', () => {
    expect(childComponent.exists()).toBe(true);
    expect(component.exists()).toBe(true);
  });

  it('it calls the onClick method', () => {
    const onClickSpy = jest.spyOn(
      component.instance(), 'onClick'
    );
    const id = 1;
    component.instance().onClick(id);
    expect(onClickSpy).toHaveBeenCalled();
  });

  it('calls listUsers function', () => {
    const listUsersSpy = jest.spyOn(
      component.instance(), 'listUsers'
    );
    const groupId = 1;
    component.instance().listUsers(groupId);
    expect(listUsersSpy).toHaveBeenCalled();
  });
});
