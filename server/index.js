const http = require("http");
const express = require("express");

const BTSerialPort = require("bluetooth-serial-port");
const btSerial = new BTSerialPort.BluetoothSerialPort();

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const io = require("socket.io")(server);

//Generic Error Handler for the BT Serial Port library as requires error functions
const errFunction = err => {
    if (err) {
        console.log("Error", err);
    }
};

io.on("connect", socket => {
    console.log("Socket connection with Vue application established.");
    // Once BtSerial.inquire finds a device it will call this code
    // BtSerial.inquire will find all devices currently connected with your computer
    btSerial.on("found", (address, name) => {
        // If a device is found and the name contains 'HC' we will continue
        // This is so that it doesn't try to send data to all your other connected BT devices
        if (name.toLowerCase().includes("hc")) {
            btSerial.findSerialPortChannel(
                address,
                channel => {
                    console.log("Connected to:", name);

                    // Finds then serial port channel and then connects to it
                    btSerial.connect(
                        address,
                        channel,
                        () => {
                            // initializing empty data buffer
                            let data = "";

                            btSerial.on("data", chunk => {
                                data += chunk.toString();

                                // if sent all the chunks related to lightLevelUpdate
                                if (data.indexOf("}") !== -1) {
                                    console.log(data);
                                    socket.emit("light", data);
                                    data = "";
                                }

                                // TO DELETE AFTER ENSURING THAT DMX WORKS WELL ---------
                                // if sent all the chunks related to controlling
                                if (data.indexOf("$") !== -1) {
                                    console.log(data);
                                    data = "";
                                }
                                // ------------------------------------------------------
                            });
                        },
                        errFunction
                    );
                },
                errFunction
            );
        } else {
            console.log("Not connecting to: ", name);
        }

        socket.on("updateRealLights", lightsValues => {
            btSerial.write(Buffer.from(lightsValues.join("-") + "#"), err => {
                if (err) {
                    return console.log("Error on write: ", err.message);
                }
            });
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected from Vue application.");
        });
    });
});

// Starts looking for Bluetooth devices and calls the function btSerial.on('found'
btSerial.inquire();

server.listen(port, () => console.log(`Listening on port ${port}...`));
