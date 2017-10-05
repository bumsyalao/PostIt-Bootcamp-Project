import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignInRequest } from '../../actions/SignInAction';
import { allUserGroups } from '../../actions/users';


class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: []
    };
  }

  componentDidMount () {
    this.props.allUserGroups(this.props.access.user.userId)
    .then(() => {
      this.setState({
        groups: this.props.user
      });
    })
    .catch();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.access.user
    });
  }
  render() {
    return (
      <div className="row">
        <div className="container form-margin">
          <div className="">
            <div className="row">
              <form className="col s12" >
                <div className="row">
                  <div className="input-field col s12">
                    <div>
                      <img src="https://yt3.ggpht.com/-niLM_ysnU8w/AAAAAAAAAAI/AAAAAAAAAAA/0UFxDTtpaJg/s900-c-k-no-mo-rj-c0xffffff/photo.jpg" width="50px" height ="50px"/>
                    </div>
                    <div className="table">
                      <div><span>Username: {this.props.access.user.username} </span></div>
                      <div><span>Email: {this.props.access.user.email} </span></div>
                      <div><span>Phone Number: {this.props.access.user.phonenumber} </span></div>
                      <div> Groups I belong to: {this.state.groups && this.state.groups.map((group) => {
                        <p>{group.groupname}</p>
                      })} </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => (
  {
    access: state.access,
    user: state.users.usergroups
  }
);

export default connect(mapStateToProps, { allUserGroups })(UserProfile);
