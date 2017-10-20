import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class GroupCard extends Component {
  /* eslint-disable */
  /**
   * Mounts materialize collapsible
   * @memberOf GroupCard
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  /* eslint-enable */
  /**
   * Renders GroupCard component
   * @returns GroupCard component
   * @memberOf GroupCard
   */
  render() {
    const { groupname, id, joinGroup, listUsers, users } = this.props;

    return (
      <div className="row">
        <div className="col s12 container">
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
                      {groupname}
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
                        <div onClick={joinGroup} id={id} className="card-title">
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
                                  users.map(({ username }) => (
                                    <div id={id} className="card-title">
                                      {username}
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
      </div>
    );
  }
}
export default GroupCard;
