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
const rand = () => Math.floor(Math.random() * 9999);

app.use('/', staticPath);

wss.on("connection", (socket) => {
  // Immediately say hi when connection is established
  socket.send("Hello from websocket server!");

  // Send our client an updated "reading" every 200ms
  setInterval(() => socket.send(rand()), 200);

  socket.on("message", (message) => {
    log(`Message received from client: ${message}`);
  });
});

// 404 route - SHOULD BE LAST
app.use((_req, res) => {
  const html = "<div style='text-align: center;'><h1>): Unable to find that :(</h1></div>";
  res.status(404).send(html);
});

module.exports = server;
