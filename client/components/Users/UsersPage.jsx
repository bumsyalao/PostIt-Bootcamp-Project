import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/groups';

class UsersPage extends Component {
  constructor() {
    super();
    this.state = { users: [] };     
  }

  componentWillMount() {
    this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users.users });
  }

  searchUsers = (e) => {
    let filteredUsers = this.props.users.users.filter(({ username }) => username.indexOf(e.target.value) !== -1);
    this.setState({ users: filteredUsers });
  }

  render() {
    const { users } = this.state;
    return (
      <div className="row">
        <div className="container form-margin">
          <div className="">
            <div className="row">
              <form className="col s12" >
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix"
                          type="text"
                          onChange={this.searchUsers}
                          className="validate" />
                    <label htmlFor="icon_prefix">Enter username</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container table">
          <table className="responsive-table">
            <thead>
              <tr>
                <th>USERNAME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
                {users && users.map(({ email, username }) =>
                  <tr>
                    <td>{username}</td>
                    <td>{email}</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users
});


export default connect(mapStateToProps, { getAllUsers })(UsersPage);
