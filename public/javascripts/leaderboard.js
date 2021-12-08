async function loadLeaderboard() {
    let leaderboardUsers = await getLeaderboard();
    let rank = 1;
    let leaderboardUsersHtml = leaderboardUsers.map(user => {
        let userHtml = `
        <tr class="highlight">
            <th scope="row">${rank}</th>
            <td>${user.username}</td>
            <td>${user.wins}</td>
            <td>${user.losses}</td>
            <td>${user.ties}</td>
        </tr>       
        `
        rank++;
        return userHtml;
    }).join("");
    console.log(leaderboardUsersHtml)
    document.getElementById("leaderboard-body").innerHTML = leaderboardUsersHtml;
}
