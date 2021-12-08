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

window.getIdentity = getIdentity