import React, { useState } from "react";
import { Component } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { render } from 'react-dom';
import "./Login.css";
//import authController from '../../util/authController';


export function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
   event.preventDefault();
   window.location.href="http://localhost:3000/Admin";
  }

  return (
    <div className="Login">
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

/*export class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      loading: false
    }

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.login = this.login.bind(this)
  }

  onChangeUsername(username) {
    this.setState({ username })
  }

  onChangePassword(password) {
    this.setState({ password })
  }

  login() {
    if(this.state.username === '' || this.state.password === ''){
      Alert.alert('Invalid username or password')
      return
    }

    this.setState({ loading: true })

    return AuthUtil.login(this.state.username, this.state.password, () => this.props.navigation.navigate('Admin'))
  }

  render() {
    return (
      <KeyboardAvoidingView>

          <View>
            <TextInput
              style={styles.input}
              placeholder={'Email Address'}
              value={this.state.username}
              onChangeText={this.onChangeUsername}
              autoCapitalize="none"
              textContentType="emailAddress"/>
          </View>
            <TextInput
              style={styles.input}
              placeholder={'Password'}
              value={this.state.password}
              onChangeText={this.onChangePassword}
              autoCapitalize="none"
              textContentType="password"
              secureTextEntry={true}
              onSubmitEditing={this.login}/>
          <TouchableOpacity onPress={this.login}>
            <Text style={styles.button}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signUp}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Reset')}>
            <Text style={styles.signUp}>Reset Password</Text>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

export default Login*/