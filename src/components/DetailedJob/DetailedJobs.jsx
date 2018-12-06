import React, { Component } from 'react';
import './DetailedJobs.scss';
import axios from 'axios';
import {connect} from 'react-redux'

class DetailedJob extends Component {
    constructor(){
        super();
        this.state = {
            job: [],
            showEmailForm: false,
            modalName: '',
            modalEmail: '',
            modalMessage: '',
            modalFile: '',
            modalClientEmail: ''
        }
    }
    componentDidMount(){
        axios.get( `/api/getselectedjob/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({job: res.data})
        })
    }

    addFavorite = (userId, jobId) => {
        axios.post('/api/addfavorite', {user_id: userId, job_id: jobId}).then(res => {
            alert('Job added to favorites')
        })
    }

    showEmailModal = (email)=>{

        this.setState({
            showEmailForm: !this.state.showEmailForm,
            modalClientEmail: email
        })
    }

    handleChange = (key,val)=>{
        this.setState({
            [key]:val
        })
    }
    sendEmailToClient = (e)=>{
        e.preventDefault();
        let {modalName,modalEmail,modalMessage,modalFile,modalClientEmail} = this.state;
        axios.post(`/api/sendEmailToClient`,{modalName,modalEmail,modalMessage,modalFile,modalClientEmail}).then(res=>{
            console.log(res.data)
            if(res.data === 'sent'){
                this.setState({
                    showEmailForm: false
                })
                alert('message sent')
            } else alert('message failed')
        })
    }

    render() {
        let {userID} = this.props;
        const {showEmailForm} = this.state;
        console.log('detailed job view', this.state.modalClientEmail);
        return (
            <div className='detailedJobp'>
                {showEmailForm&&
                <div className='emailFormp'>
                    <form onSubmit={this.sendEmailToClient} className='emailFormc'>
                        <label>Name: </label>
                        <input onChange={e=>this.handleChange('modalName',e.target.value)} type="text" minLength='3' required/>
                        <label>Email: </label>
                        <input onChange={e=>this.handleChange('modalEmail',e.target.value)} type="email" required/>
                        <label>Message: </label>
                        <textarea onChange={e=>this.handleChange('modalMessage',e.target.value)} cols="30" rows="10" minLength='20' required />
                        <label style={{cursor:'pointer'}} htmlFor="files" className='attachDocs' >Attach Resumé</label>
                        <input onChange={e=>this.handleChange('modalFile',e.target.value)} id='files' style={{visibility:'hidden'}} type="file"/>
                        {this.props.userID&&<button type='submit'>Send</button>}
                    </form>
                        <button style={{cursor:'pointer'}} onClick={()=>this.showEmailModal('')}>Close</button>
                </div>
            }
                {/* <br /> <br /> <br /> */}
                {
                    this.state.job.map(job => {
                        return <div key={job.id}>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.start_date}</p>
                        <p>{job.estimation} Days</p>
                        <p>${job.pay}</p>
                        <button style={{cursor:'pointer'}} onClick={() => this.addFavorite(userID, job.job_id)}>Watch Post</button>
                        </div>
                    })
                }
                <br /> <br /> <br />
                {
                    this.state.job.map(job => {
                        return <div key={job.id}>
                        Posted By: <br />
                        <img src={job.picture} alt=''/>
                        <h4>{job.profile_name}</h4>
                        <p onClick={()=>this.showEmailModal(job.email)} >Contact: <span style={{cursor:'pointer'}}>{job.email}</span></p>
                        </div>
                        
                    })
                }
                {/* {console.log(this.state.job)} */}
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps)(DetailedJob);
