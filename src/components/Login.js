import React, { Component } from "react";
import { login } from "./Repository";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { name: "", password: "" };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitLogin(event) {
    event.preventDefault();
    login(this.state)
      .then((token) => (window.location = "/"))
      .catch((err) => alert(err));
  }

  render() {
    return (
      <div className="container">
        <hr />
        <div className="col-sm-8 col-sm-offset-2">
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3>Log in </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.submitLogin}>
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.handleInputChange}
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

{
  /* <div className="ui container">
        <div className="ui middle aligned center aligned grid">
          <div className="ui column">
            <h2 className="ui teal image header">
              <div className="content">Log Into your account</div>
            </h2>
            <form className="ui form" onSubmit={this.submitLogin}>
              <div className="ui stacked segment">
                <div className="field">
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input
                      type="text"
                      name="name"
                      placeholder="User name"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="ui left icon input">
                    <i className="lock icon"></i>
                    <input
                      type="password"
                      name="password"
                      placeholder="PassWord"
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>

                <div className="ui fluid large teal submit button">Login</div>
              </div>
            </form>
          </div>
        </div>
      </div> */
}
