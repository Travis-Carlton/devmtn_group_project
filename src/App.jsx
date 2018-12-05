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

class App extends Component {
  constructor() {
    super();
    this.state = {
      something: null
    };
  }

  componentWillMount() {
    this.getProfileInfo();
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
      updateName
    } = this.props;
    axios.get("/api/user-data").then(res => {
      console.log(res.data);
      if (res.data === "no session") {
        return;
      } else {
        let {
          user_id,
          picture,
          email,
          developer
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
          localStorage.setItem('userId', user_id)
        }
        axios.get(`/api/getdevprofile/${user_id}`).then(res2 => {
          console.log("profile get ", res2.data);
          let { developer_email,education,hourly_rate,overview,
            portfolio,profile_picture,skills,title, name } = res2.data;
          updateName(name);
          updateTitle(title)
          updateOverview(overview);
          updateHourlyRate(hourly_rate);
          updatePortfolio(portfolio);
          updateSkills(skills);
          updateEducation(education);
          updateProfilePicture(profile_picture);
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
      // this.props.updateShow(false);
      // this.props.updateUser(null);
      // this.props.alert.show("Logged Out");
    });
  };

  render() {
    return (
      <div className="App">
        <NavBar login={this.login} logout={this.logout} />
        <div className="Appc">{routes}</div>
        <Footer />
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
