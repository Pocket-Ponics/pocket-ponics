import React, { useState } from 'react'
import Spacer from 'react-add-space';
import { render } from 'react-dom';
import ApiUtil from './util/api-util'
import token from './util/api-util'

export function Admin(props){


  const [name, setName] = useState('');
  const [cycle_time, setCycle_time] = useState("");
  const [light_time, setLight_time] = useState("");
  const [steps, setSteps] = useState("");
  const [hsteps, setHsteps] = useState("");
  const [ph_level_low, setPh_level_low] = useState("");
  const [ph_level_high, setPh_level_high] = useState("");
  const [ec_level_low, setEc_level_low] = useState("");
  const [ec_level_high, setEc_level_high] = useState("");
  const [temp_low, setTemp_low] = useState("");
  const [temp_high, setTemp_high] = useState("");
  const [plant_url, setPlant_url] = useState("");
  const [harvest_url, setHarvest_url] = useState("");
  //const [num_plants, setNum_plants] = useState("0");



  function handleSubmit(event) {
    event.preventDefault();
    console.log("here")
    return ApiUtil.createPlantIdeal(token, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, steps, plant_url, harvest_url)
  } 

  return(
    <form onSubmit={handleSubmit}>
      <label> Plant name: </label>
        <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}/><br /><br />

      <label> Cycle time (days): </label>
        <input type="text" cycle_time="cycle_time" value={cycle_time} onChange={event => setCycle_time(event.target.value)}/><Spacer amount={40} />

      <label> Ideal light time (mins/day): </label>
        <input type="text" light_time="light_time" value={light_time} onChange={event => setLight_time(event.target.value)}/><br /><br />
      
      <label> Translocation steps: </label>
        <input type="text" steps="steps" value={steps} onChange={event => setSteps(event.target.value)}/><Spacer amount={38} />

      <label> Harvesting steps: </label>
        <input type="text" steps="Hsteps" value={hsteps} onChange={event => setHsteps(event.target.value)}/><br /><br />

      <label> Low ph: </label>
        <input type="text" ph_level_low="ph_level_low" value={ph_level_low} onChange={event => setPh_level_low(event.target.value)}/><Spacer amount={60} />

      <label> High ph:</label>
        <input type="text" ph_level_high="ph_level_high" value={ph_level_high} onChange={event => setPh_level_high(event.target.value)}/><br /><br />

      <label> Low ec: </label>
        <input type="text" ec_level_low="ec_level_low" value={ec_level_low} onChange={event => setEc_level_low(event.target.value)}/><Spacer amount={60} />

      <label> High ec:</label>
        <input type="text" ec_level_high="ec_level_high" value={ec_level_high} onChange={event => setEc_level_high(event.target.value)}/><br /><br />

      <label> Low temp:</label>
      <input type="text" temp_low="temp_low" value={temp_low} onChange={event => setTemp_low(event.target.value)} /><Spacer amount={55} />

      <label> High temp: </label>
        <input type="text" temp_high="temp_high" value={temp_high} onChange={event => setTemp_high(event.target.value)}/><br /><br />
        
      <label> Plant url: </label>
        <input type="text" plant_url="plant_url" value={plant_url} onChange={event => setPlant_url(event.target.value)} /><Spacer amount={58} />

      <label> Harvest url:</label>
        <input type="text" harvest_url="harvest_url" value={harvest_url} onChange={event => setHarvest_url(event.target.value)} /><br />
      <input type="submit" value="Submit" />
    </form>
  );
}
render(<Admin />, document.getElementById('root'));
