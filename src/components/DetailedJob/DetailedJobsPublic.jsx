import React, { Component } from 'react';
import './DetailedJobs.scss';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux'
import Loading from '../../media/Loading.gif';

class DetailedJobsPublic extends Component {
    constructor(){
        super();
        this.state = {
            job: [],
            showEmailForm: false,
            modalName: '',
            modalEmail: '',
            modalMessage: '',
            modalFile: '',
            modalClientEmail: '',
            applied: [],
            faves: [],
            setMe: ''
        }
    }
    componentDidMount(){
        this.getTheJob()
        this.getApplied()
        this.getFaves()
    }

    getTheJob = () => {
        axios.get( `/api/getselectedjob/${this.props.jobID}`).then(res => {
            this.setState({job: res.data})
        })
    }

    getFaves = () => {
        let userId = localStorage.getItem('userId')
        axios.get(`/api/getfavorite/${userId}`).then(res => {
            console.log('RES DATTTTTAA-->', res.data)
            this.setState({faves: res.data})
        })
    }

    addFavorite = (userId, jobId) => {
        axios.post('/api/addfavorite', {user_id: userId, job_id: jobId}).then(res => {
            alert('Job added to favorites')
            this.getTheJob()
            this.getApplied()
            this.getFaves()
            this.setState({setMe: 'hi'})
        })
    }

    getApplied = () => {
        axios.get('/api/getallapplied').then(res => {
            this.setState({applied: res.data})
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
            // console.log(res.data)
            if(res.data === 'sent'){
                this.setState({
                    showEmailForm: false
                })
                alert('message sent')
            } else alert('message failed')
        })
    }

    applyToJob = (user_id, job_id) => {
        axios.post('/api/applied', {job_id, user_id})
        .then(res => {
            this.getTheJob()
            this.getApplied()
            this.setState({setMe: 'hi'})
        })
        .catch(error => {
            console.error('Error on applyToJob', error)
        })
    }

    render() {
        let {userID} = this.props;
        const {showEmailForm} = this.state;
        let appliedOrNot = this.state.applied.findIndex(id => {
            let user = localStorage.getItem('userId')
            return id.user_id == user
            })
        let appliedOrNot2 = this.state.applied.findIndex(id => {
            return this.props.match.params.id == id.job_id
            })



        console.log('STATE DATTTTTAA-->', this.state.faves)
        let favedOrNot = this.state.faves.findIndex(id => {
            return this.props.match.params.id == id.job_id
            })




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
                        <button style={{cursor:'pointer'}} onClick={()=>this.showEmailModal('')} className="contactCloseBtn">Close</button>
                </div>
            }

                <div className="job-container">
                {
                    this.state.job.map(job => {
                        return <div key={job.id} className="job-profile-view">
                        Posted By: <br />
                        <img src={job.profile_picture} alt=''/>
                        <h4>{job.profile_name}</h4>
                        <p onClick={()=>this.showEmailModal(job.email)} ><span style={{cursor:'pointer'}}>{job.email}</span></p>
                        </div>
                        
                    })
                }
                {
                    this.state.job.map(job => {
                        let semiFinalDate = []
                        let splitStamp = job.stamp.split('')
                        let betterDate = splitStamp.slice(0, 10)
                        semiFinalDate.push(betterDate[5], betterDate[6], betterDate[4], betterDate[8], betterDate[9], betterDate[7],betterDate[0], betterDate[1], betterDate[2], betterDate[3]);
                        let finalDate = semiFinalDate.join('')
                        return <div key={job.id} className="detail-job-info">
                                    <h2>{job.title}</h2>
                                    <p className="detail-job-description">{job.description}</p>
                                    <p>Start Date: {job.start_date}</p>
                                    <p>${job.pay}</p>
                                    <p>Estimated Completion Time: {job.estimation}</p>
                                    <p>Posted on {finalDate}</p>
                                    {
                                        this.props.isDeveloper ?
                                            <div className="button-center">
                                            {   appliedOrNot == -1 || appliedOrNot2 == -1 ?
                                                <button style={{cursor:'pointer'}} onClick={() => this.applyToJob(userID, job.job_id)}>Apply for Job</button>
                                                :
                                                <>
                                                    <button style={{background: 'none'}}>✔Applied</button>
                                                </>
                                            }
                                            {   favedOrNot == -1  ?
                                                <button style={{cursor:'pointer'}} onClick={() => this.addFavorite(userID, job.job_id)}>Save to Favorites</button>
                                                :
                                                <>
                                                    <button style={{background: 'none'}}>✔Saved</button>
                                                </>
                                            }
                                            </div>
                                            
                                        : <img src={Loading} />
                                    }
                                </div>
                            })
                }
                </div>
            </div>
        )}
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID,
        isDeveloper: state.isDeveloper
    }
}

export default withRouter(connect(mapStateToProps)(DetailedJobsPublic));
