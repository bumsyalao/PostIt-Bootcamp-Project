import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import addMemberToGroup from '../../actions/createGroupRequest';
import { getMessages } from '../../actions/messages';
import { getGroups } from '../../actions/groups';
import GroupCard from './GroupCard';
import GroupChat from './GroupChat';


class ListGroup extends React.Component {
  constructor(props){
    super(props)
    this.onClick = this.onClick.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }
  
  componentDidMount(){
    this.props.getGroups();
  }

  onClick(id){
        this.props.history.push(`/homepage/view-group/${id}`)
  }

  joinGroup (event) {
    event.preventDefault();
    console.log("something", event.target.name);
    const id = event.target.name;
    this.props.addMemberToGroup(id).then(() => {
      Materialize.toast('Member successfully added', 5000, 'red');
    });
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col s12 m5 l5">
             {this.props.groupList.map((group) => 
             <GroupCard key={group.id} id={group.id} onClick={() => 
               this.onClick(group.id)} joinGroup={this.joinGroup} {...group} />)}
          </div>
          <div className="col s12 m6 l6">
            {/* <Switch>
              <Route path='/homepage/view-group' component={GroupChat}/> 
            </Switch>  */}
          </div>
        </div>
      </div>
    )}
}

const mapStateToProps = state => (
  {
    group: state.group.group,
    groupList: state.group.groupList,
    messages: state.group.groupMessages
  }
);

export default connect(mapStateToProps, {getGroups, getMessages, addMemberToGroup})(withRouter(ListGroup));