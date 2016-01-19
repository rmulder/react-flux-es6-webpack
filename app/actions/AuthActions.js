import Dispatcher from '../dispatcher/Dispatcher'
import request from 'superagent';

var AuthActions = {
  /**
   * @param  {string} email
   * @param  {string} password
   */
  login: function(email, password) {
    Dispatcher.dispatch({
      actionType: 'ACTION_PENDING'
    });
    request.post('/login')
      .send({ email: email, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);

        console.log('ACTION_LOGIN');
        Dispatcher.dispatch({
          actionType: 'ACTION_LOGIN',
          response: res
        });
      });
  },
  /**
   * @param  {string} email
   * @param  {string} password
   */
  signup: function(username, password) {
    Dispatcher.dispatch({
      actionType: 'ACTION_PENDING'
    });
    request.post('/users')
      .send({ username: username, password: password })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);

        console.log('ACTION_SIGNUP');
        Dispatcher.dispatch({
          actionType: 'ACTION_SIGNUP',
          response: res
        });
      });
  },
  getSession: function () {
    Dispatcher.dispatch({
      actionType: 'ACTION_PENDING'
    });
    request.get('/session')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);

        console.log('ACTION_GET_SESSION');
        Dispatcher.dispatch({
          actionType: 'ACTION_GET_SESSION',
          response: res
        });
      });
  }
};

export { AuthActions };
