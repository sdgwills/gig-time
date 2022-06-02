import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
// const ms = require('pretty-ms')


class ClientList extends Component {
  state = {
    list: [],

  }

  async componentDidMount() {

    let clientList = await axios.get('/api/clients')
    console.log(this.state.list)

    this.setState({
      list: clientList.data
    })
  }


  render() {
    console.log(this.state.list)
    let displayArr = this.state.list.map((client) => {
      return <div className='gig_card_container' key={client.id} >
        <p className="card_title">{client.client_first}</p>
        <p>{client.client_last}</p>
        <p>{client.email}</p>
        
      </div>
    })



    return <>
      <div className="user_home_main_container">Client List:{displayArr}</div>

    </>

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

export default connect(mapStateToProps, mapDispatchToProps)(ClientList)