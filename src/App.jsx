import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import routes from "./routes";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  updateLoggedIn,
  updateIsDeveloper,
  updateUserID,
  updateTitle,
  updateOverview,
  updateHourlyRate,
  updatePortfolio,
  updateSkills,
  updateEducation,
  updateProfilePicture,
  updateDevEmail,
  updateSavedJobs,
  updateName,
  clearState
} from "./redux/reducer";
import socketIOClient from 'socket.io-client';
const socket = socketIOClient('http://localhost:4005');

class App extends Component {
  constructor() {
    super();
    this.state = {
      notifications: []
    };
  }

  componentWillMount() {
    this.getProfileInfo();
    this.getNotifications();
  }

  getNotifications = ()=>{
    socket.on('notification',(msg)=>{
      // console.log('======APP', msg);
      this.setState({
        notifications: [...this.state.notifications, msg]
      })
    })
  }

  getProfileInfo = () => {
    const {
      updateLoggedIn,
      updateIsDeveloper,
      updateUserID,
      updateTitle,
      updateOverview,
      updateHourlyRate,
      updatePortfolio,
      updateSkills,
      updateEducation,
      updateProfilePicture,
      updateDevEmail,
      updateSavedJobs,
      updateName,
    } = this.props;
    axios.get("/api/user-data").then(res => {
      console.clear();
      console.log('res.data------>', res.data);
      if (res.data === "no session") {
        return;
      } else {
        let {
          user_id,
          profile_picture,
          profile_name,
          email,
          developer,
          overview,
          hourly_rate,
          portfolio,
          skills,
          education
        } = res.data.user;
        console.log(user_id)
        // if (developer === null) {
        //   developer = false;
        // } else
        if (user_id) {
          console.log('developer', developer)
          updateLoggedIn(true);
          updateIsDeveloper(developer);
          updateUserID(user_id);
          updateProfilePicture(profile_picture);
          updateName(profile_name)
          localStorage.setItem('userId', user_id)
        }

        if(res.data.user.skills){
            updateOverview(overview)
            updateHourlyRate(hourly_rate)
            updatePortfolio(portfolio)
            updateSkills(skills)
            updateEducation(education)
        }

        axios.get('/api/user')

        axios.get(`/api/getdevprofile/${user_id}`).then(res2 => {
          console.log("profile get ", res2.data);
          let { developer_email,education,hourly_rate,overview,
            portfolio,skills,title } = res2.data;
          
          updateTitle(title)
          updateOverview(overview);
          updateHourlyRate(hourly_rate);
          updatePortfolio(portfolio);
          updateSkills(skills);
          updateEducation(education);
          
          updateDevEmail(developer_email);
        });
      }
    });
  };

  login = () => {
    const redirecturi = encodeURIComponent(
      window.location.origin + "/auth/callback"
    );
    const url = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirecturi}&response_type=code`;
    window.location = url;
  };

  logout = () => {
    axios.post("/api/logout").then(() => {
      this.props.updateLoggedIn(false);
      this.props.clearState();
      this.props.history.push('/')
      // this.props.updateShow(false);
      // this.props.updateUser(null);
      // this.props.alert.show("Logged Out");
    });
  };

  render() {
    // console.log('>>>>>APP NOT', this.state.notifications)
    return (
      <div className="App">
        <NavBar login={this.login} logout={this.logout} />
        <div className="Appc">{routes}</div>
        <Footer loggedIn={this.props.loggedIn} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn } = state;
  return {
    loggedIn
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      updateLoggedIn,
      updateIsDeveloper,
      updateUserID,
      updateTitle,
      updateOverview,
      updateHourlyRate,
      updatePortfolio,
      updateSkills,
      updateEducation,
      updateProfilePicture,
      updateDevEmail,
      updateSavedJobs,
      updateName,
      clearState
    }
  )(App)
);
