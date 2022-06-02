import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateGigs, userInfo } from '../redux/userReducer'

class GigWizard extends Component {
  constructor() {
    super()
    this.state = {
      gigName: '',
      gigDesc: '',
      rate: 0,
      clientFName: '',
      clientLName: '',
      clientEmail: '',
      clientPhone: 0
    }
  }

  changeHandler = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }
  wizardSubmitHandler = async(e) => {
    e.preventDefault()

    await axios.post('/api/createGig', this.state).then(res => {
      //dispatch to redux store updated gig list
      console.log(this.state);
      this.props.updateGigs(res.data)
      this.props.userInfo(res.data)
    })
    this.props.history.push('/userHome')
    
  }

  goBack = () => {

    this.props.history.push(`/userHome`)
  }


  render() {
    return (
      <div className="task_wizard_container">
        <form >
          <div className="group">
            <h1>Gig Info</h1>
            <input className="input_task_container" type="text" onChange={this.changeHandler} required placeholder="Gig Name" name="gigName" />

            <input className="input_task_container" type="text" onChange={this.changeHandler} required placeholder="gig description" name="gigDesc" />

            <input className="input_task_container" type="number" onChange={this.changeHandler} required placeholder="Hourly Rate" name="rate" />

          </div>


          <div className="group">
            <h1>Client Info</h1>
            <input className="input_task_container" type="text" onChange={this.changeHandler} required placeholder="Client first Name" name="clientFName" />

            <input className="input_task_container" type="text" onChange={this.changeHandler} required placeholder="Client Last Name" name="clientLName" />

            <input className="input_task_container" type="email" onChange={this.changeHandler} required placeholder="client Email" name="clientEmail" />


            <input className="input_task_container" type="number" onChange={this.changeHandler} required placeholder="Client Phone" name="clientPhone" />

          </div>



          <div className="button_task_container">
            <button type="submit" onClick={this.wizardSubmitHandler}>Submit</button>
            <button onClick={this.goBack} id='cancelButton'>cancel</button>
          </div>
        </form>

      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    reduxState: state
  }
}

const mapDispatchToProps = {
  updateGigs,
  userInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(GigWizard)