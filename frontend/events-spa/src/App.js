import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import "./App.scss";
import UsersList from "./users/List";
import UsersNew from "./users/New";
import Nav from "./Nav";
import EventsList from "./events/List";
import EventsNew from "./events/New";
import SingleEventView from './events/View';

function App() {
  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <EventsList />
        </Route>
        <Route path="/events/" exact>
          <EventsList/>
        </Route>
        <Route path="/events/new" exact>
          <EventsNew/>
        </Route>
        <Route path="/events/:id" exact>
          <SingleEventView />
        </Route>
        <Route path="/users" exact>
          <UsersList />
        </Route>
        <Route path="/users/new">
          <UsersNew />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;