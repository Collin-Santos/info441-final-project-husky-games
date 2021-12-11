import express from 'express';
var router = express.Router();

// GET users listing
//Get the user that is currently logged in
router.get('/', function(req, res) {
    let session = req.session;
    if (session && session.isAuthenticated) {
      res.json({
        status: "loggedin",
        userInfo: {
          name: session.account.name,
          username: session.account.username
        }
      })
    } else {
      res.json({status: "loggedout"});
    }
});

// GET /users/identity : returns preferred display name and info
//                        of logged user
router.get('/identity', async (req, res) => {
  let session = req.session
  if (session.isAuthenticated) {
    try {
      let loggedUser = await req.db.Player.findOne(
        { username: session.account.username }).exec()
      res.json(loggedUser)
    } catch (error) {
      res.json({
        status: "error",
        error: "not logged in"
      })
    }
  } else {
    res.json({
      status: "error",
      error: "not logged in"
    })
  }
})

// POST /users/displayname : updates logged users preferred displayname
router.post('/displayname', async (req, res) => {
  let session = req.session
  if (session.isAuthenticated) {
    try {
      let newDisplayName = req.body.username
      await req.db.Player.findOneAndUpdate(
        { username: session.account.username },
        { $set: { displayname: newDisplayName } })
      
      res.json({
        status: 'success',
        error: 'display name updated'
      })
      
    } catch (error) {
      res.json({
        status: 'error',
        error: 'server error occured'
      })
    }
  } else {
    res.json({
      status: 'error',
      error: 'not logged in'
    })
  }
})

// POST /users/setdisplayname : sets preferred name into current session
router.post('/setdisplayname', async (req, res) => {
  let session = req.session
  if (session) {
    session.gamedisplayname = req.body.displayname
    res.json({status: "success"})
  } else {
    res.json({status: "error", error: "no session found"})
  }
})


/* GET users */
// Adds user to users database if the user isn't already in the database
router.get('/add', async (req, res) => {
  let session = req.session;
  let Player = req.db.Player
  let TicTacToe = req.db.TicTacToe
  if (session && session.isAuthenticated) {
    try {
         const newPlayer = {
         username: session.account.username,
         displayname: session.account.name
       }
       const newGame = {
         username: session.account.username,
         wins: 0,
         losses: 0,
         ties: 0
       }
       const options = {
         upsert: true
       }
       
       await Player.findOneAndUpdate(
         { username: session.account.username },
         { $setOnInsert: newPlayer },
         options)

       await TicTacToe.findOneAndUpdate(
         { username: session.account.username},
         { $setOnInsert: newGame },
         options
       )
    } catch (error) {
      console.log(error.message)
      console.log('Issue Saving New User To Database')
    }
  }
  res.redirect('/')
});
export default router;
