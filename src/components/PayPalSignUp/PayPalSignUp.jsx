import React, { Component } from 'react'
import axios from 'axios';


export default class PayPalSignUp extends Component {
    componentDidMount(){
        axios.post('https://api.sandbox.paypal.com/v1/customer/partner-referrals',
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ',
            "customer_data": {
            "partner_specific_identifiers": [{
                "type": "TRACKING_ID",
                "value": "1506721845"
            }]
            },
            "requested_capabilities": [{
            "capability": "API_INTEGRATION",
            "api_integration_preference": {
                "partner_id": "BSD55M2TSQT72",
                "rest_api_integration": {
                "integration_method": "PAYPAL",
                "integration_type": "THIRD_PARTY"
                },
                "rest_third_party_details": {
                "partner_client_id": "AViNcnTmPaYZ3VltsmWEN3UmogFcZnjKsnqaitDo2cHrEEl1Rlns4GSz36CSUl69q9eADJwEItR0Rq7M",
                "feature_list": [
                    "PAYMENT",
                    "REFUND",
                    "PARTNER_FEE",
                    "DELAY_FUNDS_DISBURSEMENT"
                ]
                }
            }
            }],
            "web_experience_preference": {
            "partner_logo_url": "https://example.com/paypal.jpg",
            "return_url": "https://example.com/return",
            "action_renewal_url": "https://example.com/renew-prefill-url"
            },
            "collected_consents": [{
            "type": "SHARE_DATA_CONSENT",
            "granted": true
            }],
            "products": [
            "EXPRESS_CHECKOUT"
            ]
        }).then(res => console.log(res))
    }
render() {
    return (
        <div>
            <div dir="ltr" trbidi="on">
                <script>
                    {
                    function(d, s, id) {
                    var js, ref = d.getElementsByTagName(s)[0];
                    if (!d.getElementById(id)) {
                        js = d.createElement(s);
                        js.id = id;
                        js.async = true;
                        js.src = "https://www.paypal.com/webapps/merchantboarding/js/lib/lightbox/partner.js";
                        ref.parentNode.insertBefore(js, ref);
                    }
                    }(document, "script", "paypal-js")
                    };
                </script>
                <br /> <br /> <br /> <br /> <br />
                <a data-paypal-button="true" href="<partner_onboarding_url>&displayMode=minibrowser" target="PPFrame">Sign up for PayPal</a>
                </div>
        </div>
    )}
}
