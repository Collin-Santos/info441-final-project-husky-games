const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
const portInfo = (window.location.port != 80 && window.location.port != 443 ? ":" + window.location.port  : '');
const socketUrl = socketProtocol + '//' + window.location.hostname + portInfo + '/websockets/newsocket';
let webSocket = new WebSocket(socketUrl);

//TODO: ADD CONDITIONAL STATEMENTS FOR THE DIFFERENT ACTIONS
//I.E. "tied", "update", "win", "lose", "rollback", "token"
webSocket.onmessage = function(event) {
    console.log("Receieved Message: ");
    let data = JSON.parse(event.data);
    console.log(event.data);
    if (data.action == "update") {
        updateGame(data.value);
    } else if (data.action == "tied") {
        // TODO: Handle ties
        alert("tie game")
    } else if (data.action == "win") {
        // TODO: Handle wins
        alert("win game")
    } else if (data.action == "lose") {
        // TODO: Handle loss
        alert("lose game")
    } else if (data.action == "rollback") {
        // TODO: Handle rollback
        alert(`rolling back: ${data.message}`)
    } else if (data.action == "token") {
        updateToken(data.value)
    } else {
        console.log("Unknown action")
    }
}

//Update the client's html based on the given gamestate
function updateGame(gameState) {
    let newGameState = [];
    for (let i = 0; i < 9; i++) {
        if (gameState.charAt(i) == '.') continue; 
        const tile = document.getElementById(`tile_${i}`).innerHTML = String(gameState.charAt(i));
    }
    return newGameState.join("");
}

function updateToken(token) {
    document.getElementById('myToken').innerHTML = token
}

//Given a JSON object send a message to websocket middleware
export function sendMessage(message) {
    console.log("Sending Message");
    webSocket.send(JSON.stringify(message));
}