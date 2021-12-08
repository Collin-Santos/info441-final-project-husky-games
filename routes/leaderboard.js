import express from 'express';

var router = express.Router();

function getSchema(game) {
    switch (game) {
        case 'tictactoe':
            return 'TicTacToe'
            break;
        case 'checkers':
            return 'Checkers'
            break;
        default:
            return null;
    } 
}

//  GET user specific leaderboard
//  returns the player stats of a given user for a given game
router.get('/:user/:game', async function(req, res) {
   try {
       let username = req.params.user;
       let game = req.params.game;
       let gameSchema = req.db[getSchema(game)];
       let playerLeaderboard = await gameSchema.findOne({username: username}).exec();
       res.json(playerLeaderboard);
   } catch(error) {
       res.json({status: 'error', error: error})
   }
})

//  GET leaderboard handler
//  Sends back a json of the top n (defaults to 10) players of the given game
//  Which is deterimed/sorted by total number of wins
//  Example Fetch:
//  /leaderboard/tictactoe?topN = 50 
router.get('/:game', async function(req, res) {
    try {
        let n = (req.query.topN) ? req.query.topN : 10;
        let gameSchema = req.db[getSchema(req.params.game)];
        let gameLeaderboard = await gameSchema.find().sort({wins: -1}).limit(n).exec();
        res.json(gameLeaderboard);
    } catch (error) {
        res.send("An error occured: " + error);
    }
});

//  POST leaderboard handler
//  Increments the players wins or losses of the given game
//  based on whether they won or loss
router.post('/:game', async function(req, res) {
    try {
        let gameSchema = req.db[getSchema(req.params.game)];
        console.log(req.body.username);
        console.log(req.body.won);
        if (req.body.won) {
            await gameSchema.findOneAndUpdate(
            {username: req.body.username},
            {$inc: {'wins': 1}}).exec();

        } else {
            await gameSchema.findOneAndUpdate(
            {username: req.body.username},
            {$inc: {'losses': 1}}).exec();
        }
        res.json({status: 'success', error: ''});
    } catch (error) {
        res.json({status: 'error', error: error});
    }
})



export default router;