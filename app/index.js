import {} from './styles/app.less'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, IndexRoute } from 'react-router'
import { AuthActions } from './actions/AuthActions'
import { AuthStore } from './stores/AuthStore'
import LogIn from './containers/LogIn'
import SignUp from './containers/SignUp'

export default class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>        
        <nav className="teal lighten-2">
          <div className="container nav-wrapper">
            <a href="#" className="brand-logo">React+Flux</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><Link to="login">Log In</Link></li>
              <li><Link to="signup">Sign Up</Link></li>
            </ul>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default class Home extends React.Component {
  constructor() {
    super();
    this._onChange = this._onChange.bind(this);
    AuthActions.getSession();
  }
  componentDidMount() {
    AuthStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    AuthStore.removeChangeListener(this._onChange);
  }
  render() {
    return (
      <div className="row">
        <h4 className="center-align">Home</h4>
      </div>
    );
  }
  _onChange() {
    var session = AuthStore.getSession();
    console.log('session >>>');
    console.log(session);
    this.setState(session);
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/login" component={LogIn} />
      <Route path="/signup" component={SignUp} />
    </Route>
  </Router>
), document.getElementById("wrapper"));
