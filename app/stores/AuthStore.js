import Dispatcher from '../dispatcher/Dispatcher'
import { EventEmitter } from 'events'
import assign from 'object-assign'

const CHANGE_EVENT = 'change',
      LOGIN_EVENT = 'login',
      SIGNUP_EVENT = 'signup',
      SESSION_EVENT = 'session';

var _store = {};

var AuthStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  getSession: function() {
    return _store;
  }
});

export { AuthStore };

Dispatcher.register(function(payload){
  switch(payload.actionType) {
    case 'ACTION_PENDING':
      AuthStore.emit(CHANGE_EVENT);
      break;
    case 'ACTION_LOGIN':
      _store.session.push(payload.response);
      AuthStore.emit(LOGIN_EVENT);
      break;
    case 'ACTION_SIGNUP':
      console.log(payload);
      _store = payload.response;
      AuthStore.emit(CHANGE_EVENT);
      break;
    case 'ACTION_GET_SESSION':
      console.log(payload.response.body);
      _store.session = payload.response.body;
      AuthStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});
