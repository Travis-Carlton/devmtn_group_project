import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from './components/Profile/Profile';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import CreateJob from './components/JobForm/JobForm';
import DetailedJob from './components/DetailedJob/DetailedJobs';
import Favorites from './components/Favorites/Favorites';
import HowItWorks from './components/HowItWorks/HowItWorks';
import DevProfile from './components/BrowseDevDetailed/BrowseDevDetailed';
import Feed from './components/Feed/Feed.jsx';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/profile' component={Profile} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/create' component={CreateJob} />
       <Route path='/job/:id' component={DetailedJob} />
       <Route path='/favorites' component={Favorites} />
       <Route path='/howitworks' component={HowItWorks} />
       <Route path='/feed' component={Feed} />

       <Route path='/devprofile/:id' component={DevProfile} />
    </Switch>
)