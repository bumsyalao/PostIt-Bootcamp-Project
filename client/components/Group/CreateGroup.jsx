import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createGroupRequest } from '../../actions/createGroupRequest';
import { connect } from 'react-redux';
import Sidebar from '../Sidebar';
import NavigationBar from '../NavigationBar';

class CreateGroup extends Component {
    constructor(props) {
    super(props);
    this.state = {
      id:'',
      groupname: '',
      description: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    $('.collapsible').collapsible();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  
  onSubmit(event) {
    event.preventDefault();
    console.log(this.state.groupname);
    this.props.createGroupRequest(this.state.groupname)
      .then(() => {
        Materialize.toast(created, 5000, 'green');
      }).catch((err) => {
        Materialize.toast(err, 5000, 'red');
      });
  }


  render() {
    const { createGroupRequest } = this.props;
    return (
      <div>
        <Sidebar />
        <div className="homepage">
          <NavigationBar />
          <div className="col s12 container">
            <div className="input-field col s6 offset-s3">
              <i className="material-icons prefix">group</i>
              <input value={this.state.groupname} onChange={this.onChange} name="groupname" type="text" 
              className="validate" required/>
              <label className="active" htmlFor="groupname">Groupname</label>
            </div>
            <div className="col s6 offset-s3">
              <label>Add User</label>
              <select className="browser-default">
                <option value="" disabled selected>Select a User</option>
                <option value="1">Option 1</option>
              </select>
            </div>
              <button onClick={this.onSubmit} disabled={this.state.invalid} className="btn waves-effect waves-light col s6 offset-s3 red lighten-2" type="submit" name="action">Enter
                <i className="material-icons right">send</i>
              </button>
          </div>
        </div>
      </div>
    )
  }
}

CreateGroup.propTypes = {
  createGroupRequest: PropTypes.func.isRequired,
};

export default connect (null, {createGroupRequest})(CreateGroup);
