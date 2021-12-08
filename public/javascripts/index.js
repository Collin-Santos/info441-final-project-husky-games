async function loadGreeting() {
    let userInfo = await getIdentity()
    if (userInfo.status != "error") {
        let greetingInfo = `
        <h2 id="index_greeting">Welcome Back, ${userInfo.displayname}!</h2>
        <input type="text" id="new_username_input" />
        <button onclick="buttonUpdateUsername()" id="button_update_name">Update Username</button>
        `
        document.getElementById("greeting-container").innerHTML = greetingInfo
        document.getElementById("new_username_input").addEventListener("keyup", (e) => {
            if (e.keyCode === 13) {
                e.preventDefault()
                document.getElementById("button_update_name").click()
            }
        })
    }
}

async function buttonUpdateUsername() {
    let newUsername = document.getElementById("new_username_input").value
    if (newUsername.length != 0) {
        try {
            let response = await updateDisplayName({username: newUsername})
            if (response.status == "success") {
                document.getElementById("index_greeting").innerHTML =
                `Welcome Back, ${newUsername}`
            }
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
}

window.loadGreeting = loadGreeting
window.buttonUpdateUsername = buttonUpdateUsername