# Determine the light schedule from the start time and total running hours
def light_schedule(total_hours, start_time):
    # Calculate number of full cycles and length of partial cycle  
    full_cycles = int(total_hours / 5) 
    partial_cycle_time = total_hours % 5

    # Determine hours to start and stop lights
    on_schedule = []
    off_schedule = []
    start = start_time
    for r in range(0,full_cycles):
        start = start_time + 6*r
        on_schedule.append(start)
        off_schedule.append(start + 5)
    
    # If the total running time is less than a full cycle
    if(full_cycles != 0):
        start += 6

    # Add partial cycle
    on_schedule.append(start)
    off_schedule.append(start + partial_cycle_time)
    
    return [on_schedule, off_schedule]

# Determine if lights should be on or off based on schedules and current time
def light_status(on_schedule, off_schedule, current_time):
    # Traverse schedule for lights on
    for r in range(0, len(on_schedule)):
	 # If the current time within interval of start and stop times
         if(current_time >= on_schedule[r] and current_time < off_schedule[r]):
            return True
    
    return False

schedule = light_schedule(12,8) # Generate light schedule for 12 hours starting at 8 am
toggle = light_status(schedule[0], schedule[1], 24) # Determine if lights should be on based on schedule and current hour

debug = 1
if(debug):
    print(schedule)
    print(toggle)
