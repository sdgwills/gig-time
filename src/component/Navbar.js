import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, userInfo } from '../redux/userReducer'
import axios from 'axios'
import HamburgerMenu from './HamburgerMenu'
import swal from "sweetalert"


class Navbar extends Component {
    constructor() {
        super()
        this.state = {

            open: [false, true, false, true],
            email: '',
            pass: ''
        }
    }
    componentDidMount() {
        axios.get('/api/getsession').then((res) => {
            this.props.userInfo(res.data)
        }).catch((err) => { console.log(err) })
    }

    loginHandler = async () => {
        let { email, pass } = this.state
        try {
            let login = await axios.post('/users/login', { email, pass })
            console.log(login.data.user)
            this.props.userInfo(login.data)
            this.props.history.push("/userhome")
        } catch{
            swal("Unable to Login", "Email or Password is Incorrect", "error")
        }
    }

    logoutHandler = () => {
        axios.delete('/users/logout').then(() => {
            // console.log('user Logged Out')
        }).catch(err => console.log(err, 'logout issue'))
        this.props.history.push('/')
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClick = (id) => {
        let { open } = this.state;
        this.setState({
            open: [...open.slice(0, id), !open[id], ...open.slice(id + 1)]
        });
    }

    render() {
        const { firstName } = this.props.prop
        console.log(this.props)
        return (
            <nav className='navbar'>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <span className="app_name_container">GIG Time</span>
                </Link>
                
                {!firstName ? (
                    
                        <div className='loginJacob'>
                            Email: <input  className="newTask" autoFocus type="email"
                                name="email" placeholder="email@example.com" required onChange={e => {
                                    this.changeHandler(e)
                                }} />
                            Password: <input type="password"
                                name="pass" placeholder="password" required onChange={(e) => {
                                    this.changeHandler(e)
                                }} />
                            <button onClick={this.loginHandler} className="login-button">Sign In</button>

                        </div>
                    
                ) : (
                        <div className="menu_logout_container">
                            <div className="welcome-logout-container">
                            {firstName && <div className="welcome-name-container">Welcome, {firstName} </div>}</div>
                            <HamburgerMenu firstName={firstName} push={this.props.history.push}/>
                        </div>
                    )}
            </nav>
        )
    }
}
const mapDispatchToProps = {
    logout,
    userInfo,

}
const mapStateToProps = (reduxState) => {

    return {
        prop: reduxState
    }

    // const { firstName } = reduxState
    // return { firstName }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar))