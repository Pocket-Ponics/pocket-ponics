import React, { useState } from "react";
import { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { render } from 'react-dom';
import APIUtil from '../../util/api-util';
import "./Login.css";
import Spacer from 'react-add-space';
//import authController from '../../util/authController';


export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
   event.preventDefault();
   APIUtil.getAuthToken(username, password)
    .then(response => {
      //save auth tocken
      console.log('Success')
      window.location.href="http://localhost:3000/Admin";
    })
    .catch(error =>{
      //error page
      console.log('bad');
    })

   
  }

  return (
    <div className="Login">
    <h2>   * * * * * * * * * * * * * * * * * * * Administrators Only * * * * * * * * * * * * * * * * * * *</h2>
    <p></p>

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
render(<Login />, document.getElementById('root'));