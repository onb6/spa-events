import { Form, Button } from 'react-bootstrap';
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { create_comment, fetch_comments } from '../api';

function CommentsForm({event_id}) { 

 const [body, setBody] = useState("");
 const history = useHistory();

  function onSubmit(ev) {
    ev.preventDefault();

    let comment = {
        body: body,
        event_id: event_id,
    };

    create_comment(comment).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/events/" + event_id);
        fetch_comments();
      }
    });

    setBody("");
  }
  
    return (
        <Form inline onSubmit={onSubmit} >
            <Form.Label>Comment:</Form.Label>
            <Form.Control name="body"
                            type="text"
                            onChange={(ev) => setBody(ev.target.value)}
                            value={body} />
            <Button variant="outline-primary" type="submit">
                Submit
            </Button>
        </Form>
    );
  }

  
export default CommentsForm;
  