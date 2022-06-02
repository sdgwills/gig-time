import React, { Component } from 'react';
import './styles/ClientView.css';
import ProgressBar from './ProgressBar';
import axios from 'axios'
// import { CompositionSettingsList } from 'twilio/lib/rest/video/v1/compositionSettings';

class ClientView extends Component {
  constructor() {
    super()

    this.state = {
      feedback:'', 
      gig: {}
    }
  }

  async componentDidMount() {
    let gig_id = this.props.match.params.gig_id

    await axios.get(`/api/getSingleGig/${gig_id}`).then(res => {
      this.setState({
        gig: res.data
      })
    }).catch(err => {
      console.log('Error in ClientView.js in the axios call for single gig', err)
    })
  }

  timeConversion = (millisec) => {

    var seconds = (millisec / 1000).toFixed(2);

    var minutes = (millisec / (1000 * 60)).toFixed(2);

    var hours = (millisec / (1000 * 60 * 60)).toFixed(2);

    var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(2);

    if (seconds < 60) {
        return seconds + " Sec";
    } else if (minutes < 60) {
        return minutes + " Min";
    } else if (hours < 24) {
        return hours + " Hrs";
    } else {
        return days + " Days"
    }
  }

  moneyConversion = (rate, time) => {
    let msToTime = time / 1000 / 60 / 60
    let totalMoney = msToTime * rate
    return totalMoney
  }

  render() {
    let gigToDisplay = this.state.gig
    let totalMoney = ((gigToDisplay.total_time / 1000 / 60 / 60) * gigToDisplay.project_rate).toFixed(2)
    let totalTime = this.timeConversion(gigToDisplay.total_time);
    return(
      <div className='main'>
        <div className='moneyInfo'>
          <div className='rateBox box'>Rate: <br/> ${gigToDisplay.project_rate}/hr.</div>
          <div className='rateBox box'>Total Time: <br/> {totalTime}</div>
          <div className='totalBox box'>Total $ To Date: <br/> ${totalMoney}</div>
        </div>
        <div>
          <div className='projectBox'>
            <div className='projectTitle'>
              <h2>Project: {gigToDisplay.title}</h2>
            </div>
            <hr/>
            <div className='projectDescriptionContainer'>
              <p><h4>Description-</h4> {gigToDisplay.description}</p>
            </div>
            <hr/>
            <div className='progress'>
              <ProgressBar/>
            </div>
          </div>
          
        </div>
      </div>
    )
  }
}

// const mapStateToProps= (reduxState)=> {
//   return reduxState
// }

// const mapDispatchToProps= {

// }

//This is the feedback area and button. Will add later after building from scratch
//  <textarea name="feedback" placeholder='type feedback here!' cols="30" rows="10" onChange={(e)=> {
//               this.setState({
//                 [e.target.name]:e.target.value
//               })
//             }}></textarea>
//             <button onClick={()=> {
//               axios.post('/feedback', {feedback: this.state.feedback,
//                 clientId: gigToDisplay.client_id,
//                 gig: gigToDisplay,
//               })
//             }}>Submit Feedback</button> 

export default ClientView
