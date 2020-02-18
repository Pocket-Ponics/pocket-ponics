import React from 'react'
import Spacer from 'react-add-space';



export const Admin = () => (
<form>
  <label> Plant name: </label>
    <input type="text" name="name" /><br /><br />

  <label> Cycle time (days): </label>
    <input type="text" cycle_time="cycle_time" /><Spacer amount={40} />

  <label> Ideal light time (mins/day): </label>
    <input type="text" light_time="light_time" /><br /><br />
  
  <label> Translocation steps: </label>
    <input type="text" steps="Tsteps" /><Spacer amount={38} />

  <label> Harvesting steps: </label>
    <input type="text" steps="Hsteps" /><br /><br />

  <label> Low ph: </label>
    <input type="text" ph_level_low="ph_level_low" /><Spacer amount={60} />

  <label> High ph:</label>
    <input type="text" ph_level_high="ph_level_high" /><br /><br />

  <label> Low ec: </label>
    <input type="text" ec_level_low="ec_level_low" /><Spacer amount={60} />

  <label> High ec:</label>
    <input type="text" ec_level_high="ec_level_high" /><br /><br />

  <label> Low temp:</label>
  <input type="text" temp_low="temp_low" /><Spacer amount={55} />

  <label> High temp: </label>
    <input type="text" temp_high="temp_high" /><br /><br />
    
  <label> Plant url: </label>
    <input type="text" plant_url="plant_url" /><Spacer amount={58} />

  <label> Harvest url:</label>
    <input type="text" harvest_url="harvest_url" /><br />

<input type="submit" value="Submit" />
</form>
)