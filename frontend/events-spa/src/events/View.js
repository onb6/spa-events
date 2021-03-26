import { Row, Col, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import CommentsForm from '../comments/Form';
import CommentsList from '../comments/List';
import { fetch_event_by_id } from '../api';
import InvitesForm from '../invites/Form'
import InvitesList from '../invites/List'
import InvitesRSVP from '../invites/RSVP'

import { useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function SingleEventView({event, session}) {
    let history = useHistory();
    const { id } = useParams();

    useEffect(() => fetch_event_by_id(id), [id])

    console.log(event);
    console.log(session);

    return (
        <Row>
          <Col>
            <Row>
              <h2>{event.event_name}</h2>
            </Row>
            <Row>
              <p> {event.date}, {event.time}</p>
            </Row>
            <Row>
              <p> {event.description }</p>
            </Row>
            <Row>
              <Button onClick={() => history.push("/")} 
                      variant="outline-primary">
                Back
              </Button>
              <Button variant="outline-success">
                Edit
              </Button>
            </Row>
          </Col>
          <Col >
            <Row>
            <h4>Invites</h4>
            </Row>
            {event.user_id === session.user_id ?
              <>
              <Row>
                <InvitesForm event_id={event.id} />
              </Row>
              <Row>
                <p><strong>Responses:</strong> {event.yes} Yes, {event.no} No, {event.maybe} Maybe, {event.nr} Not Responded</p>
              </Row>
              </>
              :
              <>
              <Row>
                 <p>RSVP:</p>
              </Row>
              <Row>
                <InvitesRSVP event_id={event.id} />
              </Row>
              </>
            } 
            <Row>
            <InvitesList event_id={event.id} />
            </Row>
          </Col>
          <Col>
            <Row>
              <h4>Comments</h4>
            </Row>
            <Row>
              <CommentsForm event_id={event.id} />
            </Row>
            <Row>
              <CommentsList event_id={event.id} />
            </Row>
          </Col>
        </Row>
      );
}

function state2props({event, session}) {
  return { event, session };
}

export default connect(state2props)(SingleEventView);

