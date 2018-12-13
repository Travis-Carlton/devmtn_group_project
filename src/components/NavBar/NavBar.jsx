import React, { Component } from "react";
import "./NavBar.scss";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import icon from '../../media/profile.png';
import logo from '../../media/complogo.svg';
import menuicon from '../../media/menuicon.svg';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      toggleNav: false,
      profileDropdown: false
    };
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        toggleNav: !prevState.toggleNav
      }
    })
  }

  profileDropdown = (x)=>{
    if(x===true){
      this.setState({
        profileDropdown: true
      })
    } else {
      this.setState({
        profileDropdown: false
      })
    }
  }


  toggleLogout = () => {
    this.props.logout()
    this.setState({
      toggleNav: false,
      profileDropdown: false
    })
  }

  toggleLogin = () => {
    this.props.login()
    this.setState({toggleNav: false})
  }

  render() {
    console.log(this.state.toggleNav)
    return (
      
      <div className="navbarp">
          <div className="navbarlogo">
            <img src={logo} alt='logo'/>
            <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>DevWay</Link>
            { this.props.isDeveloper ?
            <p className="nav-switch">Developer</p> 
            : this.props.isDeveloper === false ?
            <p className="nav-switch">Client</p>
            : <></>
            }
          </div>

          <img onClick={this.toggle} className="mobiletab" src={menuicon}/>

          {<nav className={this.state.toggleNav ? 'show' : ''}>
              <div className="navbarcc">

                <Link to="/" onClick={() => this.setState({toggleNav: false})}>HOME</Link>
                {/* a tags are place holders for visual */}
                <Link to="/howitworks" onClick={() => this.setState({toggleNav: false})}>HOW IT WORKS</Link>

                {
                  //Logged in as a Developer
                  this.props.loggedIn && this.props.isDeveloper === true ? (
                    <>
                      <Link to="/feed" onClick={() => this.setState({toggleNav: false})}>JOB FEED</Link>
                    </>
                  )
                :
                //Logged in as a Client
                this.props.loggedIn && this.props.isDeveloper === false &&
                  ( <>
                      <Link to="/feed" onClick={() => this.setState({toggleNav: false})}>BROWSE DEVS</Link>
                    </> )
                }
                {!this.props.loggedIn ? (
                  <p onClick={() => this.toggleLogin()}>LOGIN</p>
                ) : (
                  <></>
                )}
                  <Link className='mobiletab' onClick={()=>this.profileDropdown(false)} to='/favorites'>Favorites</Link>
                  <Link to="/profile" onClick={() => this.setState({toggleNav: false})}><img onMouseEnter={()=>this.profileDropdown(true)} onMouseLeave={()=>this.profileDropdown(false)} className="icon" src={icon} alt=''/></Link>
                  {this.state.profileDropdown && this.props.loggedIn &&
                    <div onMouseEnter={()=>this.profileDropdown(true)} onMouseLeave={()=>this.profileDropdown(false)} className='profileDropDown'>
                        {this.props.loggedIn && this.props.isDeveloper && <div><Link onClick={()=>this.profileDropdown(false)} to='/favorites'>Favorites</Link></div>}
                        {this.props.loggedIn && <div onClick={() => this.toggleLogout()}>LOGOUT</div>}
                    </div>
                  }
              </div>
          </nav>
          }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedIn, isDeveloper } = state;
  return {
    loggedIn,
    isDeveloper
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
