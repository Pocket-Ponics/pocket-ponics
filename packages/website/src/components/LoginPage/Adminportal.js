import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { render } from 'react-dom';
import "./Adminportal.css";
import AuthUtil from '../../util/auth-util'

export function Adminportal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    return AuthUtil.login(username, password, () => this.props.navigation.navigate('Admin'))
  }

  return (
    <div className="Adminportal">
    <center><h1>For Administrator Use Only</h1> </center>
    <br />

      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
render(<Adminportal />, document.getElementById('root'));