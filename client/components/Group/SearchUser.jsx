import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { getAllUsers } from '../../actions/users';
import {
  addMemberToGroup, getGroups, listAllUsers
} from '../../actions/groups';

/**
 * @class SearchPage
 * @extends {Component}
 */
export class SearchUser extends Component {
  /**
   * Creates an instance of SearchPage.
   * Bind the function handlePageClick to the class.
   * @memberOf SearchPage
   */
  constructor() {
    super();
    this.state = {
      users: [],
      pageCount: 0,
      searchParam: ''
    };
    this.joinGroup = this.joinGroup.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * Makes action call to get all users
   * @memberOf SearchPage
   */

  componentWillMount() {
    const id = this.props.match.params.groupId;
    this.props.getGroups();
    this.getUsers();
    this.props.listAllUsers(id);
  }

  /**
   * function to get users of the offset, limit and serach param
   * @param {int} offset
   * @param {int} limit
   * @memberOf SearchPage
   */

  getUsers(offset, limit) {
    this.props.getAllUsers(offset, limit, this.state.searchParam);
  }

  /**
   * Update the state if the props are changed
   * @param {object} nextProps
   * @memberOf SearchPage
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users.users,
      pageCount: nextProps.pagination.pageCount,
      count: nextProps.pagination.count
    });
  }

  /**
   *
   * Makes an action call to addMemberToGroup
   * @param {object} event The event of the HTML component
   *
   * @memberOf SearchUser
   */

  joinGroup(event) {
    event.preventDefault();
    const id = event.target.id;
    const groupId = this.props.match.params.groupId;
    this.props
      .addMemberToGroup(groupId, id)
      .then(() => {
        Materialize.toast('Member successfully added', 5000, 'green');
      })
      .catch(({ response }) => {
        Materialize.toast(
          `${response.data.message}`,
          5000,
          'red'
        );
      });
  }

  /**
   * Sets the event value and default value to the state
   * @function searchUsers
   * @param {object} event
   * @memberOf SearchPage
   */
  searchUsers = (event) => {
    this.setState({ searchParam: event.target.value, offset: 0, limit: 5 });
  };

  /**
   * Makes an action call to search for a user
   * @function onSearch
   * @memberOf SearchPage
   */
  onSearch = () => {
    const limit = 5,
      offset = 0;
    if (!this.state.searchParam) return;
    this.getUsers(offset, limit);
  };

  /**
   * Pagination for list of users
   * @param {object} data
   * @memberOf SearchPage
   */
  handlePageClick(pageData) {
    const selected = pageData.selected;
    const limit = 5;
    const offset = Math.ceil(selected * limit);
    this.setState({ offset });
    this.getUsers(offset, limit);
  }
  // disableJoinedUser = ()
  /**
   * Renders the SearchPage document
   * @returns SearchPage
   * @memberOf SearchPage
   */
  render() {
    const { users } = this.state;
    const groupid = this.props.match.params.groupId;
    console.log(this.props.groupList);
    return (
      <div className="row">
        <Link
          to={`/homepage/view-group/${groupid}`}
          className="waves-effect waves-light red lighten-2 btn">
          {' '}
          Go Back to Group
        </Link>
        <div className="container form-margin">
          <div className="">
            <div className="row">
              <form className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input
                      id="icon_prefix"
                      type="text"
                      onChange={this.searchUsers}
                      className="validate"
                    />
                    <label htmlFor="icon_prefix">Enter username</label>
                    <a
                      className="waves-effect waves-light red lighten-2 btn"
                      onClick={this.onSearch}
                    >
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
              {users &&
                users.map(user => (
                  <tr key={user.id}>
                    <td>
                    <a className="btn-floating btn-space"
                        onClick={this.joinGroup}
                        >
                        <i class="material-icons" id={user.id}>add</i>
                      </a>
                      {user.username}
                    </td>
                    <td>{user.email}</td>
                  </tr>
                ))}{' '}
            </tbody>
          </table>
          {this.state.count > 5 && (
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  pagination: state.users.pagination,
  groupList: state.group.groupList
});

export default connect(mapStateToProps, {
  getAllUsers,
  addMemberToGroup,
  getGroups,
  listAllUsers
})(SearchUser);
