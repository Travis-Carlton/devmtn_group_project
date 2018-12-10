import React, { Component } from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import PaypalExpressBtn from 'react-paypal-express-checkout';

export default class Footer extends Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
            name: '',
            email: '',
            message: '',
            donationAmount: 0
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

    onToken = (token) => {
        axios.post('/api/stripe', {
        method: 'POST',
        body: token,
        amount: this.state.donationAmount * 100
        })
        .then(response => {
            if(response.data.success){
                console.log('success')
                this.setState({donationAmount: 0})
                }
            })
        }

    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }


    render() {
        const onSuccess = (payment) => {
            console.log("The payment was succeeded!", payment);
        }
        const onCancel = (data) => {
            console.log('The payment was cancelled!', data);
        }
        const onError = (err) => {
            console.log("Error!", err);
        }
        let env = 'sandbox';
        let currency = 'USD';
        let total = 1000;
        const client = {
            sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: 'AbqrWh1gl8Vmpep3DG3iBj-sLGvgm-qFB1lFysyJRiUxybalQ3Nr5gIevSx3pUeHEsWluTJvOY60r3xK',
        }
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
                    {/* <Link to='/peopletomessage' >Messages</Link> */}
                    {/* <Link to='/favorites'>Favorites</Link> */}
                    <input name='donationAmount' onChange={(e) => this.handleInputs(e)}/> 
                    {/* <StripeCheckout
                        token={this.onToken}
                        name="Donate to Devway"
                        stripeKey="pk_test_rGBc29KX9tUGcuNiWorM9GuZ"
                        label="Donate"
                    />
                    <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} /> */}
                </div>
            </div>
        );
    }
}