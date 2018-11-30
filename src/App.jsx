import React, { Component } from 'react';
import './App.scss';
import routes from './routes';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  render() {
    return (
      <div className="App">
      <NavBar />
        {routes}
      </div>
    );
  }
}

export default App;
