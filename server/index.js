var http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors'); // in case if cors problems appear, install cors as dependency and uncomment

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 5000;

const io = require('socket.io')(server);
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const portArduino = new SerialPort('COM3', {
   baudRate: 9600
})


// Middleware
app.use(bodyParser.json());
// app.use(cors()); // same as above, related to cors problems


server.listen(port, () => console.log(`Listening on port ${port}...`));