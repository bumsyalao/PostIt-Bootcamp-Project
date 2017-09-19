import React from 'react';
import testUtils from 'react-addons-test-utils';

import signinPage from '../../components/SignIn/SignInPage.jsx';

describe('the signin module', () => {
  describe('display the signin form', () => {
    it('should display the signin form', () => {
      const user = {
        username: 'bunmi',
        password: '123456abcd'
      };
      const signin = testUtils.renderIntoDocument(
        <signinPage user={user}/>
      );
      const label = testUtils.findRenderedDOMComponentWithTag(user, 'input');
    });
    expect(label.textContent).toEqual(user.username);
  });
});
