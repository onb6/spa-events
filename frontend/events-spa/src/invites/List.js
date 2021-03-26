import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function InvitesList({invites, event_id}) { 

console.log(invites);
console.log(invites);

let event_invites = invites.filter(i => i.event_id === event_id)

  let invitesRows = event_invites.map((invite) => (
    <tr key={invite.id}>
        <td>{invite.email}</td>
        {invite.response === -1 && <td>No Response</td> }
        {invite.response === 0 && <td>No</td> }
        {invite.response === 1 && <td>Yes</td> }
        {invite.response === 2 && <td>No Response</td> }
    </tr>
  ));

  return (
    <Table striped>
        <thead>
            <tr>
                <th>Invitee Email</th>
                <th>Response</th>
            </tr>
        </thead>
      <tbody> 
        {invitesRows}
      </tbody>
    </Table>
  );
}

function state2props({invites}) {
    return { invites };
}

export default connect(state2props)(InvitesList);
