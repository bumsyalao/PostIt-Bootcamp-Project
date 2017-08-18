import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { groupsRequest, getMessages }from '../../actions/createGroupRequest';
import GroupCard from './GroupCard';
import GroupChat from './GroupChat';


class ListGroup extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      groupList: []
    }
    this.onClick = this.onClick.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }
  componentDidMount(){
    this.props.groupsRequest()
      .then(() => {
        console.log(this.props)
        this.setState({
          groupList: this.props.groupList
        })
      })
  }

  onClick(event){
    this.props.getMessages(event.target.name)
      .then(()=> {
        console.log('Found messages', this.props.groupMessages)
        this.props.history.push('/homepage/view-group')
      })
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
             {this.state.groupList.map((group) => <GroupCard key={group.id} id={group.id} onClick={this.onClick} joinGroup={this.joinGroup} {...group} />)}
          </div>
          <div className="col s12 m6 l6">
            <Switch>
              <Route path='/homepage/view-group' component={GroupChat}/> 
            </Switch> 
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

export default connect(mapStateToProps, {groupsRequest, getMessages})(withRouter(ListGroup));