import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/tic-tac-toe', function(req, res, next) {
  res.render('tictactoe', { title: 'Tic Tac Toe' });
})

export default router;
