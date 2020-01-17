import serial
import time
import requests
import base64
import json

# ser = serial.Serial('/dev/ttyACM0', 9600)

# Dictionary with all components related to it's tier
pinDict = []
# Adding Tier 1 pins to Dictionary
#pinDict.append({"EC": ECpin, "pH": pHpin, "WL_0": WL_0pin, "WL_1": WL_1pin}) # TODO
# Adding Tier 2 pins to Dictionary
#pinDict.append({"EC": ECpin, "pH": pHpin, "WL_0": WL_0pin, "WL_1": WL_1pin}) # TODO
# Adding Tier 3 pins to Dictionary
#pinDict.append({"EC": ECpin, "pH": pHpin, "WL_0": WL_0pin, "WL_1": WL_1pin}) # TODO

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
	
# Returns the value of the component based on tier and component type
def getCompVal(tierNum, component):
	pin = pinDict[tierNum-1][component]
	# TODO: val = # get value from pin
	return val
	
# Checks the readings from all the tiers and performs ther desired actions
def checkLevels(tierNum):
	# Find values from pins using TierNum
	# TODO: ecValue = getCompVal(tierNum, EC)
	# TODO: pHValue = getCompVal(tierNum, pH)
	# TODO: WL_0 = getCompVal(tierNum, WL_0)
	# TODO: WL_1 = getCompVal(tierNum, WL_1)
	# TODO: waterValue = # -1 = below min fill, 0 = below max fill, 1 = at or above max fill
	tierReading = Readings(ecValue, pHValue, waterValue)
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
	
def calcNutrients(ecLevel, pHLevel):
	# TODO: Find a good numerical representation of a nutrient level
	return ecLevel + pHLevel
	
def callMCU(tierNum, component, amount):
	# Use Serial.readString on Arduino side
	ser.write("%d %s %d \n"%(tierNum, component, amount))
	
sumData = getAPIData(1)
print(sumData)
sendAPIData(Readings(4.3,7.1,0), 4)
	
	# If API calls to adjust light level
	#TODO: callMCU(tierNum, LED, amount)
