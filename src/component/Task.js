import React, { Component } from 'react';
import { connect } from "react-redux"
import SingleTask from './SingleTask';

class Task extends Component {
    state = {
        toggleView: false,
        targetId: null
    }

    handleToggle = (val) => {
        console.log(val)
        this.setState({
            toggleView: !this.state.toggleView,
            targetId : val
        })
    }

    render() {
        
        console.log(this.props, 'TASK')
        let taskView = this.props.gig.tasks.map((task) => 
        <SingleTask task={task}/>)
        if(taskView){        
        return (
            <div >
                {taskView}
            </div>
        );
    } 
    }
}

const mapStateToProps = (state) => {
    let { gigs } = state
    return { gigs }
}

export default connect(mapStateToProps)(Task);