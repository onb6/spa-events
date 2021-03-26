import { Table, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

function CommentsList({comments, session, event_id}) { 

console.log(comments)

  let event_comments = comments.filter(c => c.event_id === event_id)

  let commentsRows = event_comments.map((comment) => (
    <tr key={comment.id}>
        <td>{comment.user_id}</td>
        <td>{comment.body}</td>
        {comment.user_id === session.user_id ? 
        <Button variant="outline-danger" onClick={() => deleteComment(comment.id)}>Delete</Button> : <td></td>}
    </tr>
  ));

  return (
    <Table striped>
      <tbody> 
        {commentsRows}
      </tbody>
    </Table>
  );
}

function state2props({comments, session}) {
    return { comments, session };
}

function deleteComment(id) {

}

export default connect(state2props)(CommentsList);
