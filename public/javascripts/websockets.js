let webSocket = null

function startMatchmaking() {
    updateMatchSearching()
    createWebsocket()
}

window.startMatchmaking = startMatchmaking

function createWebsocket() {
    const socketProtocol = (window.location.protocol === 'https:' ? 'wss:' : 'ws:');
    const portInfo = (window.location.port != 80 && window.location.port != 443 ? ":" + window.location.port  : '');
    const socketUrl = socketProtocol + '//' + window.location.hostname + portInfo + '/websockets/newsocket';
    webSocket = new WebSocket(socketUrl);

    //TODO: ADD CONDITIONAL STATEMENTS FOR THE DIFFERENT ACTIONS
    //I.E. "tied", "update", "win", "lose", "rollback", "token"
    webSocket.onmessage = function(event) {
        console.log("Receieved Message: ");
        let data = JSON.parse(event.data);
        console.log(event.data);
        if (data.action == "update") {
            updateGame(data.value);
        } else if (data.action == "tied") {
            // Handle ties
            updateGame(data.value)
            webSocket.close()
            updateEndGameText('Tied')
        } else if (data.action == "win") {
            // Handle wins
            updateGame(data.value)
            webSocket.close();
            updateEndGameText('Won')
        } else if (data.action == "lose") {
            // Handle loss
            updateGame(data.value)
            webSocket.close();
            updateEndGameText('Lost')
        } else if (data.action == "rollback") {
            // TODO: Handle rollback
            alert(`rolling back: ${data.message}`)
        } else if (data.action == "token") {
            updateToken(data.value)
        } else if (data.action == "found") {
            foundGame(data.value)
        } else if (data.action == "chat") {
            receiveChat(data.value);
        } else {
            console.log("Unknown action")
        }
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

function foundGame(gameInfo) {
    let gameInfoDiv = document.getElementById('game-information')
    gameInfoDiv.innerHTML = ''
    gameInfoDiv.innerHTML = `
    <h1>Found Game:</h1>
    <p>My Name: Guest ${gameInfo.id}</p>
    <p>My Opponent: Guest ${gameInfo.opponent}</p>
    <p>My Token: ${gameInfo.token}</p>
    <div style="display:none;" id="myToken"></div>
    `
    updateToken(gameInfo.token)
    updateMatchFound()
}

function updateToken(token) {
    document.getElementById('myToken').innerHTML = token
}

//Given a JSON object send a message to websocket middleware
export function sendMessage(message) {
    console.log("Sending Message");
    webSocket.send(JSON.stringify(message));
}