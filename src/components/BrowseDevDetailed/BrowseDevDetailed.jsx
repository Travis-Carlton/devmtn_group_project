import React, { Component } from 'react';
import axios from 'axios';

class BrowseDevDetailed extends Component {
    constructor(){
        super();
        this.state = {
            devInfo: null
        }
    }

    componentDidMount(){
        this.getInfo() 
    }

    getInfo = () => {
        let userId = this.props.match.params.id
        axios.get(`/api/getdevprofile/${userId}`).then(res => {
            console.log(res.data)
            this.setState({devInfo: res.data})
        })
    }

    render() {
        let devInfo = this.state.devInfo
        return (
            <div>
                {
                    devInfo !== null ?
                    <div>
                        <br /><br /><br /><br /><br />
                        <img style={{'maxWith': 100, 'maxHeight': 100}}src={devInfo.profile_picture || 'https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-12/25/User-Circle-512.png'} /> <br />
                        {devInfo.user_id} <br />
                        {devInfo.name} <br />
                        {devInfo.skills} <br />
                        {devInfo.title} <br />
                        {devInfo.developer_email} <br />
                        {devInfo.education} <br />
                        {devInfo.hourly_rate} <br />
                        {devInfo.overview} <br />
                        {devInfo.portfolio} <br />
                    </div>
                    :
                    <div>
                        Loading...
                        {/* {this.getInfo()} */}
                    </div>
                }
            </div>
        )
    }
}

export default BrowseDevDetailed