// makeMove function - updates gameState
function makeMove(gameState, playerId, nextMoveIndex) {
    // send string to new clients

    // if valid move 
    if(validate(gameState, nextMoveIndex)) {
        // update game state
        updateGame(gameState, playerId, nextMoveIndex); // update game state
    } else {
        // otherwise rollback (same player picks again)
        rollback(gameState);
    }
    webSocket.send(JSON.stringify({
        action: "makeMove",
        value: gameState,
        playerTurn: playerId
    }));
}

// forfeit function - ends game 
function forfeit() {
    // send string to new clients
    // value should return the current gameState
    // value: gameState
    webSocket.send(JSON.stringify({
        action: "forfeit",
        value: ".........",
        message: gameOver()
    }));
}

// -----------------------------------------------------------------------

// updateGame function 
function updateGame(gameState, playerId, nextMoveIndex) {
    let updatedGameState = "";

    // if valid move
    if(validate(gameState, nextMoveIndex)) {

        // update gameState
        for(let i = 0; i < gameState.length(); i++) {
            // if index is the one we are looking for
            if(nextMoveIndex == i) {
                // add player symbol (X or O) from player obj 
                // ex.) -> player1 {id: 1, symbol: X} player2 {id: 2, symbol: O}
                updatedGameState += playerId.symbol; 
            }
            // otherwise
            updatedGameState += "" + gameState.charAt(i); // add previous char's 
        }
        gameState = updatedGameState; // set gameState to updated gameState
        return gameState; // return gameState
    }
}

// validate function
function validate(gameState, nextMoveIndex){
    // if valid move return true
    if(gameState.charAt(nextMoveIndex).equals(".")) {
        return true;
    } 
    // otherwise return false
    return false; 
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

// ------------------------------------
// (NOT TOO SURE?)

// rollback function - returns gameState and (same player picks again)
function rollback(gameState) {
    return gameStateString
}