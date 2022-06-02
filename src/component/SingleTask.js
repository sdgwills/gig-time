import React, { Component } from 'react';
import { connect } from "react-redux"
import axios from 'axios'
import Timer from './Timer'
import { userInfo } from '../redux/userReducer'
import swal from 'sweetalert';


class SingleTask extends Component {
  state = {
    toggleView: false,
    targetId: null,
    editToggle: false,
    task_title: null,
    task_desc: null
  }

  handleToggle = (val) => {
    console.log(val)
    this.setState({
      toggleView: !this.state.toggleView,
      targetId: val
    })
    window.scroll(0, 1)
  }

  deleteTask = (id) => {
    axios.delete(`/api/tasks/${id}`).then(res => {
      this.props.userInfo(res.data)
    })
    swal("Task deleted", "", "success")
  }

  editTask = (id) => {
    const { title, description, project_rate } = this.state
    // project_rate = +project_rate
    axios.put(`/api/tasks/${id}`, { title, description, project_rate }).then((res) => {
      this.props.userInfo(res.data)
    })
    this.toggleEdit()
  }

  editToggle = () => {
    this.setState({
      editToggle: !this.state.editToggle
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  editTask = (id) => {
    const { task_title, task_desc } = this.state

    axios.put(`/api/tasks/${id}`, { task_title, task_desc }).then(() => {

    })
    this.editToggle()
  }

  render() {
    console.log(this.props)
    const { task } = this.props

    let taskView = this.state.toggleView && !this.state.editToggle ?
      <><div className="gray_container"></div>
      <div className='task_card_container' key={task.id}>
        <h4 className="task_title">{task.task_title}</h4>
        <p className="desc_container">{task.task_desc}</p>
        <div className='timer_container'><Timer /></div>
        <i class="fas fa-window-minimize" onClick={this.handleToggle}></i>
      </div></>
      : !this.state.toggleView && !this.state.editToggle ?
        <div className="container_all_task">
          <div className="task_card_container_before" key={task.id} task_id={task.id}>
            <h4 className="task_title">{task.task_title}</h4>
            <p className="desc_container">{task.task_desc}</p>
            <i class="fas fa-expand-arrows-alt" onClick={this.handleToggle}></i>
            <button className='button_task_edit' onClick={this.editToggle}><i class="fas fa-pencil-alt"></i>edit task</button>
            <i class="fas fa-trash-alt" onClick={() => this.deleteTask(task.id)}></i>
          </div>
        </div>
        : !this.state.toggleView && this.state.editToggle ?
          <>
            <div>
              <p>task Title:</p>
              <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.task_title}
                value={this.state.task_title} name='task_title' />
              <p>task Description:</p>
              <input className="input_task_container" onChange={this.handleChange} placeholder={this.state.task_desc}
                value={this.state.task_desc} name="task_desc" />
            </div>
            <button className='button_task' onClick={() => this.editTask(task.id)}>save</button>
            <button className='button_task' onClick={this.editToggle}>back</button>
          </>
          : null

    return (
      <div >
        {taskView}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let { gigs } = state
  return { gigs }
}

const mapDispatchToProps = {
  userInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);