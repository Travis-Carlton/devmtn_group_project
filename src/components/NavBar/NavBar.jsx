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

            <Link to="/">HOME</Link>
            {/* a tags are place holders for visual */}
            <Link to="/howitworks">HOW IT WORKS</Link>
            {!this.props.loggedIn ? (
              <p onClick={this.props.login}>LOGIN</p>
            ) : (
              <p onClick={this.props.logout}>LOGOUT</p>
            )}
            {this.props.loggedIn && (
              <>
                <Link to="/jobfeed">JOB FEED</Link>
                <Link to="/profile">PROFILE</Link>
              </>
            )}
          </div>
          <button onClick={this.toggleTabs} className="mobiletab">
            ❖
          </button>
          {this.state.showTabs && (
            <div className="showtabs">
              <div>
                <Link to="/">HOME</Link>
                <Link to="/howitworks">HOW IT WORKS</Link>
                {!this.props.loggedIn ? (
                  <p onClick={this.props.login}>LOGIN</p>
                ) : (
                  <p onClick={this.props.logout}>LOGOUT</p>
                )}
                {this.props.loggedIn && (
                  <>
                    <Link to="/jobfeed">JOB FEED</Link>
                    <Link to="/profile">PROFILE</Link>
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
