initWebSocket();

function initWebSocket() {
  const { log } = console;
  log("Creating websocket");

  const socket = new WebSocket(`ws://${window.location.host}`);

  socket.onopen = () => {
    log("Websocket is open!");
    // Send a message to our server after opening the socket
    socket.send(JSON.stringify({ message: "ok" }));
    log("Websocket message sent to server");
  };

  socket.onmessage = message => {
    log("New websocket message received:", message);
    const reading = message.data;
    const serialReadingEl = document.getElementById("serial-reading");
    serialReadingEl.innerHTML = `<h3>Current serial reading: ${reading}<h3>`;
  };
}
