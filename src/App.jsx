import React, { Component } from "react";
import "./App.scss";
import routes from "./routes";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="Appc">{routes}</div>
        <Footer />
      </div>
    );
  }
}

export default App;
