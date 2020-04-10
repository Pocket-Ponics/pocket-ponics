# Setting Up the greenhouse

Setting up the greenhouse occurs in two parts; setting up the Raspberry Pi and the Arduino, and setting up the tier wiring.  
The following guide will walk you through the setup of the Raspberry Pi and the Arduino; to set up the tier wiring, use the technical diagram.

# Components Needed

Raspberry Pi 3 running Raspbian
Ardiuno

# Setting up the PI Access Point
Install the communication software, and turn off the communication protocols

```
sudo apt install dnsmasq hostapd
sudo systemctl stop dnsmasq
sudo systemctl stop hostapd
```
Configure the static IP address by editing the dhcpcd.conf file
```
sudo nano /etc/dhcpcd.conf
```
Add the following line to the end of the file
```
interface wlan0
static ip_address=192.168.0.10/24
denyinterfaces eth0
denyinterfaces wlan0
```
Then configure the DHCP server by creating and editing a dnsmasq file
```
sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig
sudo nano /etc/dnsmasq.conf
```
Add the following lines
```
interface=wlan0
dhcp-range=192.168.0.11,192.168.0.30,255.255.255.0,24h
```
Once the DHCP server is configured, we need to update the hostapd configuration
```
sudo nano /etc/hostapd/hostapd.conf
```
There we insert the following lines, substituting <Network> and <Password> for the name and password that you want to use on your access point
```
interface=wlan0
bridge=br0
hw_mode=g
channel=7
wmm_enabled=0
macaddr_acl=0
auth_algs=1
ignore_broadcast_ssid=0
wpa=2
wpa_key_mgmt=WPA-PSK
wpa_pairwise=TKIP
rsn_pairwise=CCMP
ssid=<Network>
wpa_passphrase=<Password>
```
And then the last file that we have to edit tells the system where all of this configuration is
```
sudo nano /etc/default/hostapd
```
Replace the existing DAEMON_CONF line (probably commented out) with the following
```
DAEMON_CONF="/etc/hostapd/hostapd.conf"
```
It should all be functional at this point, so restart the hostapd software
```
sudo systemctl unmask hostapd
sudo systemctl enable hostapd
sudo systemctl start hostapd
```

# Running the local server
Download this folder onto the Raspberry Pi, and then cd into it
Download any necessary dependencies:
```
sudo apt-get install python3-flask
pip install wifi
```
Run the server
```
sudo python3 appconnect.py
```
Note: if the server throws a compiler error due to the wifi module, try running ```sudo -H pip install wifi```
