async function loadNavbar() {
    let identity = await loadIdentityApi();
    console.log(identity.status);
    let loginOrOut = (identity.status == "loggedout") ?
      `<a class="btn btn-outline-success my-2 my-sm-0" href="/signin">Login</a>` :
      `<a class="btn btn-outline-danger my-2 my-sm-0" href="/signout">Log out</a>`;

    document.getElementById('navbar-container').innerHTML = `
    <a class="navbar-brand" href="/">Husky Games Center</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" id="nav-home-button">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" id="nav-tic-button">
          <a class="nav-link" href="/tictactoe">Tic-Tac-Toe</a>
        </li>
        <li class="nav-item" id="nav-leader-button">
          <a class="nav-link" href="/leaderboards">Leaderboards</a>
        </li>
      </ul>
      ${loginOrOut}
    </div>`
    assignUrl()
}

async function loadIdentityApi() {
  try {
    let response = await fetch('/users');
    let responseJson = await response.json();
    return responseJson;
  } catch(err) {
    return {
      status: "error",
      error: "There was an error calling identity API: " + err
    };
  }
}

function assignUrl() {
    const currentUrl = document.URL
    if (currentUrl.includes('tictactoe')) {
        document.getElementById('nav-tic-button').classList.add('active')
    } else if (currentUrl.includes('leaderboards')) {
        document.getElementById('nav-leader-button').classList.add('active')
    } else {
        document.getElementById('nav-home-button').classList.add('active')
    }
}

window.loadNavbar = loadNavbar