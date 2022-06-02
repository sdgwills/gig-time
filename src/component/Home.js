import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios';
import { userInfo } from "../redux/userReducer"
import { Link } from 'react-router-dom';


class Home extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  componentDidMount() {
    

    axios.get('/getEverything').then((res)=>{
      if(res.data.session.user){
        
        this.props.userInfo(res.data)

        // axios.get('/auth/users').then((res) => {
          
          
        //   this.props.userInfo(res.data)          
          
        // }).catch((err) => { console.log(err) })

      }
    }).catch(err=>console.log('err with navBar CDM', err))

  }

  render() {
    return (
      <div className='homeBody'>
        <div className='homeMain'>
          <div className="learnMore"><Link to='/learn-more'><button>Learn More</button></Link></div>
          <div className='carousel'>Carousel of Magic</div>
          <div className="registerBox"><Link to='register'><button className="register-button">Register</button></Link></div>
        </div>
      </div>
    )

  }

}
const mapDispatchToProps = {
  userInfo
}

const mapStateToProps = (reduxState) => {
  const { firstName } = reduxState
  return { firstName }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home)) 