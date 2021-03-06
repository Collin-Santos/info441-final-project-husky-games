import express from 'express';
import enableWs from 'express-ws';
import tictactoe from './tictactoe.js';

var router = express.Router();

enableWs(router);

let wsQueue = []; //Matchmaking q
let games = {}; //Keys = GameIDs, Values = Game JSON objects
let wsCounter = 1; //Counter to give each WS a unique ID

router.ws('/newsocket', (ws, req) => {
    //Create and add a new player to q when WS opens
    let player = {
        id: wsCounter,
        displayName: req.session.gamedisplayname,
        socket: ws,
        gameID: '',
        token: ''
    };
    wsCounter++;
    wsQueue.push(player);
    console.log('New Player Sucessfully Added to Queue: ' + player);

    ws.on('message', function(msg) {
        try {
            console.log(msg);
            const msgJSON = JSON.parse(msg);

            switch (msgJSON.action) {
                // Chat Action
                case 'chat':
                    const payloadChatSend = {
                        action: "chat",
                        value: {
                            message: msgJSON.value,
                            name: player.displayName, 
                            receive: 'message-orange'
                        }
                    }

                    const payloadChatRecieve = {
                        action: "chat",
                        value: {
                            message: msgJSON.value,
                            name: player.displayName,
                            receive: 'message-blue'
                        }
                    }
                    player.socket.send(JSON.stringify(payloadChatSend))
                    player.opponentSocket.send(JSON.stringify(payloadChatRecieve))
                    break;
                
                // Forfeit Action
                case 'forfeit':
                    const payloadWin = {
                        action: "win",
                        value: games[player.gameID].state 
                    }
                    const payloadLose = {
                        action: "lose",
                        value: games[player.gameID].state 
                    }
                    player.socket.send(JSON.stringify(payloadLose))
                    player.opponentSocket.send(JSON.stringify(payloadWin))
                    break;
                
                // Token Request Action
                case 'token':
                    player.socket.send(JSON.stringify({
                        action: "token",
                        value: player.token
                    }))
                    break;
                
                // Game Move Request Action
                case 'makeMove':
                    // Check against game logic
                    if (games[player.gameID].turn != player.id) {
                        // Check for turn
                        player.socket.send(JSON.stringify({
                            action: "rollback",
                            value: games[player.gameID].state,
                            message: "Not your turn"
                        }))
                    } else {
                        const currentGameState = games[player.gameID].state
                        const gameLogic = tictactoe(msgJSON.value, currentGameState)

                        if (gameLogic.valid) {
                            if (gameLogic.tied) {
                                // tie logic
                                const payload = {
                                    action: "tied",
                                    value: gameLogic.gameState
                                }
                                games[player.gameID].p1.socket.send(JSON.stringify(
                                    payload
                                ))
                                games[player.gameID].p2.socket.send(JSON.stringify(
                                    payload
                                ))
                            } else if (!gameLogic.gameWon) {
                                // Update gamestate
                                const payload = {
                                    action: "update",
                                    value: gameLogic.gameState
                                }
                                games[player.gameID].state = gameLogic.gameState
                                // Send game state
                                games[player.gameID].p1.socket.send(JSON.stringify(
                                    payload
                                ))
                                games[player.gameID].p2.socket.send(JSON.stringify(
                                    payload
                                ))
                                // Pass turn
                                games[player.gameID].turn = player.opponentId
                            } else {
                                // Game won, notify players and end game
                                const payloadWin = {
                                    action: "win",
                                    value: gameLogic.gameState
                                }
                                const payloadLose = {
                                    action: "lose",
                                    value: gameLogic.gameState
                                }
                                player.socket.send(JSON.stringify(payloadWin))
                                player.opponentSocket.send(JSON.stringify(payloadLose))
                            }
                        } else {
                            // Rollback and prompt reinput
                            player.socket.send(JSON.stringify({
                                action: "rollback",
                                value: gameLogic.gameState,
                                message: "Invalid move"
                            }))
                        }
                    }
                    break;
                // Fallback
                default:
                    console.log('Unknown action provided')
            }
        } catch(error) {
            console.error("Websocket message recieve error: " + error);
        }
    });

    ws.on('close', function close() {
        if (player.gameID == '') {  
            //If the player who left is still in queue just remove them from the queue
            for (let i = 0; i < wsQueue.length; i++) {
                if (wsQueue[i].id == player.id) {
                    wsQueue.splice(i, 1);
                    break;
                }
            }
            console.log('Sucessfully Removed WS #' + player.id);
        } else { 
            //Otherwise if they're in a game end the game and give their opponent the win
            //then add the oppoent back to the queue
            let game = games[player.gameID];
            let opponent = (game.p1.id == player.id) ? game.p2 : game.p1;
            opponent.socket.send(JSON.stringify({
                action: "win",
                value: game.state 
            }));
            delete games[player.gameID];
            opponent.gameID = '';
            console.log('WS # ' + player.id + ' has left the game WS #' + opponent.id + ' has won the game.');
            console.log('Succesfully removed game with ID: ' + player.gameID);
        }
    })

    //When there are at least two players in the queue match them up and create
    //a new game(JSON) and add it to the current running games
    if (wsQueue.length >= 2) {  
        let p1 = wsQueue.shift();
        let p2 = wsQueue.shift();
        const gameID = p1.id + '-' + p2.id;

        p1.gameID = gameID;
        p1.opponentSocket = p2.socket;
        p1.opponentId = p2.id
        p1.token = 'X'
        p2.gameID = gameID;
        p2.opponentSocket = p1.socket;
        p2.opponentId = p1.id
        p2.token = 'O'
        let newGame = {
            p1: p1,
            p2: p2,
            state: '.........',
            turn: p1.id
        };
        games[gameID] = newGame;
        console.log('New Game Sucessfully Created: ' + gameID);
        p1.socket.send(JSON.stringify({
            action: "found",
            value: {
                token: p1.token,
                id: p1.displayName,
                opponent: p2.displayName
            }
        }))
        p2.socket.send(JSON.stringify({
            action: "found",
            value: {
                token: p2.token,
                id: p2.displayName,
                opponent: p1.displayName
            }
        }))
    }
    console.log("New Queue Length: " + wsQueue.length);
});

export default router;
