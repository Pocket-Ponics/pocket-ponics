import React from 'react'
import Spacer from 'react-add-space';


export const Admin = () => (
<form>
  <label> Plant name:
    <input type="text" name="name" />
  </label>

      <p> </p>

  <label> Cycle time (days):
    <input type="text" cycle_time="cycle_time" />
  </label> <Spacer amount={41} />
  <label> Ideal light time (mins/day):
    <input type="text" light_time="light_time" />
  </label>

    <p> </p>

  <label> Translocation steps:
    <input type="text" steps="Tsteps" />
  </label><Spacer amount={38} />
  <label> Harvesting steps:
    <input type="text" steps="Hsteps" />
  </label>

   <p> </p>

  <label> Low ph:
    <input type="text" ph_level_low="ph_level_low" />
  </label> <Spacer amount={60} />
  <label> High ph:
    <input type="text" ph_level_high="ph_level_high" />
  </label>

    <p> </p>

  <label> Low ec:
    <input type="text" ec_level_low="ec_level_low" />
  </label> <Spacer amount={60} />
  <label> High ec:
    <input type="text" ec_level_high="ec_level_high" />
  </label>

    <p> </p>

  <label> Low temp:
  <input type="text" temp_low="temp_low" />
  </label> <Spacer amount={55} />
  <label> High temp:
    <input type="text" temp_high="temp_high" />
  </label>



    <p> </p>

    <label> Plant url:
    <input type="text" plant_url="plant_url" />
  </label> <Spacer amount={58} />
<label> Harvest url:
    <input type="text" harvest_url="harvest_url" />
  </label>
    <p> </p>

<input type="submit" value="Submit" />
</form>
)