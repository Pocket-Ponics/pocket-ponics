import { Alert } from 'react'
import APIUtil from '../util/api-util'

const AuthUtil = {
	getAuthToken: (loggedOutFn, successFn) => {
		// Retrieve username and password from storage
		const username = localStorage.getItem('username')
		const password = localStorage.getItem('password')
		//const toket = localStorage.getToken('token')
		//console.log(username, password)
		//console.log("here")

		// If the user is logged out, direct them to the login
		if(!username || !password) {
			return loggedOutFn()
		}
	},
	login(username, password, successFn) {
		let token
		console.log("here1")
		APIUtil.getAuthToken(username, password)
			.then(response => {
				if(!response.token) {
					Alert.alert('Invalid username or password')
					return Promise.reject('Invalid username or password')
				}
				token = response.token
				return Promise.all([
					localStorage.setItem('username', username),
					localStorage.setItem('password', password),
					//localStorage.setItem('token', token)
				])
			})
			.then(() => {
				window.location.href="http://localhost:3000/Admin";

				return token
			})
			.catch(error => {
				window.alert('Incorrect Username or Password');
			})
	},
	
}

export default AuthUtil