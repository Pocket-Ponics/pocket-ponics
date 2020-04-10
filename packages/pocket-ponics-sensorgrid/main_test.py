import serial
import time
import requests
import base64
import json
import smbus
import time

# Communication variables
startMarker = '<'
endMarker = '>'
dataStarted = False
dataBuf = ""
messageComplete = False

# Beginning of Communication functions
def setupSerial(baudRate, serialPortName):
    
    global  serialPort
    
    serialPort = serial.Serial(port= serialPortName, baudrate = baudRate, timeout=0, rtscts=True)

    print("Serial port " + serialPortName + " opened  Baudrate " + str(baudRate))

    waitForArduino()

def sendToArduino(stringToSend):
    
        # this adds the start- and end-markers before sending
    global startMarker, endMarker, serialPort
    
    stringWithMarkers = (startMarker)
    stringWithMarkers += stringToSend
    stringWithMarkers += (endMarker)

    serialPort.write(stringWithMarkers.encode('utf-8')) # encode needed for Python3

def recvLikeArduino():

    global startMarker, endMarker, serialPort, dataStarted, dataBuf, messageComplete

    if serialPort.inWaiting() > 0 and messageComplete == False:
        x = serialPort.read().decode("utf-8") # decode needed for Python3
        
        if dataStarted == True:
            if x != endMarker:
                dataBuf = dataBuf + x
            else:
                dataStarted = False
                messageComplete = True
        elif x == startMarker:
            dataBuf = ''
            dataStarted = True
    
    if (messageComplete == True):
        messageComplete = False
        return dataBuf
    else:
        return "XXX" 

def getDataFromArduino():
	arduinoReply = recvLikeArduino()
	while (arduinoReply == 'XXX'):
		arduinoReply = recvLikeArduino()
	return arduinoReply

def waitForArduino():

    # wait until the Arduino sends 'Arduino is ready' - allows time for Arduino reset
    # it also ensures that any bytes left over from a previous message are discarded
    
    print("Waiting for Arduino to reset")
     
    msg = ""
    while msg.find("Arduino is ready") == -1:
        msg = recvLikeArduino()
        if not (msg == 'XXX'): 
            print(msg)
# End of Communication Functions

# Class used to store reading data
class Readings:
	def __init__(self, ec, pH, water):
		self.ec_level = ec
		self.pH_level = pH
		self.water_level = water
		
# Desired Nutrition Value from API
class DesNutrVal:
	def __init__(self, ec_min, ec_max, pH_min, pH_max, light_start, light_time):
		self.ec_min = ec_min
		self.ec_max = ec_max
		self.pH_min = pH_min
		self.pH_max = pH_max
		self.light_start = light_start
		self.light_time = light_time
		
def jprint(obj):
	text = json.dumps(obj, sort_keys=True, indent=4)
	print(text)

host = "ec2-184-73-127-118.compute-1.amazonaws.com"
port = "8080"
serialNo = "11032020"
password = "covid-19"
	
# Get data for a specific tier from API
def getAPIData(tierNum):
	url = "http://"+host+":"+port+"/sensorgrid/adjustments/tierdata"
	getHeaders = {
		'Authorization': 'Basic ' + base64.b64encode(serialNo + ':' + password)
	}
	payload = {}
	
	response = requests.request("GET", url, headers=getHeaders, data=payload)
	jprint(response.json())
	jObject = response.json()['tiers'][tierNum-1]
	return DesNutrVal(jObject['ec_level_low'], jObject['ec_level_high'], jObject['ph_level_low'], jObject['ph_level_high'], jObject['light_start'], jObject['light_time'])

# Send API tier data
def sendAPIData(readings, tierNum):
	url = "http://"+host+":"+port+"/sensorgrid/sensor/"+str(tierNum)
	postHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + base64.b64encode(serialNo + ':' + password)
	}
	payload = 'ph_level='+str(readings.pH_level)+'&water_level='+str(readings.water_level)+'&ec_level='+str(readings.ec_level)
	
	response = requests.request("POST", url, headers=postHeaders, data=payload)
	print(response.status_code)
	jprint(response.text)
	
# Send API tier data
def sendAPIGreenhouseData(wResVal, nResVal):
	url = "http://"+host+":"+port+"/sensorgrid/sensor/greenhouse/general"
	postHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + base64.b64encode(serialNo + ':' + password)
	}
	payload = 'power_supply='+str(1)+'&backup_battery_level='+str(100)+'&water_level='+str(wResVal)+'&nutrient_level='+str(nResVal)+'&light_level='+str(100)
	
	response = requests.request("POST", url, headers=postHeaders, data=payload)
	print(response.status_code)
	jprint(response.text)
	
# Convert tier data from String to a Readings object
def parseForReadingData(data):
	splitData = data.split()
	return Readings(splitData[0], splitData[1], splitData[2])
	
# Recieve tier data from MCU
def getMCUData(tierNum):
	sendToArduino("Requesting Data")
	sendToArduino(str(tierNum))
	print("Requesting Data")
	tierData = getDataFromArduino()
	# Parse string to get EC, pH, and Water value data
	print(tierData)
	tierReading = parseForReadingData(tierData)
	return tierReading
	
def getResLevels():
	sendToArduino("Requesting Data")
	sendToArduino(str(1))
	print("Getting Reservoir data")
	resData = getDataFromArduino().split()
	print("Water Res: {}, Nutrient Res: {}".format(resData[3], resData[4]))
	return resData

# Checks the readings from all the tiers, Sends Data to API and performs the desired actions
def checkLevels(tierNum):
	tierReading = getMCUData(tierNum)
	resData = getResLevels()
	sendAPIData(tierReading, tierNum)
	apiData = getAPIData(5-tierNum)
	light_time = apiData.light_time if apiData.light_time != None else 0
	light_start = apiData.light_start if apiData.light_start != None else 0
	[onSched, offSched] = light_schedule(light_time, light_start)
	lights = on_or_off(onSched, offSched, time.localtime(time.time()).tm_hour)
	print("Tier: {}, TierReading: {}, Light Time: {}, Light Start: {}, Lights On: {}".format(tierNum,tierReading,light_time,light_start,lights))
	callMCU(tierNum, "LED", lights)
	performAction(tierReading, apiData, tierNum)

# Performs the desired actions based off of the readings
def performAction(readings, desiredRange, tierNum):
	# If nutrient level is too low and water is not at max -> Turn on nutrient pump
	if(((readings.ec_level < desiredRange.ec_min) or (readings.pH_level > desiredRange.pH_max)) and (int(readings.water_level) != 1)):
		callMCU(tierNum, "nutrientPump", 1)
		print("Nutrient level low and water is not at max")
		print("readings.ec_level {}, desiredRange.ec_max: {}, readings.pH_level: {}, desiredRange.pH_max: {}".format(readings.ec_level, desiredRange.ec_min, readings.pH_level, desiredRange.pH_max))
	# If nutrient level is high and the water level isn't at max -> Turn on water pump
	if(((readings.ec_level > desiredRange.ec_max) and (readings.pH_level < desiredRange.pH_min)) and (int(readings.water_level) != 1)):
		callMCU(tierNum, "waterPump", 1)
		print("readings.ec_level {}, desiredRange.ec_max: {}, readings.pH_level: {}, desiredRange.pH_max: {}".format(readings.ec_level, desiredRange.ec_max, readings.pH_level, desiredRange.pH_min))
		print("Nutrient level is high and water isn't at max")
		print("Water level is {}, which is too high: {}".format(readings.water_level, int(readings.water_level) == 1))
	# If water level is too low -> Turn on water pump
	if(readings.water_level == -1):
		callMCU(tierNum, "waterPump", 1)
		print("Water level is low")
	
# Send commands to MCU
def callMCU(tierNum, component, amount):
	sendToArduino("Sending data")
	switchStmt = {
		"waterPump": "1",
		"nutrientPump": "2",
		"LED": "3"
	}
	
	compNum = switchStmt.get(component, "Invalid")
	data = str(tierNum) + compNum + str(amount)
	sendToArduino(data)
	print("Sending data")
		
# Debugging function that shows sensor data, given Readings object
def displayData(data):
	print("EC Level: {}, pH Level: {}, Water Level: {}".format(data.ec_level, data.pH_level, data.water_level))

def light_schedule(total_hours, start_time):
    full_cycles = int(total_hours / 5)
    partial_cycle_time = total_hours % 5
    on_schedule = []
    off_schedule = []
    start = start_time
    for r in range(0,full_cycles):
        start = start_time + 6*r
        on_schedule.append(start)
        off_schedule.append(start + 5)
    if(full_cycles != 0):
        start += 6
    on_schedule.append(start)
    off_schedule.append(start + partial_cycle_time)
    return [on_schedule, off_schedule]

def on_or_off(on_schedule, off_schedule, current_time):
    for r in range(0, len(on_schedule)):
         if(current_time >= on_schedule[r] and current_time < off_schedule[r]):
            return 1
    return 0
    
def toggleLEDs(activation):
	for i in range(1, 5):
		callMCU(i, "LED", activation)
	print("Turning LED's: {}".format("Off" if (activation == 0) else "On"))
	
def connectToMCU():
	setupSerial(115200, "/dev/ttyACM0")

# Main
def main():
	connectToMCU()
	while(True):
		if(time.localtime(time.time()).tm_min == 0):
			for tierNum in range(1, 5):
				checkLevels(tierNum)
			resLvl = getResLevels()
			sendAPIGreenhouseData(resLvl[3], resLvl[4])
			print("Water level: {}, Nutrient level: {}".format(resLvl[3], resLvl[4]))
		time.sleep(60)
