import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getAllUsers } from '../../actions/users';

class UsersPage extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      offset: 0,
      pageCount: 0,
      limit: 5,
      searchParam: ''
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers(offset, limit) {
    this.props.getAllUsers(offset, limit, this.state.searchParam);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users.users,
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count });
  }

  searchUsers = (e) => {
    this.setState({ searchParam: e.target.value, offset: 0, limit: 5 });
  }

  onSearch = () => {
    const limit = 5, offset = 0;
    if (!this.state.searchParam) return;
    this.getUsers(offset, limit);
  }
  handlePageClick(data) {
    const selected = data.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.getUsers(offset, limit).then(() => {
      this.setState({
        users: this.props.users.users
      });
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
        {(this.state.count > 5) && <ReactPaginate
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      pageCount={this.state.pageCount}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={3}
                      onPageChange={this.handlePageClick}
                      containerClassName={'pagination'}
                      subContainerClassName={'pages pagination'}
                      activeClassName={'active'}
                    />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  users: state.users,
  pagination: state.users.pagination
});


export default connect(mapStateToProps, { getAllUsers })(UsersPage);
