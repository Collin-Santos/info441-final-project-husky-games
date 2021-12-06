# To Do List

## Websocket - Server
- refactor if possible
- return displayname with connect payload
- update chat payload from id to displayname

## Websocket - Client
- Cleanup on game completion
  - Win/loss/tie animation
  - Remove alerts
  - Add research button

## General HTML
- Fix navbar

## Home Page
- Add login button for azure
  - Allow user handle updates
    - stored on mongodb
- Add guest login button
  - Assign display name 'Guest' to the user

## Game Page
- Better html

## Leaderboards Page
- Call and display GET /top on load
- Add button to display your name if logged in
  - Only rendered if logged in
  - Routed to GET /user?username="loggedUserName"
- Add search field for user with action button
  - Routed to GET /user?username="fieldValue"

## Leaderboards API
- Endpoints
  - GET /top : return top 25 users for wins
  - GET /user?username="username" : return full stats for queried user
  - DELETE /forget : delete user defined in body from leadeboards
    - NOTE: Must be logged as user
  - POST /add : add username to database with 0'd stat values
  - POST /report : update username stats for server
    - body.username : String > target user
    - body.game : Boolean > true for win, false for loss
    - NOTE: Only called from server?