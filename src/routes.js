import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from './components/Profile/Profile';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import JobFeed from './components/JobFeed/JobFeed.jsx';
import CreateJob from './components/JobForm/JobForm';
import DetailedJob from './components/DetailedJob/DetailedJobs';
import Favorites from './components/Favorites/Favorites';
import HowItWorks from './components/HowItWorks/HowItWorks';
import BrowseDevelopers from './components/BrowseDevelopers/BrowseDevelopers';
import DevProfile from './components/BrowseDevDetailed/BrowseDevDetailed';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/profile' component={Profile} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/jobfeed' component={JobFeed} />
       <Route path='/create' component={CreateJob} />
       <Route path='/job/:id' component={DetailedJob} />
       <Route path='/favorites' component={Favorites} />
       <Route path='/howitworks' component={HowItWorks} />
       <Route path='/browsedevelopers' component={BrowseDevelopers} />
       <Route path='/devprofile/:id' component={DevProfile} />
    </Switch>
)