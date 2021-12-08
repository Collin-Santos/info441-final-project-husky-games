async function getIdentity() {
    try {
        let response = await fetch('users/identity')
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        console.log("Error getting identity")
        return { status: "error", error: "not logged in"}
    }
}

async function updateDisplayName(name) {
    try {
        let response = await fetch('users/displayname',
        {
            method: "POST",
            body: JSON.stringify(name),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let responseJson = response.json()
        return responseJson
    } catch (error) {
        return { status: 'error', error: 'an error occured :(' }
    }
}

async function getLeaderboardUser(user, game) {
    try {
        let response = await fetch(`leaderboard/${user}/${game}`)
        let responseJson = await response.json()
        return responseJson
    } catch (error) {
        return { status: 'error', error: 'an error occured :(' }
    }
}

async function setdisplayname(displayname) {
    try {
        let response = await fetch('users/setdisplayname',
        {
            method: "POST",
            body: JSON.stringify(displayname),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let responseJson = response.json()
        return responseJson
    } catch (error) {
        return { status: 'error', error: 'an error occured :(' }
    }
}

async function reportGame(status, tie) {
    try {
        let response = await fetch('leaderboard/tictactoe',
        {
            method: "POST",
            body: JSON.stringify({
                won: status,
                tie: tie
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        let responseJson = response.json()
        return responseJson
    } catch (error) {
        return { status: 'error', error: 'error reporting game :('}
    }
}

async function getLeaderboard() {
    try {
        let response = await fetch("/leaderboard/tictactoe?topN=10");
        let responseJson = response.json();
        return responseJson;
    } catch (error) {
        return {status: 'error', error: 'Error getting the leaderboard: ' + error};
    }
}

window.getIdentity = getIdentity
window.updateDisplayName = updateDisplayName
window.getLeaderboardUser = getLeaderboardUser
window.setdisplayname = setdisplayname
window.reportGame = reportGame
window.getLeaderboard = getLeaderboard