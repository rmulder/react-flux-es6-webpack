import React from 'react'
import { AuthActions } from '../actions/AuthActions'
import { AuthStore } from '../stores/AuthStore'

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.signup = this.signup.bind(this);
  }
  signup(e) {
    e.preventDefault();
    AuthActions.signup(this.state.username, this.state.password);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="row">
        <form className="col l4 offset-l4">
          <div className="row">
            <div className="input-field col l12">
              <input placeholder="username" id="username" name="username" type="text" className="validate" onChange={this.onChange} />
            </div>
            <div className="input-field col l12">
              <input placeholder="password" id="password" name="password" type="password" className="validate" onChange={this.onChange} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col l12">
              <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.signup}>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
