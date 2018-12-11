import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from './components/Profile/Profile';
import DevWizard from './components/DevWizard/DevWizard.jsx';
import CreateJob from './components/JobForm/JobForm';
import DetailedJobView from './components/DetailedJob/DetailedJobView';
import Favorites from './components/Favorites/Favorites';
import HowItWorks from './components/HowItWorks/HowItWorks';
import DevProfile from './components/BrowseDevDetailed/BrowseDevDetailed';
import Feed from './components/Feed/Feed.jsx';
import Messaging from './components/Messaging/Messaging.jsx';
import PeopleToMessage from './components/PeopleToMessage/PeopleToMessage.jsx';
import AppliedDevelopers from './components/AppliedDevelopers/AppliedDevelopers.jsx';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/profile' component={Profile} />
       <Route path='/devwiz' component={DevWizard} />
       <Route path='/create' component={CreateJob} />
       <Route path='/job/:id' component={DetailedJobView} />
       <Route path='/favorites' component={Favorites} />
       <Route path='/howitworks' component={HowItWorks} />
       <Route path='/feed' component={Feed} />
       <Route path='/messaging/:conversationid' component={Messaging} />
       <Route path='/peopletomessage' component={PeopleToMessage} />
       <Route path='/devprofile/:id' component={DevProfile} />
       <Route path='/applied/:id' component={AppliedDevelopers} />
    </Switch>
)