import React from 'react'

export default class LogIn extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }
  login(e) {
    e.preventDefault();
    console.log(this.state);
    //AuthActions.signup(this.state.email, this.state.password);
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
              <input placeholder="email" id="email" name="email" type="email" className="validate" onChange={this.onChange} />
            </div>
            <div className="input-field col l12">
              <input placeholder="password" id="password" name="password" type="password" className="validate" onChange={this.onChange} />
            </div>
          </div>
          <div className="row">
            <div className="input-field col l12">
              <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.login}>Log In</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
