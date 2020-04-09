import React from 'react';
import { render } from 'react-dom';
import ApiUtil from './util/api-util';
import { AdminHome from './components/AdminHome/AdminHome';


export function displayplants(token) {

		
		const promise = getData()
		promise.then(successCallback, failureCallback)
		console.log(promise)

		function successCallback(result) {
			console.log("Audio file ready at URL: ", result);
			return AdminHome(result)
		}

		function failureCallback(error) {
			console.error("Error generating audio file: " + error);
		}


		async function getData() {
			console.log('logging');
	  		const plants = await ApiUtil.getPlants(token)
	  		console.log(plants)
	  		console.log(plants.length)

		    for(let i = 0; i < plants.length; i++)
		    {
		        console.log(plants[i].name)
		    }
		    return plants
	  	}

}


export default displayplants;