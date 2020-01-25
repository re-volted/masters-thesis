#include <Wire.h>
#include <BH1750.h>
#include <SoftwareSerial.h>
#include <DmxSimple.h>

// light meter related part
BH1750 lightMeter;

// Setup of Bluetooth module on pins 10 (TXD) and 11 (RXD);
SoftwareSerial BTserial(10, 11);

// DMX Shield related part
#define DMX_MAX_CHANNELS 24
#define DMX_COMMUNICATION_PIN 3

uint16_t DMXlightsChannels[16] = {10, 11, 21, 20, 7, 8, 22, 23, 16, 17, 13, 14, 1, 2, 4, 5};

// SETTINGS
//initialize configuration constants
const int loop_delay = 250;

//initialize array containing real lights' level values
const int lightsNum = 16;
uint8_t lightsLevels[lightsNum];

// variables for multi measurements support
const int lightMeasurementsNum = 10;
int lightMeasurementsIter = 0;
float lightMeasurements[lightMeasurementsNum];

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

    BTserial.begin(9600); // Bluetooth at baud 9600 for talking to the node server

    // Initialize the I2C bus (BH1750 library doesn't do this automatically)
    Wire.begin();
    // Initialize BH1750 meter
    lightMeter.begin();
    // Initialize DMX communication controller
    DmxSimple.usePin(DMX_COMMUNICATION_PIN);
    DmxSimple.maxChannel(DMX_MAX_CHANNELS);
}

void loop() {

    // sending whole set of 10 collected measures
    if (lightMeasurementsIter == lightMeasurementsNum) {
        BTserial.print(F("{\"light\":["));

        for (int j = 0; j<lightMeasurementsNum-1; j++) {
            BTserial.print(lightMeasurements[j]);
            BTserial.print(",");
        }
        BTserial.print(lightMeasurements[lightMeasurementsNum-1]);
        BTserial.print(F("]}"));
        lightMeasurementsIter = 0;
    }

    // reading single light level and save it to the array
    float lux = lightMeter.readLightLevel();
    lightMeasurements[lightMeasurementsIter] = lux;

    while (BTserial.available() > 0) {
        lightsLevelsData = BTserial.readStringUntil('#'); // terminate char for "updateRealLights" emit
        
        for (int i = 0; i<lightsNum; i++) {
            // reading separate values from sent stream of data
            lightsLevels[i] = getValue(lightsLevelsData, lightsLevelsDataSeparator, i).toInt();
            BTserial.print(lightsLevels[i]); // transmission debugging in server
            BTserial.print(", "); // -||-
    
            // sending data to DMX lights
            DmxSimple.write(DMXlightsChannels[i], lightsLevels[i]);
        }
        BTserial.print(F("$")); // terminating char for transmission debugging in server side
    }
    lightMeasurementsIter++;
    delay(loop_delay);
}
