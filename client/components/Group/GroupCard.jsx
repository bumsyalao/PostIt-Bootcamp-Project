import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @class GroupCard
 * @extends {Component}
 */
class GroupCard extends Component {

  /**
   * Renders GroupCard component
   * @returns GroupCard component
   * @memberOf GroupCard
   */
  /* eslint-disable */
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  /* eslint-enable */
  render() {
    const { groupName, id, joinAGroup, listUsers, users } = this.props;

    return (
      <div className="col s6">
        <div className="message-card group">
          <div className="card-action">
            <ul className="collapsible " data-collapsible="accordion">
              <li>
                <div
                  className="collapsible-header group-header"
                  id="document-header"
                >
                  <Link
                    to={`/homepage/view-group/${id}`}
                    className="card-title"
                  >
                    {groupName}
                  </Link>
                  <i className="material-icons">more_vert</i>
                </div>
                <div className="collapsible-body options" id="groups">
                  <ul
                    className="collapsible group-options"
                    data-collapsible="accordion"
                  >
                    <li>
                      <i className="material-icons tiny">games</i>
                      <div onClick={joinAGroup} id={id} className="card-title">
                        Join group
                      </div>
                    </li>

                    <li className="user-list">
                      <div
                        className="collapsible-header group-header menu-item"
                        id="document-header"
                      >
                        <i className="material-icons tiny">group</i>
                        <div
                          onClick={() => listUsers(id)}
                          id={id}
                          className="card-title"
                        >
                          View users
                        </div>
                      </div>
                      <div className="collapsible-body options" id="groups">
                        <ul
                          className="collapsible group-options"
                          data-collapsible="accordion"
                        >
                          <li>
                            <div className="users-list">
                              {users &&
                                users.map(user => (
                                  <div id={id} key={user.userId} className="card-title">
                                    {user.username}
                                  </div>
                                ))}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default GroupCard;
