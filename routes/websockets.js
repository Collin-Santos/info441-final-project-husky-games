import express from 'express';
var router = express.Router();

import enableWs from 'express-ws';
enableWs(router);

let wsQueue = []; //Matchmaking q
let games = {}; //Keys = GameIDs, Values = Game JSON objects
let wsCounter = 1; //Counter to give each WS a unique ID

router.ws('/newsocket', (ws, req) => {
    //Create and add a new player to q when WS opens
    let player = {
        id: wsCounter,
        socket: ws,
        gameID: ''
    };
    wsCounter++;
    wsQueue.push(player);
    console.log('New Player Sucessfully Added to Queue: ' + player);

    ws.on('message', function(msg) {
        try{
            console.log(msg);
            const msgJSON = JSON.parse(msg);
            if(msgJSON.action == "forfeit"){
                // TO DO: end game for users
                let game = games[player.gameID];
                let opponent = (game.p1.id == player.id) ? game.p2 : game.p1;
                
            } else if(msgJSON.action == "makeMove"){
                // TO DO: update gameState
               games[player.gameID].state = msgJSON.value;
            }

        }catch(error){
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
            delete games[player.gameID];
            opponent.gameID = '';
            wsQueue.push(opponent);
            console.log('WS # ' + player.id + ' has left the game WS #' + opponent.id + ' has won the game.');
            console.log('Succesfully removed game with ID: ' + player.gameID);
            console.log('WS # ' + opponent.id + ' was added back to the Queue');
          //TODO: LET OPPONENET KNOW THAT THEY WON
        }
    })

    //When there are at least two players in the queue match them up and create
    //a new game(JSON) and add it to the current running games
    if (wsQueue.length >= 2) {  
        let p1 = wsQueue.shift();
        let p2 = wsQueue.shift();
        const gameID = p1.id + '-' + p2.id;

        p1.gameID = gameID;
        p2.gameID = gameID;
        let newGame = {
            p1: p1,
            p2: p2,
            state: '.........'
        };
        games[gameID] = newGame;
        console.log('New Game Sucessfully Created: ' + gameID);
    }
    console.log("New Queue Length: " + wsQueue.length);
    //TODO: ADD HANDLER FOR WS MESSAGES -> JSON OBJECTS SENT FROM THE CLIENT
});

export default router;
