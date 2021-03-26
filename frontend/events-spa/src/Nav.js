// from lecture notes 
import { Nav, Row, Col, Form,
         Button, Alert, Navbar, Modal } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useState } from 'react';
import store from './store';
import { api_login } from './api.js'

function SessionInfo({session}) {
  let history = useHistory();

  function logout(ev) {
    ev.preventDefault();
    history.push("/");
    store.dispatch({ type: 'session/clear' });
  }

  return (
    <p>
      My profile: {session.name} |
      <Button variant="outline-primary" onClick={logout}>Logout</Button>
    </p>
  );
}

function LoginModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    function on_submit(ev) {
        ev.preventDefault();
        api_login(name, pass);
    }

    return (
    <>
            <Nav>
                <Nav.Item >
                <Button variant="outline-primary" onClick={handleShow}>
                    Login
                </Button>
                </Nav.Item>
                <Nav.Item >
                    <Link to="/users/new">Sign Up!</Link>
                </Nav.Item>
            </Nav>

        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={on_submit}>
            <Form.Label>Username:</Form.Label>
            <Form.Control name="name"
                            type="text"
                            onChange={(ev) => setName(ev.target.value)}
                            value={name} />
            <Form.Label>Password</Form.Label>
            <Form.Control name="password"
                            type="password"
                            onChange={(ev) => setPass(ev.target.value)}
                            value={pass} />
            <Button variant="outline-primary" type="submit">
                Login
            </Button>
            </Form>
        </Modal.Body>
        </Modal>
    </>
    );
}

function LOI({session}) {
  if (session) {
    return <SessionInfo session={session} />;
  }
  else {
    return <LoginModal />;
  }
}

const LoginOrInfo = connect(
  ({session}) => ({session}))(LOI);

function Link({to, children}) {
  return (
      <NavLink to={to} exact className="nav-link"
               activeClassName="active">
        {children}
      </NavLink>
  );
}

function AppNav({error}) {
  let error_row = null;

  if (error) {
    error_row = (
      <Row>
        <Col>
          <Alert variant="danger">{error}</Alert>
        </Col>
      </Row>
    );
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" className="justify-content-between">
          <Nav.Item>
          <Nav variant="pills">
            <Link to="/">Events</Link>
            <Link to="/users">Users</Link>
          </Nav>
          </Nav.Item>
          <Nav.Item>
          <LoginOrInfo />
        </Nav.Item>

        
      </Navbar>
      { error_row }
    </div>
  );
}

export default connect(({error}) => ({error}))(AppNav);
