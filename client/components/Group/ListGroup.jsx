import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { groupsRequest } from '../../actions/createGroupRequest';
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

  joinGroup (id) {
    // event.preventDefault();
    // const id = event.target.data-id;
    console.log("something", id);
    // this.props.getMessages(id).then((err, res) => {
    //   if(!err) {
    //     console.log("error when no error");
    //   }
    //   console.log("something when error");
    // });
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

export default connect(mapStateToProps, {getGroups, groupsRequest, getMessages})(withRouter(ListGroup));