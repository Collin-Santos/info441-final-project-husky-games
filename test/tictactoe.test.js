import chai from 'chai'
let assert = chai.assert

import tictactoe from '../routes/tictactoe.js'

describe('Tic Tac Toe - Success', () => {
    const baseJson = {
        valid: true,
        gameState: "",
        lastTurn: "",
        gameWon: false,
        tied: false
    }

    it('Should Win - Horizontal', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJson, {
            gameState: "........x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('o.......x', '........x'), {

        })
        assert.deepEqual(tictactoe('o......xx', 'o.......x'), {

        })
        assert.deepEqual(tictactoe('oo.....xx', 'o......xx'), {

        })
        assert.deepEqual(tictactoe('oo....xxx', 'oo.....xx'), {

        })
    })

    it('Should Win - Vertical', () => {
        assert.deepEqual(tictactoe('........x', '.........'), {

        })
        assert.deepEqual(tictactoe('o.......x', '........x'), {

        })
        assert.deepEqual(tictactoe('o....x..x', 'o....x..x'), {

        })
        assert.deepEqual(tictactoe('oo...x..x', 'o....x..x'), {

        })
        assert.deepEqual(tictactoe('oox..x..x', 'oo...x..x'), {

        })
    })

    it('Should Win - Diagonal', () => {
        assert.deepEqual(tictactoe('......x..', '.........'), {

        })
        assert.deepEqual(tictactoe('o.....x..', '......x..'), {

        })
        assert.deepEqual(tictactoe('o...x.x..', 'o.....x..'), {

        })
        assert.deepEqual(tictactoe('oo..x.x..', 'o...x.x..'), {

        })
        assert.deepEqual(tictactoe('oox.x.x..', 'oo..x.x..'), {

        })
    })

    it('Should Win - P2 Wins', () => {
        assert.deepEqual(tictactoe('........x', '.........'), {

        })
        assert.deepEqual(tictactoe('o.......x', '........x'), {

        })
        assert.deepEqual(tictactoe('o......xx', 'o.......x'), {

        })
        assert.deepEqual(tictactoe('oo.....xx', 'o......xx'), {

        })
        assert.deepEqual(tictactoe('oo...x.xx', 'oo.....xx'), {

        })
        assert.deepEqual(tictactoe('ooo..x.xx', 'oo...x.xx'), {

        })
    })
})

describe('Tic Tac Toe - Tie', () => {
    it('Should Tie', () => {

    })
})

describe('Tic Tac Toe - Fail', () => {

    it('Should Fail - Overwrite Move', () => {
        assert.deepEqual(tictactoe('........x', '.........'),{

        })
        assert.deepEqual(tictactoe('........o', '........x'),{

        })
    })

    it('Should Fail - Double Move', () => {
        assert.deepEqual(tictactoe('........x', '.........'), {

        })
        assert.deepEqual(tictactoe('......oox', '........x'), {

        })
    })
})