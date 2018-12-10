import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './Messaging.scss';
import axios from 'axios';

import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4005');



class Messaging extends Component {
    constructor(){
        super();
        this.state = {
            message: '',
            fromServer:[],
            fromDB: []
        }
    }
    componentDidMount(){

        this.getPreviousMsgs()
        this.getMessageFromServer();
                 
    }

    getMessageFromServer = ()=>{
        socket.on('messageFromServer', message => {
            let update = [...this.state.fromServer, message]
            this.setState({
              fromServer: update
            })
          }); 
    }

    getPreviousMsgs = ()=>{
        const { conversationid } = this.props.match.params;
        axios.get(`/api/${conversationid}/prevcomments`).then((res)=>{
        console.log('--------previous messages',res.data)
        this.setState({
            fromDB: res.data
        })
        })
    }

    sendMessage = () => {
        const {message} = this.state;
        const {userID} = this.props;
        const {conversationid} = this.props.match.params;
        socket.emit('message', {message, conversationid, userID});
        this.setState({ message: ''});
      }
    
    msgChange = (val)=>{
        this.setState({
            message: val
        })
    }
    
 

////////// render
    render() {
        // console.log('<<<<>>>>>',this.state.fromDB);
        const myMessages = this.state.fromServer.map((message,i) => {
            return <div key={i}>
                     <p>{message.message}</p>
                </div>
          })
        const myPreviousMessages = this.state.fromDB.map((message,i) => {
            return <div key={i}>
                     <p>{message.messages}</p>
                </div>
          })
///////// return 
        return (
            <div className='messagingp'>
                {myPreviousMessages}
                {myMessages}
                <input value={this.state.message} onChange={e=>this.msgChange(e.target.value)} />
                <button disabled={this.state.message.length<1} onClick={this.sendMessage}>Submit</button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggedIn, userID, name, title, profilePicture } = state;
    return {
      loggedIn,
      userID,
      name,
      title,
      profilePicture,
    };
  }

export default withRouter(connect(mapStateToProps)(Messaging))