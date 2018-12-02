import React from 'react';
import {Switch,Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import LogIn from './components/LogIn/LogIn.jsx';

export default (
    <Switch>
       <Route exact path='/' component={LandingPage} />
       <Route path='/login' component={LogIn} />

    </Switch>
)