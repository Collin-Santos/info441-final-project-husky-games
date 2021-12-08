async function loadGreeting() {
    let userInfo = await getIdentity()
    if (userInfo.status != "error") {
        let greetingInfo = `
        <h2>Welcome Back, ${userInfo.displayname}!</h2>
        `
        document.getElementById("greeting-container").innerHTML = greetingInfo
    }
}

window.loadGreeting = loadGreeting