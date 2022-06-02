import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Iframe from 'react-iframe';
import Scroller from './Scroller';

export default class LearnMore extends Component {

  render() {
    return (
      <div>
        <div className='learnMoreHero'>
          <div className='heroText'>
            <h2>Welcome to GIG Time!</h2>
            <h4>We are fast, furious, and efficient!</h4>
            <Link to='/register' className="register-link-button"><button className='registerButton'>Register Today! <i className="fas fa-angle-double-right"></i></button></Link>
            
          </div>
        </div>

        <div className='learnMoreCardContainer' id='learnMoreCardContainer'>
          <div className='midPageContainer'>

            <div className="myOval">
              <div className="text_in_oval">Learn More!</div>
              <div className="arrow"><Scroller y={700} /></div>
            </div>
            
            <div className="card_container_learn">
              <div className='learnMoreCard1'></div>
              <p className="text_learn">This app makes it easy to keep track on time spent on each task of your gig.</p>
            </div>

            <div className="card_container_learn">
              <div className='learnMoreCard2'></div>
              <p className="text_learn">Send automatic notifications to your clients to remind them of payments due.</p>
            </div>

            <div className="card_container_learn">
              <div className='learnMoreCard3'></div>
              <p className="text_learn">Keep track of your clients, paid Gigs and unpaind Gigs.</p>
            </div>
          </div>
          <div className="button-learn-more-container">
          <Link to='/register'><button className='registerButton'>Register Here!</button></Link>
          <p className="learn-more-below-text">Learn How It Works Below!</p>
          <div className="lower-arrow"><Scroller y={1800} /></div>
          </div>

        </div>

        <section className='learnMoreVideo'>
          <Iframe
            width="700"
            height="400"
            url="https://www.youtube.com/embed/dQw4w9WgXcQ"
          />
        </section>
      </div>
    )
  }
}