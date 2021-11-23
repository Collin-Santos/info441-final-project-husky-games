 import * as wsUtils from './websockets.js';

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
    for (let i = 0; i < 9; i++) {
        const tile = document.getElementById(`tile_${i}`);
        if (i == nextMoveIndex) {
            newGameState.push('X');
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

// forfeit function - ends game 
function forfeit() {
    // send string to new clients
    // value should return the current gameState
    // value: gameState
    let acton = {
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
window.makeMove = makeMove;
window.forfeit = forfeit;