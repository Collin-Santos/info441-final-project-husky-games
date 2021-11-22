/* Game logic for a tictactoe game
 *  Expected:
 *      playerState: String = user changed game state as 9 character string
 *      gameSatate: String = last valid game state
 *  Returns JSON object:
 *      On invalid move:       
 *          {
 *              valid: false,
 *              gameState: gameState
 *          }
 * 
 *      On valid move:
 *          {
 *              valid: true,
 *              gameState: playerState,
 *              lastTurn: String representation of last token used,
 *              gameWon: Boolean defining if game has been won
 *          }
 * 
*/
function tictactoe(playerState, gameState) {
    let validation = validateMove(playerState, gameState)
    if (validation.valid) {
        let newGameState = {
            valid: true,
            gameState: playerState,
            lastTurn: validation.token,
            gameWon: false,
            tied: false
        }
        if (checkHorizontal(playerState, validation.token, validation.index) ||
            checkVertical(playerState, validation.token, validation.index) ||
            checkDiagonal(playerState, validation.token, validation.index)) {
            newGameState.gameWon = true
        } else if (checkTie(playerState)) {
            newGameState.tied = true
        }
        return newGameState
    } else {
        return validation
    }
}

function validateMove(playerState, gameState) {
    if (playerState.length != 9 || gameState.length != 9) {
        return({
            valid: false,
            gameState: gameState,
            gameWon: false,
            tied: false
        })
    } else {
        let changeCount = 0
        let changeIndex = -1
        let changeToken = '.'
        for (let index = 0; index < 9; index++) {
            if (playerState.charAt(index) != gameState.charAt(index)) {
                if (gameState.charAt(index) == '.') {
                    changeIndex = index
                    changeToken = playerState.charAt(index)
                    changeCount++
                } else {
                    return({
                        valid: false,
                        gameState: gameState,
                        gameWon: false,
                        tied: false
                    })
                }
            }

            if (changeCount > 1) {
                return({
                    valid: false,
                    gameState: gameState,
                    gameWon: false,
                    tied: false
                })
            }
        }
        return({
            valid: true,
            index: changeIndex,
            token: changeToken
        })
    }
}

function checkHorizontal(playerState, token, index) {
    const row1 = [0, 1, 2]
    const row2 = [3, 4, 5]
    const row3 = [6, 7, 8]

    return (checkSet(row1, playerState, token, index) ||
            checkSet(row2, playerState, token, index) ||
            checkSet(row3, playerState, token, index))
}

function checkVertical(playerState, token, index) {
    const col1 = [0, 3, 6]
    const col2 = [1, 4, 7]
    const col3 = [2, 5, 8]

    return (checkSet(col1, playerState, token, index) ||
            checkSet(col2, playerState, token, index) ||
            checkSet(col3, playerState, token, index))
}

function checkDiagonal(playerState, token, index) {
    const diag1 = [0, 4, 8]
    const diag2 = [2, 4, 6]
    
    return (checkSet(diag1, playerState, token, index) ||
            checkSet(diag2, playerState, token, index))
}

function checkSet(indexSet, playerState, token, index) {
    if (indexSet.includes(index)) {
        let state = true
        indexSet.forEach(i => {
            if(playerState.charAt(i) != token) {
                state = false
            }
        })
        return state
    } else {
        return false
    }
}

function checkTie(gameState) {
    let isTie = true
    for (let index = 0; index < gameState.length; index++) {
        if(gameState.charAt(index) == '.') {
            isTie = false
        }
    }
    return isTie
}

// -----------------------------------------------------------------------
// unit tests

function runTests() {

    playTestOne()
    playTestTwo()
    playTestThree()
    playTestFour()
    playTestFive()

    failTestOne()
    failTestTwo()

    // Play game: Horizontal win
    function playTestOne() {
        console.log("playTest : hori win")
        console.log(tictactoe('........x', '.........'))
        console.log(tictactoe('o.......x', '........x'))
        console.log(tictactoe('o......xx', 'o.......x'))
        console.log(tictactoe('oo.....xx', 'o......xx'))
        console.log(tictactoe('oo....xxx', 'oo.....xx'))
    }

    // Play game: Vertical win
    function playTestTwo() {
        console.log("playTest : vert win")
        console.log(tictactoe('........x', '.........'))
        console.log(tictactoe('o.......x', '........x'))
        console.log(tictactoe('o....x..x', 'o....x..x'))
        console.log(tictactoe('oo...x..x', 'o....x..x'))
        console.log(tictactoe('oox..x..x', 'oo...x..x'))
    }

    // Play game: Diagonal win
    function playTestThree() {
        console.log("playTest : diag win")
        console.log(tictactoe('......x..', '.........'))
        console.log(tictactoe('o.....x..', '......x..'))
        console.log(tictactoe('o...x.x..', 'o.....x..'))
        console.log(tictactoe('oo..x.x..', 'o...x.x..'))
        console.log(tictactoe('oox.x.x..', 'oo..x.x..'))
    }

    // Play game: P2 wins
    function playTestFour() {
        console.log("playTest : p2 wins")
        console.log(tictactoe('........x', '.........'))
        console.log(tictactoe('o.......x', '........x'))
        console.log(tictactoe('o......xx', 'o.......x'))
        console.log(tictactoe('oo.....xx', 'o......xx'))
        console.log(tictactoe('oo...x.xx', 'oo.....xx'))
        console.log(tictactoe('ooo..x.xx', 'oo...x.xx'))
    }

    // Overwrite move
    function failTestOne() {
        console.log("failTestOne")
        console.log(tictactoe('........x', '.........'))
        console.log(tictactoe('........o', '........x'))
    }

    // Double move
    function failTestTwo() {
        console.log("failTestTwo")
        console.log(tictactoe('........x', '.........'))
        console.log(tictactoe('......oox', '........x'))
    }
}

// -----------------------------------------------------------------------

export default tictactoe