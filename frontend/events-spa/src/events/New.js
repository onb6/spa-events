// From lecture notes
import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

import { create_event, fetch_events, fetch_users } from '../api';

function EventsNew() {

  let history = useHistory();
  const [event, setEvent] = useState(
    { 
        event_name: "", 
        description: "", 
        date: "", 
        time: "", 
    });

  function update(field, ev) {
    let e1 = Object.assign({}, event);
    e1[field] = ev.target.value;
    setEvent(e1);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    console.log(event);

    create_event(event).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_events();
        fetch_users();
      }
    });
  }

  return (
    <Row>
      <Col>
        <h2>Create Event</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Event Name</Form.Label>
            <Form.Control type="text"
                          onChange={(ev) => update("event_name", ev)}
                          value={event.event_name || ""} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="text"
                          onChange={(ev) => update("description", ev)}
                          value={event.description || ""} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date"
                          onChange={(ev) => update("date", ev)}
                          value={event.date || ""} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Time</Form.Label>
            <Form.Control type="time"
                          onChange={(ev) => update("time", ev)}
                          value={event.time || ""} />
          </Form.Group>
          <Button variant="outline-success"
                  type="submit">
            Create
          </Button>
          <Button onClick={() => history.push("/")} 
                  variant="outline-primary">
            Back
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

function state2props() {
  return {};
}

export default connect(state2props)(EventsNew);