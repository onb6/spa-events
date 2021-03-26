// From lecture notes
import store from './store';

export async function api_get(path) {
    let text = await fetch("http://events-spa-backend.onb6.fun/api/v1" + path, {});
    let resp = await text.json();
    return resp.data;
}

async function api_post(path, data) {
    let opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
    let text = await fetch(
      "http://events-spa-backend.onb6.fun/api/v1" + path, opts);
    return await text.json();
}

export function api_login(name, password) {
    api_post("/session", {name, password}).then((data) => {
      console.log("login resp", data);
      if (data.session) {
        let action = {
          type: 'session/set',
          data: data.session,
        }
        store.dispatch(action);
      }
      else if (data.error) {
        let action = {
          type: 'error/set',
          data: data.error,
        };
        store.dispatch(action);
      }
    });
}

export function create_user(user) {
    return api_post("/users", {user});
  }

export function fetch_users() {
    api_get("/users").then((data) => store.dispatch({
        type: 'users/set',
        data: data,
    }));
}

export function fetch_comments() {
  api_get("/comments").then((data) => store.dispatch({
      type: 'comments/set',
      data: data,
  }));
}

export function fetch_invites() {
  api_get("/invites").then((data) => store.dispatch({
      type: 'invites/set',
      data: data,
  }));
}

export async function create_comment(comment) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();

  data.append("comment[event_id]", comment.event_id);
  data.append("comment[body]", comment.body);

  let opts = {
    method: 'POST',
    headers: {
      'x-auth': token,
    },
    body: data,
  };
  let text = await fetch(
    "http://events-spa-backend.onb6.fun/api/v1/comments", opts);
  return await text.json();
}

export async function create_invite(invite) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();

  data.append("invite[event_id]", invite.event_id);
  data.append("invite[email]", invite.email);
  data.append("invite[response]", -1);

  let opts = {
    method: 'POST',
    headers: {
      'x-auth': token,
    },
    body: data,
  };
  let text = await fetch(
    "http://events-spa-backend.onb6.fun/api/v1/invites", opts);
  return await text.json();
}

export async function update_invite(invite, response) {
  let state = store.getState();
  let token = state?.session?.token;
  console.log("invite" + invite)

  let data = new FormData();

  data.append("invite[event_id]", invite.event_id);
  data.append("invite[email]", invite.email);
  data.append("invite[response]", response);

  let opts = {
    method: 'PATCH',
    headers: {
      'x-auth': token,
    },
    body: data,
  };
  let text = await fetch(
    "http://events-spa-backend.onb6.fun/api/v1/invites/" + invite.id, opts);
  return await text.json();
}

export async function create_event(event) {
  let state = store.getState();
  let token = state?.session?.token;

  let data = new FormData();

  data.append("event[event_name]", event.event_name);
  data.append("event[description]", event.description);
  data.append("event[date]", event.date); 
  data.append("event[time]", event.time);

  let opts = {
    method: 'POST',
    headers: {
      'x-auth': token,
    },
    body: data,
  };
  let text = await fetch(
    "http://events-spa-backend.onb6.fun/api/v1/events", opts);
  return await text.json();
}

export function fetch_events() {
    api_get("/events").then((data) => store.dispatch({
        type: 'events/set',
        data: data,
    }));
}

export function fetch_event_by_id(id) {
  api_get("/events/" + id).then((data) => store.dispatch({
    type: 'event/set',
    data: data,
  }));
}

export function fetch_user_by_id(id) {
  api_get("/users/" + id).then((data) => store.dispatch({
    type: 'user/set',
    data: data,
  }));
}

export function load_defaults() {
    fetch_users();
    fetch_events();
    fetch_comments();
    fetch_invites();
}

