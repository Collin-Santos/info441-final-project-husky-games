import express from 'express';
var router = express.Router();

/* GET users listing. */
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

export default router;
