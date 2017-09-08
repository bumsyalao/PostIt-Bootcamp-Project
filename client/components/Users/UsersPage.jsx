import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/users';

class UsersPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      offset: 0,
      limit: 5,
      searchParam: ''
    };
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers(offset, limit) {
    this.props.getAllUsers(offset, limit, this.state.searchParam);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users.users });
  }

  searchUsers = (e) => {
    // const filteredUsers = this.props.users.users.filter(({ username }) => username.indexOf(e.target.value) !== -1);
    this.setState({ searchParam: e.target.value, offset: 0, limit: 5 });
  }

  onSearch = () => {
    const limit = 5, offset = 0;
    if (!this.state.searchParam) return;
    this.getUsers(offset, limit);
  }

  showPrevious = () => {
    const { offset, limit } = this.state;
    const newOffset = offset === 0 ? offset : offset - limit;
    this.setState({ offset: newOffset }, () => {
      this.getUsers(this.state.offset, limit);
    });
  }

  showNext = () => {
    const { offset, limit } = this.state;
    this.setState({ offset: offset + limit }, () => {
      this.getUsers(this.state.offset, limit);
    });
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
                    <a className="waves-effect waves-light red lighten-2 btn"
                        onClick={this.onSearch}>
                        Search
                    </a>
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
        <div className="container page-button">
          <a className="waves-effect waves-light red lighten-2 btn" onClick={this.showPrevious}>Previous</a>
          <a className="waves-effect waves-light red lighten-2 btn" onClick={this.showNext}>Next</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users
});


export default connect(mapStateToProps, { getAllUsers })(UsersPage);
