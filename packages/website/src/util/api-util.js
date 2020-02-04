import base64 from 'base-64'
import { Notifications } from 'expo'

const host = 'ec2-18-191-221-89.us-east-2.compute.amazonaws.com'
const port = '8080'

const greenPort = '80'

const APIUtil = {
	processTextResults(res) {
		return Promise.resolve(res.text())
	},
	urlEncode(object) {
		var url = []
		for (var property in object) {
			var encodedKey = encodeURIComponent(property)
			var encodedValue = encodeURIComponent(object[property])
			url.push(encodedKey + '=' + encodedValue)
		}
		return url.join('&')
	},
	timeoutFetch(ms, promise) {
		return new Promise((resolve, reject) => {
			const timeoutId = setTimeout(() => {
				reject(new Error('API timeout'))
			}, ms)
			promise.then(
				(res) => {
					clearTimeout(timeoutId)
					resolve(res)
				},
				(err) => {
					clearTimeout(timeoutId)
					reject(err)
				}
			)
		})
	},
	getAuthToken(username, password) {
		return APIUtil.timeoutFetch(10000, fetch(`http://${host}:${port}/auth/get_token`, {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Basic ' + base64.encode(`${username}:${password}`),
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => JSON.parse(result))
	},
	createUser(email, password) {
		const encode = APIUtil.urlEncode({ email, password })
		return APIUtil.timeoutFetch(10000, fetch(`http://${host}:${port}/auth/create_user`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: encode,
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => {console.log(result); return JSON.parse(result)})
	},
	get(endpoint, token, body) {
		return APIUtil.timeoutFetch(10000, fetch(endpoint, {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => JSON.parse(result))
	},
	sendWifiData(body) {
		return APIUtil.timeoutFetch(10000, fetch(`http://${greenhouse}:${greenPort}/wifi/login`, {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify(body)
		}))
			.then(response => response.text())
			.then(result => JSON.parse(result))
	},
	setDeviceKey(token) {
		return Notifications.getExpoPushTokenAsync()
			.then(device_key => {
				APIUtil.post(`http://${host}:${port}/mobileapp/devices`, token, {
					device_key
				})
			})
	},
	changePassword(token, email, old_password, new_password) {
		return APIUtil.post(`http://${host}:${port}/auth/change_password`, token, {
			email,
			old_password,
			new_password
		})
	}
}

export default APIUtil