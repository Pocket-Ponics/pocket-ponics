from flask import Flask, request, jsonify
from random import random
from uuid import uuid1
import math
from wifi import Cell, Scheme

app = Flask(__name__)
@app.route('/')
def index():
	return 'Test 123'


@app.route("/registration/")
def action():
	serial = math.trunc(random()*9000000 + 1000000)
	password = uuid1()
	print(serial)
	print(password)
	return '{"serial": "' + str(serial) + '", "password": "'+ str(password) + '"}'
	
@app.route("/wifi/")
def wifi():
	for wifi in Cell.all('wlan0'):
		print(wifi.ssid, wifi.channel, wifi.address, wifi.mode)
		if wifi.encrypted:
			print(wifi.encryption_type)

	list = [{'ssid': wifi.ssid, 'encrypted': wifi.encrypted, 'type': wifi.encryption_type if wifi.encrypted else '', 'strength': wifi.quality } for wifi in Cell.all('wlan0') if wifi.channel == 1 and wifi.ssid != '\x00']
	return jsonify(list)
	
@app.route("/wifi/login/", methods=['POST'])
def login():
	data = request.json
	print(data)
	
	#do the login here
	# ssid is accessed with data['ssid']
	# username is accessed with data['username'] - only for wpa 2
	# password is accessed with data['password']
	return '[]'
	
if __name__ == '__main__':
	app.run(debug=True, port=80, host='0.0.0.0')
