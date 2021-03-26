import { Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { fetch_invites, create_invite, fetch_event_by_id } from '../api';
import { connect } from 'react-redux';

function InvitesForm({event_id, session}) { 

 const [email, setEmail] = useState("");
 const history = useHistory();

 useEffect(() => fetch_event_by_id(event_id), [event_id]);

  function onSubmit(ev) {
    ev.preventDefault();

    let invite = {
        email: email,
        event_id: event_id,
    };

    create_invite(invite).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/events/" + event_id);
        fetch_invites();
        fetch_event_by_id(event_id)
      }
    });

    setEmail("");
  }
  
    return (
        <>    
            <Form inline onSubmit={onSubmit} >
            <Form.Label>Email:</Form.Label>
            <Form.Control name="email"
                            type="text"
                            onChange={(ev) => setEmail(ev.target.value)}
                            value={email} />
            <Button variant="outline-primary" type="submit">
                Invite
            </Button>
            <p><strong>Invite Link:</strong> {"events-spa.onb6.fun/events/" + event_id}</p>
            </Form>
        </>
    );
  }

  function state2props({session}) {
    return { session };
}

export default connect(state2props)(InvitesForm);