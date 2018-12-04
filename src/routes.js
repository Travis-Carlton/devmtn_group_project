import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from './components/Profile/Profile';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import JobFeed from './components/JobFeed/JobFeed.jsx';
import CreateJob from './components/JobForm/JobForm';
import DetailedJob from './components/DetailedJob/DetailedJobs';
import HowItWorks from './components/HowItWorks/HowItWorks';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/profile' component={Profile} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/jobfeed' component={JobFeed} />
       <Route path='/create' component={CreateJob} />
       <Route path='/job/:id' component={DetailedJob} />
       <Route path='/howitworks' component={HowItWorks} />
    </Switch>
)