import React, { Component } from "react";
import Login from "./Login";
import Grades from "./Grades";
import Home from "./Home";

import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./Repository";

class App extends Component {
  logOut() {
    localStorage.removeItem("x-access-token");
  }

  render() {
    return (
      <Router>
        <div
          className="ui inverted menu"
          style={{ backgroundColor: "#ff6f00" }}
        >
          <Link to="/" className="active item">
            Home
          </Link>

          {isAuthenticated() ? (
            <Link to="/grades/list" className="item">
              Grades
            </Link>
          ) : (
            ""
          )}

          <div className="right menu">
            <div className="item">
              {isAuthenticated() ? (
                <li onClick={this.logOut}>
                  <a className="btn btn-primary" href="/">
                    Log Out
                  </a>
                </li>
              ) : (
                <li>
                  <Link className="btn btn-primary" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/grades/list" exact element={<Grades />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
