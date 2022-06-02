import React, {Component} from 'react'
import axios from 'axios';
import './styles/Register.scss';


export default class Register extends Component {
  constructor(){
    super()
    this.state={
      firstName:'', 
      lastName:'', 
      email:'', 
      phone: '', 
      pass:'', 
      venmo:''
    }
  }

submitHandler=(e)=> {
  e.preventDefault()
  console.log('clicked!')

axios.post('/users/register', this.state).then((res)=>{
  console.log(res)
  this.props.history.push('/userHome')
  window.location.reload()
}).catch(err=>console.log(err, 'register failed' ))
}

changeHandler=(e)=> {
  this.setState({
    [e.target.name]:e.target.value
  })
}

  render() {
    return(
      <div className='register'>
        
        <form action="submit">
      <h2>
        Register for GigTime
      </h2>
      <input type="text" name="firstName" placeholder="First Name" onChange={this.changeHandler} required/>

      <input type="text" name="lastName" placeholder="Last Name" onChange={this.changeHandler} required/>

      <input type="email" name="email" placeholder="email" onChange={this.changeHandler} required/>

      <input type="text" name="phone" placeholder="Phone Number" onChange={this.changeHandler} required/>

      <input type="password" name="password" placeholder="password" onChange={this.changeHandler} required/>

      <input type="text" name="venmo" placeholder="Venmo Handle" onChange={this.changeHandler} required/>

<button type="submit" onClick={this.submitHandler}>register!</button>
        </form>
      </div>
    )
  }
}