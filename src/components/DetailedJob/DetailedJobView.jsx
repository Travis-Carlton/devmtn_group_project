import React, { Component } from 'react'
import  DetailedJobsPublic  from './DetailedJobsPublic';
import DetailedJobsHired  from '../DetailedJob/DetailedJobsHired';
import axios from 'axios'


export default class DetailedJobView extends Component {
    constructor(){
        super();
        this.state={
            accepted: null
        }
    }

    componentDidMount() {
        axios.get(`/api/getselectedjob/${this.props.match.params.id}`).then(res => {
            console.log('res.data[0].accepted', res.data[0].accepted)
            this.setState({accepted: res.data[0].accepted})
        })
    }

  render() {
    return (
      <div>
            { this.state.accepted === 0 ?
            <DetailedJobsPublic jobID={this.props.match.params.id}/>
            :
            <DetailedJobsHired jobID={this.props.match.params.id} />
            }
      </div>
    )
  }
}
