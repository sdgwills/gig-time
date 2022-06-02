import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateGigs, userInfo} from '../redux/userReducer'

class TaskWizard extends Component {
  constructor() {
    super()
    this.state = {
      taskTitle: '',
      taskDesc: '',
      gigId: null

    }
  }

  changeHandler = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })

  }
  wizardSubmitHandler = async(e) => {
    e.preventDefault()
    const { gig_id } = this.props.match.params
    const { taskTitle, taskDesc } = this.state
    await axios.post('/api/tasks/create', { gig_id, taskTitle, taskDesc }).then(res => {
      this.props.userInfo(res.data)
      

    })
    this.props.history.push(`/singlegig/${gig_id}`)
    
    
  }

  goBack = () => {
    const { gig_id } = this.props.match.params
    this.props.history.push(`/singlegig/${gig_id}`)
  }


  render() {
    return (
      <div className="task_wizard_container">
        <form >

          <h1>Create a Task:</h1>
          <div className="group">
            <input className="input_task_container" type="text" onChange={this.changeHandler} required placeholder="Task title" name="taskTitle" />

            <textarea cols="50" rows="7" className="text_task_container" type="text" onChange={this.changeHandler} required placeholder="Task description" name="taskDesc" />




          </div>

          <div className="button_task_container">
            <button type="submit" onClick={this.wizardSubmitHandler}>Submit</button>
            <button onClick={this.goBack}>cancel</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskWizard)