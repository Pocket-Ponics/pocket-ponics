import React, {useState} from 'react';
import { render } from 'react-dom';
import ApiUtil from './util/api-util';
import ReactDOM from 'react-dom';

export function AdminHome() {
const token = localStorage.getItem('token')
getData()

	async function getData() {
		console.log('logging');
  		const test = await ApiUtil.getPlants(token)
  		console.log(test)
  		console.log(test.length)
  		console.log(test[0].name)

	    for(let i = 0; i < test.length; i++)
	    {
	        console.log(test[i].name)

	    }
  		return test
  	}


return <p>hi</p>
}

