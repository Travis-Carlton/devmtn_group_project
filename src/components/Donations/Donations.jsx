import React, { Component } from 'react';
import './Donations.scss';
import StripeCheckout from 'react-stripe-checkout';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import axios from 'axios';



export default class  extends Component {
    constructor(){
        super();
        this.state = {
            donationAmount: 0,
        }
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
        let total = this.state.donationAmount;
        const client = {
            sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
            production: 'AbqrWh1gl8Vmpep3DG3iBj-sLGvgm-qFB1lFysyJRiUxybalQ3Nr5gIevSx3pUeHEsWluTJvOY60r3xK',
        }
        console.log('donateeeeee', this.state.donationAmount)
        return (
            <div className='donationmodalp'>
                <div className='donationmodalc'>
                    <h1>Thanks for supporting our website!</h1>
                    <input placeholder='Donation Amount' name='donationAmount' type='number' onChange={(e) => this.handleInputs(e)}/> 
                    <StripeCheckout
                        token={this.onToken}
                        name="Donate to Devway"
                        stripeKey="pk_test_rGBc29KX9tUGcuNiWorM9GuZ"
                        label="Donate Using Stripe"
                    />
                    <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
                    <button onClick={this.props.toggleDonations}>Close</button>
                
                </div>
            </div>
        );
    }
}