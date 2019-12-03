#include <Wire.h>
#include <BH1750.h>

BH1750 lightMeter;

//initialize configuration constants
const int loop_delay = 1000;

//initialize array containing real lights' level values
const int lightsNum = 8;
int lightsLevels[lightsNum];

//initialize variable for fetching data from interface
String lightsLevelsData;
char lightsLevelsDataSeparator = '-';

//declaration of function parsing data from interface to obtain separate light's level value
String getValue(String data, char separator, int index)
{
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void setup(){

  Serial.begin(9600);

  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  // On esp8266 devices you can select SCL and SDA pins using Wire.begin(D4, D3);
  Wire.begin();

  lightMeter.begin();
}

void loop() {
  while(Serial.available() > 0) {
    lightsLevelsData = Serial.readString();
    
    for (int i = 0; i<lightsNum; i++) {
      lightsLevels[i] = getValue(lightsLevelsData, lightsLevelsDataSeparator, i).toInt();
      //Serial.println(lightsLevels[i]); //sending just to check if data exchange works when it should
    }
  }
  
  float lux = lightMeter.readLightLevel();
  Serial.print(F("{\"light\":"));
  Serial.print(lux);
  Serial.print(F("}"));
  Serial.println("");
  delay(loop_delay);
}
