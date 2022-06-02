import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './component/Home'
import Gig from "./component/Gig"
import UserHome from './component/userHome'
import Register from './component/Register'
import LearnMore from './component/LearnMore';
import ClientView from './component/ClientView';
import GigWizard from './component/GigWizard'
import SingleGig from './component/SingleGig';
import TaskWizard from './component/TaskWizard';
import GigHistory from './component/GigHistory';
import ClientList from './component/ClientList'


export default (
  <Switch>
    <Route exact path='/' component={LearnMore} />

    <Route path="/userHome" component={UserHome} />

    <Route path='/register' component={Register} />
    
    <Route path="/gig" component={Gig} />

    <Route path='/learn-more' component={Home} />

    <Route path='/client-view/:gig_id' component={ClientView} />
    <Route path="/wizard" component={GigWizard} />
    <Route path="/singlegig/:gig_id" component={SingleGig} />
    <Route path="/taskwizard/:gig_id" component={TaskWizard} />
    

    <Route path='/gighistory' component={GigHistory} />
    <Route path='/clientlist' component={ClientList} />

  </Switch>
)