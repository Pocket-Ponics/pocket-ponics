
// Main Arduino Code

#define TdsSensorPinT1 A0
#define phSensorPinT1 A1
#define TdsSensorPinT2 A2
#define phSensorPinT2 A3
#define TdsSensorPinT3 A4
#define phSensorPinT3 A5
#define TdsSensorPinT4 A6
#define phSensorPinT4 A7

#define wlSensorBT1 53
#define wlSensorTT1 52
#define wlSensorBT2 51
#define wlSensorTT2 50
#define wlSensorBT3 49
#define wlSensorTT3 48
#define wlSensorBT4 47
#define wlSensorTT4 46
#define wlSensorBWR 45
#define wlSensorTWR 44
#define wlSensorBNR 43
#define wlSensorTNR 42

#define waterPumpT1 22
#define nutrientPumpT1 23
#define ledPinT1 24
#define waterPumpT2 25
#define nutrientPumpT2 26
#define ledPinT2 27
#define waterPumpT3 28
#define nutrientPumpT3 29
#define ledPinT3 30
#define waterPumpT4 31
#define nutrientPumpT4 32
#define ledPinT4 33

// Constants for TDS Sensor
#define VREF 5.00
#define NUMSAMPLES 10
#define ArrayLenth  40    //times of collection
int pHArray[ArrayLenth];   //Store the average value of the sensor feedback
int pHArrayIndex=0;
float averageVoltage = 0, tdsValue = 0, temp = 25;
int tdsConstant = 133.42;
int pulseLength = 1000; // Duration in ms
int tdsToECconstant = 700;

// Communication Variables
const byte numChars = 64;
char receivedChars[numChars];
String strObject;
boolean newData = false;

void setup() {
  Serial.begin(115200);
  Serial.println("<Arduino is ready>");
  pinMode(TdsSensorPinT1, INPUT);
  pinMode(TdsSensorPinT2, INPUT);
  pinMode(TdsSensorPinT3, INPUT);
  pinMode(TdsSensorPinT4, INPUT);
  pinMode(phSensorPinT1, INPUT);
  pinMode(phSensorPinT2, INPUT);
  pinMode(phSensorPinT3, INPUT);
  pinMode(phSensorPinT4, INPUT);     
  pinMode(wlSensorBT1, INPUT);
  pinMode(wlSensorTT1, INPUT);
  pinMode(wlSensorBT2, INPUT);
  pinMode(wlSensorTT2, INPUT);
  pinMode(wlSensorBT3, INPUT);
  pinMode(wlSensorTT3, INPUT);
  pinMode(wlSensorBT4, INPUT);
  pinMode(wlSensorTT4, INPUT);
  pinMode(waterPumpT1, OUTPUT);
  pinMode(nutrientPumpT1, OUTPUT);
  pinMode(ledPinT1, OUTPUT);
  pinMode(waterPumpT2, OUTPUT);
  pinMode(nutrientPumpT2, OUTPUT);
  pinMode(ledPinT2, OUTPUT);
  pinMode(waterPumpT3, OUTPUT);
  pinMode(nutrientPumpT3, OUTPUT);
  pinMode(ledPinT3, OUTPUT);
  pinMode(waterPumpT4, OUTPUT);
  pinMode(nutrientPumpT4, OUTPUT);
  pinMode(ledPinT4, OUTPUT);
}

void loop() {
    recvWithStartEndMarkers();
    replyToPython();
}

void performAction(int tierNum, int comp, int amount){
  switch(comp){
    // Water Pump Action
    case 1:
      //digitalWrite(waterPumpT1, HIGH);
      switch(tierNum){
        // Tier 1
        case 1:
          digitalWrite(waterPumpT1, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(waterPumpT1, LOW);
          Serial.println("Water pump T1 called");
          break;
        // Tier 2
        case 2:
          digitalWrite(waterPumpT2, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(waterPumpT2, LOW);
          Serial.println("Water pump T2 called");
          break;
        // Tier 3
        case 3:
          digitalWrite(waterPumpT3, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(waterPumpT3, LOW);
          Serial.println("Water pump T3 called");
          break;
        // Tier 4
        case 4:
          digitalWrite(waterPumpT4, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(waterPumpT4, LOW);
          Serial.println("Water pump T4 called");
          break;
      }
      break;
    // Nutrient Pump Action
    case 2:
      switch(tierNum){
        // Tier 1
        case 1:
          digitalWrite(nutrientPumpT1, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(nutrientPumpT1, LOW);
          Serial.println("Nutrient pump T1 called");
          break;
        // Tier 2
        case 2:
          digitalWrite(nutrientPumpT2, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(nutrientPumpT2, LOW);
          Serial.println("Nutrient pump T2 called");
          break;
        // Tier 3
        case 3:
          digitalWrite(nutrientPumpT3, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(nutrientPumpT3, LOW);
          Serial.println("Nutrient pump T3 called");
          break;
        // Tier 4
        case 4:
          digitalWrite(nutrientPumpT4, HIGH);
          // Stay on for 1 sec
          delay(pulseLength);
          digitalWrite(nutrientPumpT4, LOW);
          Serial.println("Nutrient pump T4 called");
          break;
      }
      break;
    // LED Action
    case 3:
      switch(tierNum){
        // Tier 1
        case 1:
          if(amount == 0){
            digitalWrite(ledPinT1, LOW);
            Serial.println("LED turned off");
          }
          else if(amount == 1){
            digitalWrite(ledPinT1, HIGH);
            Serial.println("LED turned on");
          }
          break;
        // Tier 2
        case 2:
          if(amount == 0){
            digitalWrite(ledPinT2, LOW);
            Serial.println("LED turned off");
          }
          else if(amount == 1){
            digitalWrite(ledPinT2, HIGH);
            Serial.println("LED turned on");
          }
          break;
        // Tier 3
        case 3:
          if(amount == 0){
            digitalWrite(ledPinT3, LOW);
            Serial.println("LED turned off");
          }
          else if(amount == 1){
            digitalWrite(ledPinT3, HIGH);
            Serial.println("LED turned on");
          }
          break;
        // Tier 4
        case 4:
          if(amount == 0){
            digitalWrite(ledPinT4, LOW);
            Serial.println("LED turned off");
          }
          else if(amount == 1){
            digitalWrite(ledPinT4, HIGH);
            Serial.println("LED turned on");
          }
          break;
      }
      break;
    //Default
    default:
      break;
  }
}

// Data Collecting Functions
int getWLValue(int tierNum, int pos){
  int wlsPin = -1;
  
  switch(tierNum){
    // Tier 1
    case 1:
      wlsPin = (pos == 0) ? wlSensorBT1 : wlSensorTT1;
      return digitalRead(wlsPin);
      break;
    // Tier 2
    case 2:
      wlsPin = (pos == 0) ? wlSensorBT2 : wlSensorTT2;
      return digitalRead(wlsPin);
      break;
    // Tier 3
    case 3:
      wlsPin = (pos == 0) ? wlSensorBT3 : wlSensorTT3;
      return digitalRead(wlsPin);
      break;
    // Tier 4
    case 4:
      wlsPin = (pos == 0) ? wlSensorBT4 : wlSensorTT4;
      return digitalRead(wlsPin);
      break;
  }
}

int calcWaterLevel(int wlBottom, int wlTop){
  if((wlBottom == 0) && (wlTop == 0))
    return 0;
   else if((wlBottom == 1) && (wlTop == 0))
    return -1;
   else if((wlBottom == 0) && (wlTop == 1))
    return 1;
}

float getpHValue(int tierNum){
  float pHValue = 0;
  switch(tierNum){
    case 1:
      for(int i = 0; i < NUMSAMPLES; i++){
        pHValue = pHValue + analogRead(phSensorPinT1);
      }
      pHValue = (pHValue*VREF*3.5)/1024/NUMSAMPLES;
      pHValue = (pHValue*0.9478) + 0.5104;  // Add custom offset value
      break;
    case 2:
      for(int i = 0; i < NUMSAMPLES; i++){
        pHValue = pHValue + analogRead(phSensorPinT2);
      }
      pHValue = (pHValue*VREF*3.5)/1024/NUMSAMPLES;
      pHValue = (pHValue*1.0416) - 0.4096;  // Add custom offset value
      break;
    case 3:
      for(int i = 0; i < NUMSAMPLES; i++){
        pHValue = pHValue + analogRead(phSensorPinT3);
      }
      pHValue = (pHValue*VREF*3.5)/1024/NUMSAMPLES;
      pHValue = (pHValue*0.614) + 2.724;  // Add custom offset value
      break;
    case 4:
      for(int i = 0; i < NUMSAMPLES; i++){
        pHValue = pHValue + analogRead(phSensorPinT4);
      }
      pHValue = (pHValue*VREF*3.5)/1024/NUMSAMPLES;
      pHValue = (pHValue*0.606) + 2.8505;  // Add custom offset value
      break;
    default:
      pHValue = 0;
      break;
  }
  return pHValue;
}



float getTDSValue(int tierNum){
  float totalOfReadings = 0;

  switch(tierNum){
    // Tier 1
    case 1:
      for(int i = 0; i < NUMSAMPLES; i++){
        int reading = analogRead(TdsSensorPinT1);
        float avgVoltage = (reading * (float)VREF) / 1024;
        totalOfReadings += (133.42*avgVoltage*avgVoltage*avgVoltage - 255.86*avgVoltage*avgVoltage + 857.39*avgVoltage)*0.5;
      }
      break;
    // Tier 2
    case 2:
      for(int i = 0; i < NUMSAMPLES; i++){
        int reading = analogRead(TdsSensorPinT2);
        float avgVoltage = (reading * (float)VREF) / 1024;
        totalOfReadings += (133.42*avgVoltage*avgVoltage*avgVoltage - 255.86*avgVoltage*avgVoltage + 857.39*avgVoltage)*0.5;
      }
      break;
    // Tier 3
    case 3:
      for(int i = 0; i < NUMSAMPLES; i++){
        int reading = analogRead(TdsSensorPinT3);
        float avgVoltage = (reading * (float)VREF) / 1024;
        totalOfReadings += (133.42*avgVoltage*avgVoltage*avgVoltage - 255.86*avgVoltage*avgVoltage + 857.39*avgVoltage)*0.5;
      }
      break;
    // Tier 4
    case 4:
      for(int i = 0; i < NUMSAMPLES; i++){
        int reading = analogRead(TdsSensorPinT4);
        float avgVoltage = (reading * (float)VREF) / 1024;
        totalOfReadings += (133.42*avgVoltage*avgVoltage*avgVoltage - 255.86*avgVoltage*avgVoltage + 857.39*avgVoltage)*0.5;
      }
      break;
  }

  tdsValue = totalOfReadings/NUMSAMPLES/tdsToECconstant;
  return tdsValue;
}

String GetMCUData(int tierNum){
  // TODO: use tier num to determine which pins to assign to retreive data from
  String mcuData = "";
  
  String ecValue = String(getTDSValue(tierNum));
  String pHValue = String(getpHValue(tierNum));
  String wlValue = String(calcWaterLevel(getWLValue(tierNum, 0), getWLValue(tierNum, 1)));

  
  
  mcuData = mcuData + ecValue +" "+ pHValue +" "+ wlValue;
  
  return mcuData;
}

// Communication Functions

void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char startMarker = '<';
    char endMarker = '>';
    char rc;

    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();

        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}

void replyToPython() {
    if (newData == true) {
        strObject = receivedChars;
        if(strObject == "Requesting Data"){
          newData = false;
          while(newData == false){
            recvWithStartEndMarkers();
          }
          String tierNum = receivedChars;
          String mcuData = GetMCUData(tierNum.toInt());
          Serial.print('<');
          Serial.print(mcuData);
          Serial.print('>');
        }else if(strObject == "Sending data"){ 
          newData = false;
          while(newData == false){
            recvWithStartEndMarkers();
          }
          String callMCUData = receivedChars;

          int tierNumRecv = (callMCUData[0] - '0');
          int compRecv =    (callMCUData[1] - '0');
          int amountRecv =  (callMCUData[2] - '0');
          
          performAction(tierNumRecv, compRecv, amountRecv);
        }
        
        newData = false;
    }
}

double avergearray(int* arr, int number){
  int i;
  int max,min;
  double avg;
  long amount=0;
  if(number<=0){
    Serial.println("Error number for the array to avraging!/n");
    return 0;
  }
  if(number<5){   //less than 5, calculated directly statistics
    for(i=0;i<number;i++){
      amount+=arr[i];
    }
    avg = amount/number;
    return avg;
  }else{
    if(arr[0]<arr[1]){
      min = arr[0];max=arr[1];
    }
    else{
      min=arr[1];max=arr[0];
    }
    for(i=2;i<number;i++){
      if(arr[i]<min){
        amount+=min;        //arr<min
        min=arr[i];
      }else {
        if(arr[i]>max){
          amount+=max;    //arr>max
          max=arr[i];
        }else{
          amount+=arr[i]; //min<=arr<=max
        }
      }//if
    }//for
    avg = (double)amount/(number-2);
  }//if
  return avg;
}
