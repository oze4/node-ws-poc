const serialReadingEl = document.getElementById("serial-reading");
const wsUrl = `ws://${window.location.host}`;

initWebSocket(wsUrl, serialReadingEl);

function initWebSocket(url, resultsEl) {
  const { log } = console;
  log("Creating websocket");

  const socket = new WebSocket(url);

  socket.onopen = () => {
    log("Websocket is open!");
    // Send a message to our server after opening the socket
    socket.send(JSON.stringify({ message: "ok" }));
    log("Websocket message sent to server");
  };

  // When a message is received from the server, it is handled here
  socket.onmessage = message => {
    log("New websocket message received:", message);
    const reading = message.data;
    // Put our reading, which was sent from the server, into the DOM
    resultsEl.innerHTML = `<h3>Current serial reading: ${reading}<h3>`;
  };
}
