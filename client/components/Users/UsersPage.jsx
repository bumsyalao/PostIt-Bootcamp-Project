import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/groups';

class UsersPage extends Component {
  componentDidMount(){
    this.props.getAllUsers();
  }
  render() {
    return (
      <div className="row">
        <div className="container form-margin">
          <div className="">
            <div className="row">
              <form className="col s12" >
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">search</i>
                    <input id="icon_prefix" type="text" className="validate" />
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
              <tr>
                <td>Alvin</td>
                <td>Eclair</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  users: state.users
});


export default connect(mapStateToProps, { getAllUsers })(UsersPage);