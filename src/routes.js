import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import LogIn from './components/LogIn/LogIn.jsx';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import JobFeed from './components/JobFeed/JobFeed.jsx';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/login' component={LogIn} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/jobfeed' component={JobFeed} />

    </Switch>
)