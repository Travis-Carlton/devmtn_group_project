import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from './components/Profile/Profile';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import JobFeed from './components/JobFeed/JobFeed.jsx';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/profile' component={Profile} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/jobfeed' component={JobFeed} />

    </Switch>
)