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
        return { status: 'error', error: 'an error occured :('}
    }
}

window.getIdentity = getIdentity
window.updateDisplayName = updateDisplayName