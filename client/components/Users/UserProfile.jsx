import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allUserGroups } from '../../actions/users';


/**
 * @class UserProfile
 * @extends {Component}
 */
export class UserProfile extends Component {
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
    this.props.allUserGroups(this.props.access.user.id).catch();
  }

  /**
   * Update the state if the props are change
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
                src="https://yt3.ggpht.com/-niLM_ysnU8w/AAAAAAAAAAI/AAAAAAAAAAA/0UFxDTtpaJg/s900-c-k-no-mo-rj-c0xffffff/photo.jpg"
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
                  <span>{this.props.access.user.phonenumber} </span>
                </div>
                <div className="collection-item">
                  {' '}
                  Groups I belong to:{' '}
                  {this.state.groups &&
                    this.state.groups.map(group => (
                      <div className="chip">{group.groupname}</div>
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
