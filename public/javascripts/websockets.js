const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
const portInfo = (window.location.port != 80 && window.location.port != 443 ? ":" + window.location.port  : '');
const socketUrl = socketProtocol + '//' + window.location.hostname + portInfo + '/websockets/newsocket';
let webSocket = new WebSocket(socketUrl);

export function sendMessage(message) {
    webSocket.send(JSON.stringify(message));
}
