import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allUserGroups } from '../../actions/users';
import photo from '../../images/photo.jpg';

/**
 * @class UserProfile
 * @extends {Component}
 */
export class UserProfile extends Component {

  /**
   * Creates an instance of UserProfile.
   * Binds class methods
   * @memberOf UserProfile
   */
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  /**
   * Makes action call to get UserId
   * @returns userId
   * @memberOf UserProfile
   */
  componentDidMount() {
    const userid = this.props.access.user.userId;
    this.props.allUserGroups(userid);
  }

  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   * @memberOf UserProfile
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      groups: nextProps.user,
      user: nextProps.access.user
    });
  }
  /**
   * Renders UserProfile
   * @returns UserProfile
   * @memberOf UserProfile
   */
  render() {
    return (
      <div className="row">
        <div className="container form-margin">
          <div className="col s12 m7">
            <div className="profile-image">
              <img
                src={photo}
                width="100px"
                height="100px"
              />
            </div>
            <div className="card-content">
              <div className="collection">
                <div className="collection-item">
                  <span>{this.props.access.user.username} </span>
                </div>
                <div className="collection-item">
                  <span>{this.props.access.user.email} </span>
                </div>
                <div className="collection-item">
                  <span>{this.props.access.user.phoneNumber} </span>
                </div>
                <div className="collection-item">
                  {' '}
                  Groups I belong to:{' '}
                  {this.state.groups &&
                    this.state.groups.map(group => (
                      <div className="chip" key={group.groupId} > {group.groupName}
                      </div>
                    ))}{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  access: state.access,
  user: state.users.usergroups
});

export default connect(mapStateToProps, { allUserGroups })(UserProfile);
