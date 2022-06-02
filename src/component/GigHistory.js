import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// const ms = require('pretty-ms')


class GigHistory extends Component {
  state = {
    paidGigs : [],
    notPaidGigs : []
  }

  async componentDidMount(){
    let paidItems = await axios.get('/api/paid')
    let notPaid = await axios.get('/api/notpaid')
    
    this.setState({
      paidGigs : paidItems.data,
      notPaidGigs : notPaid.data
    })
  }
  

  render() {
    console.log(this.state.paidGigs)
    let displayArr = this.state.paidGigs.map((gig)=>{
      return  <div className='gig_card_container' key={gig.id} onClick={() => {
        this.props.history.push(`/singlegig/${gig.id}`)
      }}>
        <p className="card_title">{gig.title}</p>
        <p>{gig.description}</p>
        <p>${(gig.total_time * gig.project_rate).toFixed(2)}</p>
      </div>
    })

    let notPaidArr= this.state.notPaidGigs.map((gig)=>{
      return  <div className='gig_card_container' key={gig.id} onClick={() => {
        this.props.history.push(`/singlegig/${gig.id}`)
      }}>
        <p className="card_title">{gig.title}</p>
        <p>{gig.description}</p>
        <p>${(gig.total_time * gig.project_rate).toFixed(2)}</p>
      </div>
    })
    return <div className="user_home_main_container">
    <div>Paid Gigs:{displayArr}</div>
    <div>Not Paid gigs: {notPaidArr}</div>
    </div>
     
  }
}

const mapStateToProps = (reduxState) => {
  return {
    gigs: reduxState.gigs,
    totalGigTime: reduxState.totalGigTime
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(GigHistory)