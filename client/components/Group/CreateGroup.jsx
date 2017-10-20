import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groups';

class CreateGroup extends Component {

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
      groupname: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /* eslint-disable */

  /**
   * Mounts Materialize collapsible
   * 
   * @memberOf CreateGroup
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }
  /* eslint-enable */
  /**
   * Sets the event value to the state
   * @param {object} event The event of the HTML component
   *
   * @memberOf CreateGroup
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
   *
   * Makes an action call to createGroup
   *
   * @memberOf CreateGroup
   */
  onSubmit() {
    this.props.createGroup(this.state.groupname)
      .then(() => {
        Materialize.toast('created', 5000, 'green');
        this.props.history.push('/homepage/groups');
      }).catch((err) => {
        console.log(err.response.data);
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
            <input value={this.state.groupname}
            onChange={this.onChange}
            name="groupname"
            type="text"
            className="validate" required/>
            <label className="active" htmlFor="groupname">Groupname</label>
          </div>
            <button onClick={this.onSubmit} disabled={this.state.invalid}
            className=
            "btn waves-effect waves-light col s6 offset-s3 red lighten-2"
            type="submit" name="action">Enter
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


CreateGroup.propTypes = {
  createGroup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { createGroup })(CreateGroup);
