import { createStore, combineReducers } from 'redux';
// From lecture notes

function users(state = [], action) {
    switch (action.type) {
    case 'users/set':
        return action.data;
    default:
        return state;
    }
}

function events(state = [], action) {
    switch (action.type) {
      case 'events/set':
        return action.data;
      default:
        return state;
    }
  }

function comments(state = [], action) {
    switch (action.type) {
      case 'comments/set':
        return action.data;
      default:
        return state;
    }
  }

function event(state = [], action) {
    switch (action.type) {
      case 'event/set':
        return action.data;
      default:
        return state;
    }
  }

  function user(state = [], action) {
    switch (action.type) {
      case 'user/set':
        return action.data;
      default:
        return state;
    }
  }

  function invites(state = [], action) {
    switch (action.type) {
      case 'invites/set':
        return action.data;
      default:
        return state;
    }
  }

  function save_session(sess) {
    let session = Object.assign({}, sess, {time: Date.now()});
    localStorage.setItem("session", JSON.stringify(session));
  }
  
  function restore_session() {
    let session = localStorage.getItem("session");
    if (!session) {
      return null;
    }
    session = JSON.parse(session);
    let age = Date.now() - session.time;
    let hours = 60 * 60 * 1000;
    if (age < 24 * hours) {
      return session;
    }
    else {
      return null;
    }
  }

  function session(state = restore_session(), action) {
    switch (action.type) {
      case 'session/set':
        save_session(action.data);
        return action.data;
      case 'session/clear':
        return null;
      default:
        return state;
    }
  }

  function error(state = null, action) {
    switch (action.type) {
      case 'session/set':
        return null;
      case 'error/set':
        return action.data;
      default:
        return state;
    }
  }

function root_reducer(state, action) {
    console.log("root_reducer", state, action);
    let reducer = combineReducers({
        users, events, event, session, error, comments, invites, user,
    });
    return reducer(state, action);
}

let store = createStore(root_reducer);
export default store;