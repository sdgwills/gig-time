import React, { Component } from 'react'
import { connect } from 'react-redux'
import Axios from 'axios';
const ms = require('pretty-ms')


class UserHome extends Component {

  state = {

    menuOn: false
  }

componentDidMount() {
  Axios.get('/getSession').then(res=> {
   console.log(res.data, 'fawoifjwaoefij')
    if(!res.data.user){
      this.props.history.push('/')
    }
  })
}
  

  menuToggle = () => {
    this.setState({
      menuOn: !this.state.menuOn
    })
  }

  render() {
    let gigMapped = (this.props.gigs) ? this.props.gigs.map((gig) => {
      return (
        <>
        <div className='gig_card_container' key={gig.id} onClick={() => {
          this.props.history.push(`/singlegig/${gig.id}`)
        }}>

          <p className="card_title">{gig.title}</p>
          <p>Desc: {gig.description}</p>
          <p>Time: {ms(gig.total_time)}</p>
        <i className="fas fa-expand"></i>

        </div>
        </>
      )
    }) : null




    return (
      <div  className="user_home_main_container">
        {gigMapped}

        <div id="circularMenu" className={this.state.menuOn ? 'circular-menu active' : 'circular-menu'}>
          <div className="floating-btn" onClick={this.menuToggle}>
            <i className="fa fa-plus"></i>
          </div>
          <menu className="items-wrapper">
            <a href={"/#/wizard"} className="menu-item ">create</a>
            <a href={"/#/gighistory"} className="menu-item ">history</a>
            <a href={"/#/clientlist"} className="menu-item ">clients</a>
          </menu>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    gigs: reduxState.gigs,
    totalGigTime: reduxState.totalGigTime,
    userId: reduxState.user_id
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)