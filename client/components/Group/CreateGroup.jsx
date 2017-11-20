import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groups';

/**
 *
 * @class CreateGroup
 * @extends {Component}
 */
export class CreateGroup extends Component {

  /**
   * Creates an instance of CreateGroup.
   * Binds class methods
   * @param {any} props
   *
   * @memberOf CreateGroup
   */
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() { //eslint-disable-line
    $('.collapsible').collapsible();
  }
  /**
   * Sets the event value to the state
   * @param {object} event The event of the HTML component
   *
   * @memberOf CreateGroup
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   *
   * Makes an action call to createGroup
   *
   * @memberOf CreateGroup
   */
  onSubmit() {
    this.props.createGroup(this.state.groupName)
      .then(() => {
        Materialize.toast('Created Group Succesfully', 5000, 'green');
        this.props.history.push('/homepage/groups');
      }).catch((err) => {
        Materialize.toast(err.response.data, 5000, 'red');
      });
  }


  /**
   *
   * Renders CreateGroup component
   * @returns CreateGroup HTML component
   *
   * @memberOf CreateGroup
   */
  render() {
    return (
      <div>
        <div className="col s12 container form-margin">
          <div className="input-field col s6 offset-s3">
            <i className="material-icons prefix">group</i>
            <input
            id="groupName"
            value={this.state.groupName}
            onChange={this.onChange}
            name="groupName"
            type="text"
            className="validate" required/>
            <label className="active" htmlFor="groupName">Groupname</label>
          </div>
            <button
            id="submit-group"
            onClick={this.onSubmit}
            className=
            "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
            type="submit"
            name="action">Enter
              <i className="material-icons right">send</i>
            </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.access.user,
});


export default connect(mapStateToProps, { createGroup })(CreateGroup);
