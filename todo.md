# To Do List

## Websocket - Server
- Cleanup on game completion
  - Close sockets
  - Send notice of closure
  - Remove gamestate from memory
  - Remove websocket from memory
- Client closure
  - Remove websocket from memory
  - Remove websocket from matchmaking queue (if exists)
  - Dispatch foreit game logic to opponent
  - Remove gamestate from memory (if exists)

## Websockt - Client
- Cleanup on game completion
  - Win/loss/tie animation
  - Dispatch close websocket commands
  - Remove alerts
  - Add research button

## Home Page
- Add login button for azure
  - Allow user handle updates
    - stored on mongodb
- Add guest login button
  - Assign name 'Guest ${websocket.id}

## Game Page

## Leaderboards Page

## Leaderboards API