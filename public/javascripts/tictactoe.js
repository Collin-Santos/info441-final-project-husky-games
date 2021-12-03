import * as wsUtils from './websockets.js';

function updateMatchSearching() {
    document.getElementById('post-game').innerHTML = ''
    let gameContainer = document.getElementById('interaction-swap')
    gameContainer.innerHTML = ''
    gameContainer.innerHTML = 'searching...'
}

function updateMatchFound() {
    let gameContainer = document.getElementById('interaction-swap')
    gameContainer.innerHTML = ''
    gameContainer.innerHTML = `
    <div>

        <div class="container">
            <h1>Tic Tac Toe</h1>
            <div class="game-frame">
            <div id="tile_0" class="tile" onclick="makeMove(0)"></div>
            <div id="tile_1" class="tile" onclick="makeMove(1)"></div>
            <div id="tile_2" class="tile" onclick="makeMove(2)"></div>
            <div id="tile_3" class="tile" onclick="makeMove(3)"></div>
            <div id="tile_4" class="tile" onclick="makeMove(4)"></div>
            <div id="tile_5" class="tile" onclick="makeMove(5)"></div>
            <div id="tile_6" class="tile" onclick="makeMove(6)"></div>
            <div id="tile_7" class="tile" onclick="makeMove(7)"></div>
            <div id="tile_8" class="tile" onclick="makeMove(8)"></div>
            </div>
        </div>

        <div class="chat-container">
            <div id="messages">
            </div>
            <input id="send_chat_input" type="text"/>
            <button onclick="sendChat()">Send Message</button>
        </div> 
    </div>

        <div>
            <button id="forfeitBtn" onclick="forfeit()">Forfeit Game</button>
        </div>`
}

function receiveChat(jsonObj){
    document.getElementById('messages').innerHTML += `<p>${jsonObj.name}: ${jsonObj.message}</p>`;
}

function sendChat(){
    let message = document.getElementById('send_chat_input').value;
    let jsonObject = {action: "chat", value: message};
    wsUtils.sendMessage(jsonObject);
}

function updateEndGameText(status) {
    document.getElementById('game-information').innerHTML = `
    <h1>You ${status}!</h1>`
    refindGameButton()
}

function refindGameButton() {
    let div = document.getElementById('post-game')
    div.innerHTML = ''
    div.innerHTML = `<button onclick="startMatchmaking()">Find a Game</button>`
}

// makeMove function - updates gameState
function makeMove(nextMoveIndex) {
    console.log("Attempting to make a move at index " + nextMoveIndex);
    // send string to new clients
    // if valid move 
    if (validate(nextMoveIndex)) {
        //let updatedGame = updateGame(gameState, playerId, nextMoveIndex); // update game state
        let updatedGame = getGameState(nextMoveIndex); // update game state
        let action = {
            action: "makeMove",
            value: updatedGame
        };
        wsUtils.sendMessage(action);
    } else {
        // otherwise rollback (same player picks again)
        console.log("Failed to move rolling back")
        rollback('temp');
    }
}

//Return potential game state after given move
function getGameState(nextMoveIndex) {
    let newGameState = [];
    let token = document.getElementById("myToken").innerHTML
    for (let i = 0; i < 9; i++) {
        const tile = document.getElementById(`tile_${i}`);
        if (i == nextMoveIndex) {
            newGameState.push(token); // debug: was 'X'
        } else if (tile.innerHTML == "") {
            newGameState.push(".");
        } else {
            newGameState.push(tile.innerHTML);
        }
    }
    return newGameState.join("");
}

//return true if move is valid, false otherwise
function validate(nextMoveIndex) {
    console.log(document.getElementById(`tile_${nextMoveIndex}`));
    return document.getElementById(`tile_${nextMoveIndex}`).innerHTML == "";
}

function updateToken() {
    wsUtils.sendMessage({action: "token"})
}

// forfeit function - ends game 
function forfeit() {
    // send string to new clients
    // value should return the current gameState
    // value: gameState
    let action = {
        action: "forfeit",
        value: ''
    };
    wsUtils.sendMessage(action);
}

// rollback function - returns gameState and (same player picks again)
function rollback(gameState) {
    return gameState;
}

//Set all functions to be globally scoped
window.updateMatchSearching = updateMatchSearching;
window.updateMatchFound = updateMatchFound;
window.updateEndGameText = updateEndGameText;
window.makeMove = makeMove;
window.forfeit = forfeit;
window.updateToken = updateToken;
window.sendChat = sendChat;
window.receiveChat = receiveChat;