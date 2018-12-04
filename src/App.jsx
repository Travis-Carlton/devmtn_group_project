import React, { Component } from "react";
import "./App.scss";
import axios from 'axios';
import routes from "./routes";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

class App extends Component {
  constructor(){
    super();
    this.state = {
      something: null
    }
  }

  login = () => {
    const redirecturi = encodeURIComponent(window.location.origin + '/auth/callback');
    const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirecturi}&response_type=code`
    window.location = url;  
}

logout = () => {
    axios.post('/api/logout').then(() => {
        this.props.updateShow(false)
        this.props.updateUser(null)
        this.props.alert.show('Logged Out')
})
}

  render() {
    return (
      <div className="App">
        <NavBar login={this.login} />
        <div className="Appc">{routes}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
