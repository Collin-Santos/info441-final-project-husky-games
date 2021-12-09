async function loadGreeting() {
    let userInfo = await getIdentity()
    if (userInfo.status != "error") {
        let gamesInfo = null
        try {
            gamesInfo = await getLeaderboardUser(userInfo.username, 'tictactoe')
        } catch (error) {
            console.log("something went wrong getting games :(")
        }

        document.getElementById("greeting-container").innerHTML = `
        <h1 id="index_greeting">Welcome Back, ${userInfo.displayname}!</h1>
        <input type="text" id="new_username_input"/>
        <button onclick="buttonUpdateUsername()" id="button_update_name">Update Username</button>
        <h2>My Tic-Tac-Toe Record</h2>
        <p>Wins: ${gamesInfo ? gamesInfo.wins : "Could not retrieve :("}</p>
        <p>Losses: ${gamesInfo ? gamesInfo.losses : "Could not retrieve :("}</p>
        <p>Ties: ${gamesInfo ? gamesInfo.ties : "Could not retireve :("}</p>
        `
        document.getElementById("new_username_input").addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                document.getElementById("button_update_name").click()
            }
        })

    } else {
        document.getElementById("greeting-container").innerHTML = `
        <h1>Welcome Guest!</h1>
        <p>Welcome to the Husky Games Center, the premier location to play real time board games with your classmates.</p>
        <p>You're not currently signed in, don't worry you can still play.</p>
        <p>But if you connect with your UW account you'll be able to:</p>
        <ul>
            <li>Track your win statistics against other players</li>
            <li>Display your record on the leadeboards</li>
            <li>Set your display name for others to see</li>
        </ul>
        <p>Login to get started now!</p>
        <a class="btn btn-outline-success my-2 my-sm-0" href="/signin">Login</a>`
    }
}

async function buttonUpdateUsername() {
    let newUsername = document.getElementById("new_username_input").value
    if (newUsername.length != 0) {
        try {
            let response = await updateDisplayName({username: newUsername})
            if (response.status == "success") {
                document.getElementById("index_greeting").innerHTML =
                `Welcome Back, ${newUsername}!`
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}

window.loadGreeting = loadGreeting
window.buttonUpdateUsername = buttonUpdateUsername

