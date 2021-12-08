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
        <h2 id="index_greeting">Welcome Back, ${userInfo.displayname}!</h2>
        <input type="text" id="new_username_input"/>
        <button onclick="buttonUpdateUsername()" id="button_update_name">Update Username</button>
        <p>Wins: ${gamesInfo ? gamesInfo.wins : "Could not retrieve :("}</p>
        <p>Losses: ${gamesInfo ? gamesInfo.losses : "Could not retrieve :("}</p>
        `
        document.getElementById("new_username_input").addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                document.getElementById("button_update_name").click()
            }
        })

    } else {
        document.getElementById("greeting-container").innerHTML = `
        <h2>Welcome Guest!</h2>
        <p>Here is a bunch of intro text</p>
        <p>Here is a bunch of info about benefits of signing in</p>
        <p>Here is a call to action</p>
        <p>Here is a button to signin through Microsoft</p>`
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