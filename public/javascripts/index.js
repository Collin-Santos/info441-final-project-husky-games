 import * as wsUtils from './websockets.js';

function updateMatchSearching() {
    let gameContainer = document.getElementById('interaction-swap')
    gameContainer.innerHTML = ''
    gameContainer.innerHTML = 'searching...'
}

function updateMatchFound() {
    let gameContainer = document.getElementById('interaction-swap')
    gameContainer.innerHTML = ''
    gameContainer.innerHTML = `
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

    <div>
        <button id="forfeitBtn" onclick="forfeit()">Forfeit Game</button>
        <button id="updateToken" onclick="updateToken()">Update Token</button>
    </div>
    `
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
        value: ""
    };
    wsUtils.sendMessage(action);
}

// wonGame function 
function wonGame() {
    let msg = "You won the game!";
    return msg; // return won msg
}

// lostGame function 
function lostGame() {
    let msg = "You lost the game.";
    return msg; // return lost msg
}

// gameOver function
function gameOver() {
    let msg = "Game Over!";
    return msg; // return gameOver msg
}

// rollback function - returns gameState and (same player picks again)
function rollback(gameState) {
    return gameState;
}

//Set all functions to be globally scoped
window.updateMatchSearching = updateMatchSearching;
window.updateMatchFound = updateMatchFound;
window.makeMove = makeMove;
window.forfeit = forfeit;
window.updateToken = updateToken;