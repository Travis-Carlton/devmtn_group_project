import React, { Component } from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class Footer extends Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            name: '',
            email: '',
            message: ''
        }
    }

    sendEmail = ()=>{
        const {name,email,message} = this.state;
        axios.post('/api/contact/sendgrid', {name,email,message}).then(res=>{
            console.log(res)
        })
    }

    handleChange = (key,val)=>{
        this.setState({
            [key]:val
        })
    }

    toggleModal = ()=>{
        this.setState({
            showModal: !this.state.showModal
        })
    }

    render() {
        return (
            <div className="footerp">
                    <div className={this.state.showModal&&'contactModal'}>
                        <form onSubmit={this.sendEmail} className={this.state.showModal&&'contactModalForm'}>
                            {this.state.showModal&&
                            <>
                                <h1>Contact</h1>
                                <div>
                                    <label>Name</label>
                                    <input onChange={e=>this.handleChange('name',e.target.value)} type="text" minLength='3' required/>
                                </div>
                                <div>
                                    <label>Email</label>
                                    <input onChange={e=>this.handleChange('email',e.target.value)} type="email" required/>
                                </div>
                                <div>
                                    <label>Message</label>
                                    <textarea onChange={e=>this.handleChange('message',e.target.value)} columns='70' rows='5' required/>
                                </div>
                                <div>
                                    <button type='submit'>Submit</button>
                                </div>
                            </>}
                        </form>
                        <button className={this.state.showModal?'contactCloseBtn':'hide'} onClick={this.toggleModal}>Close</button>
                    </div>
                <div className="footerc">
                    <p onClick={this.toggleModal}>Contact</p>
                    <Link to='/favorites' >Favorites</Link>
                </div>
            </div>
        );
    }
}