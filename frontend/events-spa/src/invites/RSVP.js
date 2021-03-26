import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useState, useEffect } from 'react'
import { update_invite, fetch_invites, fetch_user_by_id } from '../api';
import { connect } from 'react-redux';

function InvitesRSVP({ event_id, session, invites, user }) { 

    const [invite, setInvite] = useState(null);
    const [radioValue, setRadioValue] = useState(null);

    useEffect(() => fetch_invites(), [event_id]);
    useEffect(() => setInvite(findInvite(session.user_id, event_id, invites)), [session]);
    
    function onChange() {
        console.log(radioValue);
        update_invite(invite, getResponse(radioValue))
        fetch_invites();
    }

    function findInvite(user_id, event_id, invites) {
        fetch_user_by_id(user_id);
        let invite = invites.find(i => (i.email === user.email) && (i.event_id === event_id))
        return invite;
    }
  
    return (
        <ButtonGroup toggle onChange={onChange} size="lg" name="rsvp-containter" aria-label="Basic example">
            <ToggleButton
                type="radio"
                variant="outline-success"
                name="response"
                value="yes"
                checked={radioValue === "yes"}
                onChange={(e) => setRadioValue("yes")}>
                    Yes
            </ToggleButton>
            <ToggleButton
                type="radio"
                variant="outline-danger"
                name="response"
                value="no"
                checked={radioValue === "no"}
                onChange={(e) => setRadioValue("no")}>
                    No
            </ToggleButton>
            <ToggleButton
                type="radio"
                variant="outline-warning"
                name="response"
                value="maybe"
                checked={radioValue === "maybe"}
                onChange={(e) => setRadioValue("maybe")}>
                    Maybe
            </ToggleButton>
        </ButtonGroup>
    );
  }

  function state2props({ session, invites, user }) {
    return { session, invites, user };
}

function getResponse(val) {
    if (val === "yes") {
        return 1; 
    } else if (val === "no") {
        return 0; 
    } else if (val === "maybe") {
        return 2; 
    } else {
        return -1;
    }
}



export default connect(state2props)(InvitesRSVP);