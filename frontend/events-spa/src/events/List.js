import { Table, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';



function EventsList({events, session}) { 

  let history = useHistory();

  let eventsRows = events.map((event) => (
    <tr key={event.id}>
        <td>{event.user_id}</td>
        <Link to="/events/" id={event.id}>{event.event_name}</Link>
        <td>{event.date}</td>
        <td>{event.time}</td>
        <td>Delete, Edit, View </td>
    </tr>
  ));

  return (
    <div>
        <Row>
            <Col>
                {session ? 
                <>
                <h2>My Events!</h2>
                <Button onClick={() => history.push("/events/new")} variant="outline-success">Create New Event</Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Owner</th>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {eventsRows}
                    </tbody>
                </Table>
                </>
                    :
                    
                    <h2>Log in to see your events!</h2>
                    
                }
            </Col>
        </Row>
    </div>

  );
}

function state2props({events, session}) {
    return { events, session };
}

function Link({to, id, children}) {
    return (
        <NavLink to={to + id} exact className="nav-link"
                 activeClassName="active">
          {children}
        </NavLink>
    );
  }


export default connect(state2props)(EventsList);
