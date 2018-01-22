import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/**
 *
 * @class GroupCard
 * @extends {Component}
 */
export class GroupCard extends Component {
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
    const { groupName, id } = this.props;
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
