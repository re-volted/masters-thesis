const http = require("http");
const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const io = require("socket.io")(server);
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
const portArduino = new SerialPort("COM3", {
    baudRate: 9600
});

// Initializing of Arduino serialport data parser
const parser = new Readline();
portArduino.pipe(parser);

// Middleware
// app.use(bodyParser.json());
app.use(cors());

parser.on("open", () =>
    console.log("Serial port for communication with Arduino opened.")
);

io.on("connect", socket => {
    console.log("Socket connection with Vue application established.");

    parser.on("data", data => {
        console.log("Data from Arduino:", data);
        socket.emit("light", data);
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected from Vue application.");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}...`));
