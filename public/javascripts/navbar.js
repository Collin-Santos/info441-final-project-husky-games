function loadNavbar() {
    document.getElementById('navbar-container').innerHTML = `
    <a class="navbar-brand" href="/">Husky Games Center</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" id="nav-home-button">
          <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item" id="nav-tic-button">
          <a class="nav-link" href="/tictactoe.html">Tic-Tac-Toe</a>
        </li>
        <li class="nav-item" id="nav-leader-button">
          <a class="nav-link disabled" href="#">Leaderboards</a>
        </li>
      </ul>
      <a class="btn btn-outline-success my-2 my-sm-0" href="/signin">Login</a>
    </div>`
    assignUrl()
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