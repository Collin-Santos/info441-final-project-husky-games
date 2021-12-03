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
        assert.deepEqual(tictactoe('o.......x', '........x'), Object.assign({}, baseJson, {
            gameState: "o.......x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('o......xx', 'o.......x'), Object.assign({}, baseJson, {
            gameState: "o......xx",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('oo.....xx', 'o......xx'), Object.assign({}, baseJson, {
            gameState: "oo.....xx",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('oo....xxx', 'oo.....xx'), Object.assign({}, baseJson, {
            gameState: "oo....xxx",
            lastTurn: "x",
            gameWon: true
        }))
    })

    it('Should Win - Vertical', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJson, {
            gameState: "........x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('o.......x', '........x'), Object.assign({}, baseJson, {
            gameState: "o.......x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('o....x..x', 'o.......x'), Object.assign({}, baseJson, {
            gameState: "o....x..x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('oo...x..x', 'o....x..x'), Object.assign({}, baseJson, {
            gameState: "oo...x..x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('oox..x..x', 'oo...x..x'), Object.assign({}, baseJson, {
            gameState: "oox..x..x",
            lastTurn: "x",
            gameWon: true
        }))
    })

    it('Should Win - Diagonal', () => {
        assert.deepEqual(tictactoe('......x..', '.........'), Object.assign({}, baseJson, {
            gameState: "......x..",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('o.....x..', '......x..'), Object.assign({}, baseJson, {
            gameState: "o.....x..",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('o...x.x..', 'o.....x..'), Object.assign({}, baseJson, {
            gameState: "o...x.x..",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('oo..x.x..', 'o...x.x..'), Object.assign({}, baseJson, {
            gameState: "oo..x.x..",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('oox.x.x..', 'oo..x.x..'), Object.assign({}, baseJson, {
            gameState: "oox.x.x..",
            lastTurn: "x",
            gameWon: true
        }))
    })

    it('Should Win - P2 Wins', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJson, {
            gameState: "........x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('o.......x', '........x'), Object.assign({}, baseJson, {
            gameState: "o.......x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('o......xx', 'o.......x'), Object.assign({}, baseJson, {
            gameState: "o......xx",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('oo.....xx', 'o......xx'), Object.assign({}, baseJson, {
            gameState: "oo.....xx",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('oo...x.xx', 'oo.....xx'), Object.assign({}, baseJson, {
            gameState: "oo...x.xx",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('ooo..x.xx', 'oo...x.xx'), Object.assign({}, baseJson, {
            gameState: "ooo..x.xx",
            lastTurn: "o",
            gameWon: true
        }))
    })
})

describe('Tic Tac Toe - Tie', () => {
    const baseJson = {
        valid: true,
        gameState: "",
        lastTurn: "",
        gameWon: false,
        tied: false
    }

    it('Should Tie', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJson, {
            gameState: "........x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('....o...x', '........x'), Object.assign({}, baseJson, {
            gameState: "....o...x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('..x.o...x', '....o...x'), Object.assign({}, baseJson, {
            gameState: "..x.o...x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('..x.oo..x', '..x.o...x'), Object.assign({}, baseJson, {
            gameState: "..x.oo..x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('..xxoo..x', '..x.oo..x'), Object.assign({}, baseJson, {
            gameState: "..xxoo..x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('..xxooo.x', '..xxoo..x'), Object.assign({}, baseJson, {
            gameState: "..xxooo.x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('.xxxooo.x', '..xxooo.x'), Object.assign({}, baseJson, {
            gameState: ".xxxooo.x",
            lastTurn: "x"
        }))
        assert.deepEqual(tictactoe('oxxxooo.x', '.xxxooo.x'), Object.assign({}, baseJson, {
            gameState: "oxxxooo.x",
            lastTurn: "o"
        }))
        assert.deepEqual(tictactoe('oxxxoooxx', 'oxxxooo.x'), Object.assign({}, baseJson, {
            gameState: "oxxxoooxx",
            lastTurn: "x",
            tied: true
        }))
    })
})

describe('Tic Tac Toe - Fail', () => {
    const baseJsonOk = {
        valid: true,
        gameState: "",
        lastTurn: "x",
        gameWon: false,
        tied: false
    }
    
    const baseJsonFail = {
        valid: false,
        gameState: "",
        gameWon: false,
        tied: false
    }

    it('Should Fail - Overwrite Move', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJsonOk, {
            gameState: "........x"
        }))
        assert.deepEqual(tictactoe('........o', '........x'), Object.assign({}, baseJsonFail, {
            gameState: "........x"
        }))
    })

    it('Should Fail - Double Move', () => {
        assert.deepEqual(tictactoe('........x', '.........'), Object.assign({}, baseJsonOk, {
            gameState: "........x"
        }))
        assert.deepEqual(tictactoe('......oox', '........x'), Object.assign({}, baseJsonFail, {
            gameState: "........x"
        }))
    })
})