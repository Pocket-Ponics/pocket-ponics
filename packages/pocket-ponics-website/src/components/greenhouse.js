import React, { Component } from 'react'
import tier from '../assets/tier.png';
import spinach from '../assets/spinach.png'
import '../css/greenhouse.css'

export default class Greenhouse extends Component {
  render() {
    return (
      <div className='greenhouse'>
          <div className='tier-plants'>
            <img src={spinach} className="tier-plant"/>
            <img src={spinach} className="tier-plant"/>
            <img src={spinach} className="tier-plant"/>
          </div>
        <img src={tier} className="tier"/>
      </div>
    )
  }
}