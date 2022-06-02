import React, {Component} from 'react';
import './styles/ProgressBar.css';

class TheProgressBar extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      percentage: 0
    }
    this.nextStep = this.nextStep.bind(this)
  }
  
  nextStep() {
    if(this.state.percentage === 100) return 
    this.setState({ percentage: this.state.percentage + 20 })
  }
  
  render() {
    return (
      <div>
        
        <h2> The Progress Bar </h2>
        <ProgressBar percentage={this.state.percentage} />
        
        <div style={{ marginTop: '20px' }}>  
          <button 
            onClick={this.nextStep}
           >
            Next Step
          </button>  
        </div>   
        
        {/* Added for convenience of viewing */}
        <div style={{marginTop: '10px', color: 'blue', marginBottom: '15px'}} onClick={() => this.setState({ percentage: 0 })}>
          Reset
        </div>

      </div>
    )
  }  
}

const ProgressBar = (props) => {
  return (
      <div className="progress-bar">
        <Filler percentage={props.percentage} />
      </div>
    )
}

const Filler = (props) => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

export default TheProgressBar