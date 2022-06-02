import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Sidebar from "react-sidebar"
import { connect } from "react-redux"
import { logout } from "../redux/userReducer"
import axios from "axios"

class HamburgerMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileBarOpen: false
    };
  }

  sidebarOpen = () => {
    this.setState({
      mobileBarOpen: !this.state.mobileBarOpen
    })
  }

  logoutButton = async () => {
    this.props.logout()
    await axios.delete('/users/logout')
    this.props.push('/')
  }
  render() {
    let sidebarLinks = this.props.firstName ? <div>
      <div className="link-container">
        <Link className="sidebar-link" to="/userhome"><p onClick={this.sidebarOpen}> Gigs</p></Link>
      </div>
      <div className="link-container">
        <Link className="sidebar-link" to="/clientlist"><p onClick={this.sidebarOpen}> Clients</p></Link>
      </div>
      <div className="link-container">
        <Link to="/gighistory" className="sidebar-link"><p onClick={this.sidebarOpen}> Gig History</p></Link>
      </div>
      <div className="logout-sidebar-container">
        <button className="logout_button" onClick={this.logoutButton}>Logout</button>
      </div>
    </div> : null

    let navbarLinks = this.props.firstName ? <div className="desktop-nav">
      <div className="link-desktop-container">
        <Link className="sidebar-link" to="/userhome"><p onClick={this.sidebarOpen}> Gigs</p></Link>
      </div>
      <div className="link-desktop-container">
        <Link className="sidebar-link" to="/clientlist"><p onClick={this.sidebarOpen}> Clients</p></Link>
      </div>
      <div className="link-desktop-container-gig-history">
        <Link to="/gighistory" className="sidebar-link"><p onClick={this.sidebarOpen}> Gig History</p></Link>
      </div>
      <button className="logout_button" onClick={this.logoutButton}>Logout</button>
    </div> : null
    return (
      <div className="total-navbar-container">
        <div className="nav_container">
          <Sidebar rootClassName="mobileNavView"
            sidebar={<div><div className="sidebar-header"><div className="menu-header-sidebar">Menu</div></div>
              <div className="h-menu-link">{sidebarLinks}</div></div>}
            open={this.state.mobileBarOpen}
            onSetOpen={this.sidebarOpen}
            styles={{ sidebar: { background: "#969A97", position: "fixed" } }}
            pullRight={true}
          >
            <div className="hamburger-button-container">
              <button onClick={this.sidebarOpen} className="hamburger-icon-button"><i className="fas fa-bars fa-5x"></i></button>
            </div>
          </Sidebar>
        </div>
        {navbarLinks}
      </div>
    )
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(null, mapDispatchToProps)(HamburgerMenu)