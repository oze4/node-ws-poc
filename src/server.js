const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const publicPath = path.resolve(__dirname, "../public");
const staticPath = express.static(publicPath);

const { log } = console;

const { floor, random } = Math;
const getSerialPortReading = () => floor(random() * 9999);

/**
 * Express app & websoket handlers/app routes
 */

app.use('/', staticPath);

// So we can clearInterval @ wss.on("close", ...)
let interval;

wss.on("connection", (socket) => {
  // Immediately say hi when connection is established
  socket.send("Hello from websocket server!");

  // Send our client an updated "reading" every 200ms
  interval = setInterval(() => socket.send(getSerialPortReading()), 200);

  socket.on("message", (message) => {
    log(`Message received from client: ${message}`);
  });
});

wss.on("close", (_socket, _req) => {
  interval && clearInterval(interval);
});

// 404 route - SHOULD BE LAST
app.use((_req, res) => {
  const html = "<div style='text-align: center;'><h1>): Unable to find that :(</h1></div>";
  res.status(404).send(html);
});

module.exports = server;
