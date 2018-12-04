import React, { Component } from "react";
import "./NavBar.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showTabs: false
    };
  }

  toggleTabs = () => {
    this.setState({
      showTabs: !this.state.showTabs
    });
  };

  render() {
    return (
      <div className="navbarp">
        <div className="navbarc">
          <div className="navbarlogo">DevWay</div>
          <div className="navbarcc">

            <Link to="/">Home</Link>
            {/* a tags are place holders for visual */}
            <Link to="/#">How It Works</Link>
            {!this.props.loggedIn ? (
              <p onClick={this.props.login}>Login</p>
            ) : (
              <p onClick={this.props.logout}>Logout</p>
            )}
            {this.props.loggedIn && (
              <>
                <Link to="/jobfeed">Job Feed</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}
          </div>
          <button onClick={this.toggleTabs} className="mobiletab">
            ❖
          </button>
          {this.state.showTabs && (
            <div className="showtabs">
              <div>
                <Link to="/">Home</Link>
                <Link to="/#">How It Works</Link>
                {!this.props.loggedIn ? (
                  <p onClick={this.props.login}>Login</p>
                ) : (
                  <p onClick={this.props.logout}>Logout</p>
                )}
                {this.props.loggedIn && (
                  <>
                    <Link to="/jobfeed">Job Feed</Link>
                    <Link to="/profile">Profile</Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
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

export default withRouter(connect(mapStateToProps)(NavBar));
