async function loadLeaderboard() {
    let leaderboardUsers = await getLeaderboard();
    let rank = 1;
    console.log("Client Side:" + leaderboardUsers)
    let leaderboardUsersHtml = leaderboardUsers.map(user => {
        let userHtml = `
        <tr class="highlight">
            <th scope="row">${rank}</th>
            <td>${user.displayname}</td>
            <td>${user.wins}</td>
            <td>${user.losses}</td>
            <td>${user.ties}</td>
        </tr>       
        `
        rank++;
        return userHtml;
    }).join("");
    document.getElementById("leaderboard-body").innerHTML = leaderboardUsersHtml;
}
