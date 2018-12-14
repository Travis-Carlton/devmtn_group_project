import React, { Component } from 'react';
import './PeopleToMessage.scss';
import axios from 'axios';
import {withRouter,Link} from 'react-router-dom';
import {connect} from 'react-redux';

class PeopleToMessage extends Component {
    constructor(){
        super();
        this.state = {
            displayPeople: [],
            allPeople: [],
            conversations: [],
            conversationId: '',
            activeTab: true,
            searchTab: false,
            isConvos: false
        }
    }

    componentWillMount(){
        this.getAllUsers();
        this.getActiveConversations();
    }

    getAllUsers = ()=>{
        axios.get('/api/getallusers/formessaging').then(res=>{
            console.log(res.data)
            this.setState({
                allPeople: res.data
            })
        })
    }

    getActiveConversations = ()=>{
        // const {userID} = this.props;
        
        const userID = localStorage.getItem('userId')
        console.log(userID)
        axios.get(`/api/getactiveconversations/${userID}`).then(res=>{
            console.log('==========active convos',res.data.length);
            if(res.data.length){
                let activeConvos = []
                for(let i = 0; i<res.data.length;i++){
                if(res.data[i]!=null){
                    activeConvos.push(res.data[i])
                }
            }
            console.log('<><><<>',activeConvos);
            // return activeConvos
                return this.setState({
                    conversations: activeConvos,
                    isConvos: true
                })
            } else return this.setState({
                conversations: []
            })
        })        
    }

    createConversation = (otherUserId)=>{
        const {userID} = this.props;
        // alert(userID)
        axios.post(`/api/newconversation`, {userID,otherUserId}).then(res=>{
            const {convo,convoId} = res.data;
            if(convo){
                this.setState({
                    conversationId: convo.conversation_id
                })
                this.props.history.push(`/messaging/${convo.conversation_id}`)
            } else {
                this.setState({
                    conversationId: convoId
                })
                this.props.history.push(`/messaging/${convoId}`)
            }
        })
        
    }

    ///  need to get users that who have messages from user. 
    /// in search they should be able to search for people also

    filteredPeople = (val)=>{
        console.log(typeof(val), val)
        let filteredArr = this.state.allPeople.filter(user=>{
          if(user.profile_name.toLowerCase().includes(val.toLowerCase())){
            return user
          } else if (!val.length){
            return []
          }
        })
        this.setState({
          displayPeople: filteredArr
        })
      }

    toggleViews = ()=>{
        this.setState({
            activeTab: !this.state.activeTab,
            searchTab: !this.state.searchTab
        })
    }

    render() {
        console.log('this.state ===',this.state.conversations);
        //    const activeConvos = 
        //    this.state.conversations.map(el=>{
        //         console.log('object help ', el)
        //     return (
        //            <div onClick={()=>this.createConversation(el.user_id)} className='peoplecards' style={{cursor:'pointer'}} 
        //            key={el.user_id}>
        //                <img src={el.profile_picture} alt=""/>
        //                <p>{el.name}</p>
        //            </div>
        //        )
        //    }) 

        // const convos2 = ()=>{
        //     let cConvos = this.state.conversations;
        //     let nConvo = []
        //     for(let i = 0; i<cConvos.length;i++){
        //         if(cConvos[i]!=null){
        //             nConvo.push(cConvos[i])
        //         }
        //     }
        //     console.log('<><><<>',nConvo);
        //     return nConvo
        // }
        // convos2()
        
        
       
        

        const filteredPeople = this.state.displayPeople.map(el=>{
            return ( 
                <div onClick={()=>this.createConversation(el.user_id)}  
                key={el.user_id} className='peoplecards' style={{cursor:'pointer'}}>
                    <img src={el.profile_picture} alt=''/>
                    <p>{el.name}</p>
                </div>    
            )
        })

        const mappedPeople = this.state.allPeople.map(el=>{
            return ( 
                <div  onClick={()=>this.createConversation(el.user_id)}
                  key={el.user_id} to={`/messaging/${el.user_id}`} 
                  className='peoplecards' style={{cursor:'pointer'}}>
                    <img src={el.profile_picture} alt=''/>
                    <p>{el.name}</p> 
                </div>
            )
        })

        return (
            <div className='peopletomessagep'>
                <div className='ptmsidebar'>
                    <div className='profilebox'>

                    </div>
                    <div className="notificationsbox">
                    
                    </div>
                </div>
                <div className='rightmenubox'>
                    <div className='ptmtopbar'>
                    { this.state.activeTab?
                        <button onClick={this.toggleViews}>Search</button>
                        :
                        <>
                            <button onClick={this.toggleViews}>Active Conversations</button>
                            <input onChange={e=>this.filteredPeople(e.target.value)} type="search"/>

                        </>
                    }
                    </div>
                    <div className='ptmpeopleview'>
                        { this.state.activeTab?
                            <>
                                <div className="thumbnails">{
                                    this.state.conversations.map(el=>{
                                        console.log('object help ', el)
                                    return (
                                           <div onClick={()=>this.createConversation(el.user_id)} className='peoplecards' style={{cursor:'pointer'}} 
                                           key={el.user_id}>
                                               <img src={el.profile_picture} alt=""/>
                                               <p>{el.name}</p>
                                           </div>
                                       )
                                   }) 
                                }</div>
                                {/* {activeConvos} */}
                            </>
                            :
                            <>
                                {
                                    this.state.displayPeople.length > 0 ? 
                                    <div className="thumbnails">{filteredPeople}</div> 
                                    : 
                                    <div className="thumbnails">{mappedPeople}</div>
                                }
                            </>

                        }
                    </div>
                </div>
                {/* <div>{activeConvos}</div>
                people to message
                <input onChange={e=>this.filteredPeople(e.target.value)} type="search"/>
                {
                    this.state.displayPeople.length > 0 ? 
                    <div>{filteredPeople}</div> 
                    : 
                    <div>{mappedPeople}</div>
                } */}
            </div>
        );
    }
}

function mapStateToProps(state){
    const {userID} = state;
    return {
        userID
    }
}

export default withRouter(connect(mapStateToProps)(PeopleToMessage))