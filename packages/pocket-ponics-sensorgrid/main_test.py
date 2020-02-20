import serial
import time
import requests
import base64
import json
import smbus
import time

ser = serial.Serial(
	port = '/dev/ttyACM0',
	baudrate = 9600,
	parity = serial.PARITY_NONE,
	stopbits = serial.STOPBITS_ONE,
	bytesize = serial.EIGHTBITS,
	timeout = 1
)

# Class used to store reading data
class Readings:
	def __init__(self, ec, pH, water):
		self.ec_level = ec
		self.pH_level = pH
		self.water_level = water
		
# Desired Nutrition Value from API
class DesNutrVal:
	def __init__(self, ec_min, ec_max, pH_min, pH_max):
		self.ec_min = ec_min
		self.ec_max = ec_max
		self.pH_min = pH_min
		self.pH_max = pH_max
		
def jprint(obj):
	text = json.dumps(obj, sort_keys=True, indent=4)
	print(text)
	
def SerialWrite(data):
	data = data + '`'
	ser.write(data)
	
# Get data for a specific tier
def getAPIData(tierNum):
	url = "http://10.171.204.187:8080/sensorgrid/adjustments/tierdata"
	getHeaders = {
		'Authorization': 'Basic ' + base64.b64encode('19977991:test')
	}
	payload = {}
	
	response = requests.request("GET", url, headers=getHeaders, data=payload)
	jprint(response.json())
	jObject = response.json()['tiers'][tierNum-1]
	return DesNutrVal(jObject['ec_level_low'], jObject['ec_level_high'], jObject['ph_level_low'], jObject['ph_level_high'])

def sendAPIData(readings, tierNum):
	url = "http://10.171.204.187:8080/sensorgrid/sensor/"+str(tierNum)
	postHeaders = {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization': 'Basic ' + base64.b64encode('19977991:test')
	}
	payload = 'ph_level='+str(readings.pH_level)+'&water_level='+str(readings.water_level)+'&ec_level='+str(readings.ec_level)
	
	response = requests.request("POST", url, headers=postHeaders, data=payload)
	print(response.status_code)
	jprint(response.text)
	
def parseForReadingData(data):
	splitData = data.split()
	return Readings(splitData[0], splitData[1], splitData[2])
	
def getMCUData(tierNum):
	SerialWrite("requesting data")
	#time.sleep(1)
	SerialWrite(str(tierNum))
	print("Requesting Data")
	while 1:
		tierData = ser.readline()
		time.sleep(1)
		print(("Tier data: %s")%tierData)
		if(len(tierData) > 6): # Ask CS Peps about better way to read in data
			print("We have the data")
			break
	# Parse string to get EC, pH, and Water value data
	tierReading = parseForReadingData(tierData)
	return tierReading

# Checks the readings from all the tiers, Sends Data to API and performs the desired actions
def checkLevels(tierNum):
	tierReading = getMCUData(tierNum)
	sendAPIData(tierReading, tierNum)
	performAction(tierReading, getAPIData(tierNum), tierNum)

# Performs the desired actions based off of the readings
def performAction(readings, desiredRange, tierNum):
	# If nutrient level is too low -> Turn on nutrient pump
	if((readings.ec_level < desiredRange.ec_min) or (readings.pH_level < desiredRange.pH_min)):
		callMCU(tierNum, nutrientPump, 1)
	# If nutrient level is high and the water level isn't at max -> Turn on water pump
	if(((readings.ec_level > desiredRange.ec_max) and (readings.pH_level > desiredRange.pH_max)) and (readings.waterValue != 1)):
		callMCU(tierNum, waterPump, 1)
	# If water level is too low -> Turn on water pump
	if(readings.waterValue == -1):
		callMCU(tierNum, waterPump, 1)
	
def callMCU(tierNum, component, amount):
	SerialWrite("sending data")
	print("Sending command")
	
	switchStmt = {
		"waterPump": 1,
		"nutrientPump": 2,
		"LED": 3
	}
	
	compNum = switchStmt.get(component, "Invalid")
	time.sleep(1)
	# Use Serial.readString on Arduino side
	SerialWrite("%d%d%d"%(tierNum, compNum, amount))
	print("Sending data")
	
	
#sumData = getAPIData(1)
#print(sumData)
#sendAPIData(Readings(4.3,7.1,0), 4)

# While(Every Hour):
	# for tierNum in range(1, 5):
		# checkLevels(tierNum)
	
	# If API calls to adjust light level
	#TODO: callMCU(tierNum, LED, amount)
tierNum = 2
comp = "waterPump"
amount = 1

#SerialWrite("sending data");

#callMCU(tierNum, comp, amount)


# This part works!!!!!!
#for x in range(4):
time.sleep(2)
reading = getMCUData(3)
print("EC: %s, pH: %s, Water Level: %s")%(reading.ec_level, reading.pH_level, reading.water_level)

