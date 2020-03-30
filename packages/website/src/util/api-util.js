import base64 from 'base-64'

const host = '10.171.204.187'
const port = '8080'

const waitingTime = 15000

const APIUtil = {
	processTextResults(res) {
		return Promise.resolve(res.text())
	},
	put(endpoint, token, body) {
		console.log("endpoint:", endpoint)
		console.log("token:", token)
		console.log("body:", body)
		return APIUtil.timeoutFetch(waitingTime, fetch(endpoint, {
			method: 'PUT',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => {console.log(result); console.log(body); JSON.parse(result); window.alert(result); window.location.href="http://localhost:3000/AdminHome"})
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
		return APIUtil.timeoutFetch(10000, fetch(`http://${host}:${port}/auth/get_token_admin`, {
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
	changePassword(token, email, old_password, new_password) {
		return APIUtil.post(`http://${host}:${port}/auth/change_password`, token, {
			email,
			old_password,
			new_password
		})
	},
	createPlantIdeal(token, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, steps, plant_url, harvest_url, num_plants){
		console.log("token:", token)
		return APIUtil.post(`http://${host}:${port}/adminportal`, token,{
			ph_level_low,
		    ec_level_low,
		    temp_low,
		    cycle_time, 
		    ph_level_high, 
		    ec_level_high, 
		    temp_high, 
		    name, 
		    light_time, 
		    steps, 
		    plant_url, 
		    harvest_url,
		    num_plants
		})
	},
	
	putPlants(token, plant_id, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, steps, plant_url, harvest_url, num_plants){
		console.log("token:", token)
		return APIUtil.put(`http://${host}:${port}/adminportal/:${plant_id}`, token,{
			ph_level_low,
		    ec_level_low,
		    temp_low,
		    cycle_time, 
		    ph_level_high, 
		    ec_level_high, 
		    temp_high, 
		    name, 
		    light_time, 
		    steps, 
		    plant_url, 
		    harvest_url,
		    num_plants
		})
	},
	post(endpoint, token, body) {
		console.log("body:", body)
		return APIUtil.timeoutFetch(waitingTime, fetch(endpoint, {
			method: 'POST',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			body: APIUtil.urlEncode(body),
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => {console.log(result); console.log(body); JSON.parse(result); window.alert(result); window.location.href="http://localhost:3000/AdminHome"})

	},
	delete(token, plant_id) {
		console.log('delete', plant_id)
		let endpoint = `http://${host}:${port}/adminportal/${plant_id}`
		return APIUtil.timeoutFetch(waitingTime, fetch(endpoint, {
			method: 'DELETE',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => {console.log(result); JSON.parse(result); window.alert(result); window.location.href="http://localhost:3000/AdminHome"})

	},
	async getPlants(token) {
		return APIUtil.timeoutFetch(10000, fetch(`http://${host}:${port}/adminportal`, {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Bearer' + token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}),
			redirect: 'follow'
		}))
			.then(response => response.text())
			.then(result => JSON.parse(result))
	}

}

export default APIUtil