#include <Wire.h>
#include <BH1750.h>
#include <DmxSimple.h>

// light meter related part
BH1750 lightMeter;

// DMX Shield related part
#define DMX_MAX_CHANNELS 25
#define DMX_COMMUNICATION_PIN 3

uint16_t DMXlightsChannels[16] = {1, 2, 4, 5, 7, 8, 10, 13, 16, 20, 21, 22, 23, 24, 25};

// SETTINGS
//initialize configuration constants
const int loop_delay = 500;

//initialize array containing real lights' level values
const int lightsNum = 16;
uint8_t lightsLevels[lightsNum];

//initialize variable for fetching data from interface
String lightsLevelsData;
char lightsLevelsDataSeparator = '-';

//declaration of function parsing data from interface to obtain separate light's level value
String getValue(String data, char separator, int index) {
  int found = 0;
  int strIndex[] = {0, -1};
  int maxIndex = data.length()-1;

  for (int i=0; i<=maxIndex && found<=index; i++) {
    if (data.charAt(i)==separator || i==maxIndex) {
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
  }

  return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void setup() {

  Serial.begin(9600);

  // Initialize the I2C bus (BH1750 library doesn't do this automatically)
  Wire.begin();
  // Initialize BH1750 meter
  lightMeter.begin();
  // Initialize DMX communication controller
  DmxSimple.usePin(DMX_COMMUNICATION_PIN);
  DmxSimple.maxChannel(DMX_MAX_CHANNELS);
}

void loop() {
  float lux = lightMeter.readLightLevel();
  Serial.print(F("{\"light\":"));
  Serial.print(lux);
  Serial.print(F("}"));
  Serial.println("");
  delay(loop_delay);

  while(Serial.available() > 0) {
    lightsLevelsData = Serial.readString();
    
    for (int i = 0; i<lightsNum; i++) {
      lightsLevels[i] = getValue(lightsLevelsData, lightsLevelsDataSeparator, i).toInt();
      Serial.print(lightsLevels[i]);
      Serial.print(", ");

      DmxSimple.write(DMXlightsChannels[i], lightsLevels[i]);
    }
    Serial.println();
  }
  delay(loop_delay);
}
