import React, { useState } from 'react'
import Spacer from 'react-add-space';
import { render } from 'react-dom';
import ApiUtil from './util/api-util'
//import token from './util/api-util'

const host = '10.171.204.187'
const port = '8080'

const waitingTime = 15000

export function adminplant(item){
  const plant = localStorage.getItem('plant')
  
  getData()
  const plant_id = localStorage.getItem('id')
  


  const cycle = localStorage.getItem('cycle_time')
  const light = localStorage.getItem('light_time')
  const step = localStorage.getItem('steps')
  const hstep = localStorage.getItem('hsteps')
  const phlow = localStorage.getItem('ph_level_low')
  const phhigh = localStorage.getItem('ph_level_high')
  const eclow = localStorage.getItem('ec_level_low')
  const echigh = localStorage.getItem('ec_level_high')
  const templow = localStorage.getItem('temp_low')
  const temphigh = localStorage.getItem('temp_high')
  const planturl = localStorage.getItem('plant_url')
  const harvesturl = localStorage.getItem('harvest_url')
  const numplant = localStorage.getItem('num_plants')

  const [name, setName] = useState(plant);
  const [cycle_time, setCycle_time] = useState(cycle);
  const [light_time, setLight_time] = useState(light);
  const [steps, setSteps] = useState(step);
  const [hsteps, setHsteps] = useState(hstep);
  const [ph_level_low, setPh_level_low] = useState(phlow);
  const [ph_level_high, setPh_level_high] = useState(phhigh);
  const [ec_level_low, setEc_level_low] = useState(eclow);
  const [ec_level_high, setEc_level_high] = useState(echigh);
  const [temp_low, setTemp_low] = useState(templow);
  const [temp_high, setTemp_high] = useState(temphigh);
  const [plant_url, setPlant_url] = useState(planturl);
  const [harvest_url, setHarvest_url] = useState(harvesturl);
  const [num_plants, setNum_plants] = useState(numplant);
  const token = localStorage.getItem('token')



async function getData() {
  const id = localStorage.getItem('i')
  console.log('logging');
    const plants = await ApiUtil.getPlants(token)
      console.log(id)
      console.log(plants[id].cycle_time)
      localStorage.setItem('cycle_time', plants[id].cycle_time)
      localStorage.setItem('light_time', plants[id].light_time)
      localStorage.setItem('steps', plants[id].steps)
      localStorage.setItem('hsteps', plants[id].hsteps)
      localStorage.setItem('ph_level_low', plants[id].ph_level_low)
      localStorage.setItem('ph_level_high', plants[id].ph_level_high)
      localStorage.setItem('temp_low', plants[id].temp_low)
      localStorage.setItem('ec_level_low', plants[id].ec_level_low)
      localStorage.setItem('ec_level_high', plants[id].ec_level_high)
      localStorage.setItem('temp_high', plants[id].temp_high)
      localStorage.setItem('plant_url', plants[id].plant_url)
      localStorage.setItem('harvest_url', plants[id].harvest_url)
      localStorage.setItem('num_plants', plants[id].num_plants)
      localStorage.setItem('cycle_time', plants[id].cycle_time)
      
      
}

function handleDel(){
  console.log("del1", token)


    return ApiUtil.delete(token, plant_id)
}
function handleCancel(){
  localStorage.removeItem("cycle_time");

    return window.location.href="http://localhost:3000/AdminHome"
}

  function handleSubmit(event) {
    console.log("submit")
    event.preventDefault();
    console.log(token, ph_level_low, ec_level_low, temp_low, cycle_time, ph_level_high, ec_level_high, temp_high, name, light_time, steps, plant_url, harvest_url, num_plants)
    return ApiUtil.put(`http://${host}:${port}/adminportal/:${plant_id}`, token, {
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
        num_plants})
  } 

  return(
<ul>
    <form onSubmit={handleSubmit}>
      <label> Plant name: </label>
        <input type="text" name="name" value={name} onChange={event => setName(event.target.value)}/><Spacer amount={51} />

      <label> Number of plants: </label>
        <input type="text" num_plants="num_plants" value={num_plants} onChange={event => setNum_plants(event.target.value)}/><br /><br />

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
        <input type="text" harvest_url="harvest_url" value={harvest_url} onChange={event => setHarvest_url(event.target.value)} /><br /><br />

      <input type="submit" value="Update Plant" />

    </form>
    <button onClick={() => handleDel()}>
  Delete
</button>
<button onClick={() => handleCancel()}>
  Cancel
</button>
</ul>


    
  );
}
render(<adminplant />, document.getElementById('root'));
