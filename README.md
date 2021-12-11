# Info 441 - Husky Games Center

__Authors:__ Ghislaine Bungingo, Bryan Phan, Collin Santos, Neema Shokri

# Website
https://huskygamecenter.azurewebsites.net/

# Project Description

## Overview

Our project will be about creating a website that students can play games on in real time. We will focus on Tic-Tac-Toe, adding features and new game modes as we go.

## Target Audience

Our target audience are UW students who want to play games in their spare time between classes. We envision that UW students use our application as a way to relax and fill time when they are done with assignments or just need a way to relax.

## Audience Use Case

Imagine you’re a bored UW student sitting in the HUB with absolutely nothing to do. All of a sudden you have an urge to play some tic-tac-toe, checkers, etc. with your fellow Huskies. Well now you can since a wonderful group of students from Info 441 created the Husky Games Center for all your board game needs. To add on, we gave users the luxury to buy custom skins so they could put their personalities on full display and stand out.

## Development Reasoning

We want to create something that is real time and interactive for our users. As developers, we also think it would be a much more interesting challenge to create, allowing us to expand upon the idea and implement new features as time permits. We also are seeking to create something that requires a little more technical skill in order to expand our skill sets.

# Technical Description

## Architecture and Action Diagram

![architecture diagram](diagrams/architecture-action-diagram.jpg?raw=true)
[Link](https://miro.com/app/board/o9J_ljp5vo8=/?invite_link_id=3707674303)

- Client: 
  - Handles inputs for the game, renders the current state of the game, the current logged user, and the current any relevant statistics to at the time.
  - First iteration will be done using basic HTML/CSS, with Javascript for API calls and interactions.
  - As time permits, we may convert to React.js for a better user experience.
- Server: 
  - The server would process the inputs for the user and relay them between clients. 
  - Users will be connected by a websocket to the server and paired using a matchmaking process.
  - The current gamestate would be saved on the server, including handling game logic whenever a new move is made.
  - On game end, the server would log results into the database and inform the client-end of game completion. In the case of an error, both clients will be disconnected.
  - Authentication will be done using Azure, only permitting in-organization users.
- Database: 
  - Database will be hosted on Mongodb as a NoSQL database.
  - Data entry will be keyed using user ids, storing general stats such as games played, wins, losses, disconnects, etc. as incrementable counters.
  - _(Extra)_ Game states with disconnects will be saved on the database. If users reconnect within a timeframe, the game state can be restored. Once enough time has elapsed, the game state will be wiped and player statistics updated.
  - _(Extra)_ On game completion, game moves will be pushed as an entry on the database and given a match id. This could allow us to implement a replay system.

## Interaction Architecture
![interaction architecture](diagrams/Interaction_Architecutre.jpg?raw=true)

## Workflow
![workflow](diagrams/workflow.jpg?raw=true)

## Feature Priorites

| Priority | User | Description | Technical Implementation |
|---|---|---|---|
| P0 | As a student | I want to play Tic-Tac-Toe games in-between lectures | Host a website on __Azure__, adding a server written in __Node.js__ to handle interactions. Pair players on server, communicate game moves through __WebSockets__. Process game logic on server and render changes using __Javascript__ |
| P1 | As a player | I want feedback on my actions | Expand client end to handle __async API__ requests and change client view based on __JSON__ returns |
| P2 | As a Husky | I want to play with other students | Redirect users using __Express__ to login using a MS account through __Azure__. Permit players to matchmake on in-org login, deny otherwise. |
| P3 | As a player | I want to see how well I’m doing | On game completion, server pushes win/loss to a __MongoDb__ hosted database. If no user exists, the user is added to the database. Users' win/loss counter is incremented and success status is sent to the server. |
| P4 | As players | We want to talk during our match | Add secondary functionality on __WebSocket__ connection to send messages between players. Add UI element chat box to render chat for clients. |
| P5 | As a player | I want to play checkers instead of Tic-Tac-Toe | Create and test game logic using __Javascript__ that can be hosted on the server. Add separate __API__ endpoints to handle new logic. Add secondary matchmaking queue, repurpose existing __WebSocket__ logic from Tic-Tac-Toe |
| P6 | As a player | I want to the way my game looks | Create new assets for displaying tokens. Add settings menu to choose rendered assets. Add __PayPal__ to sell asset access. Save access rights to separate __MongoDb__ table. Render new assets based on settings. |
| P7 | As a community | We want to discuss the stie | Create a discussion forum for users. Store posts and replies to separate __MongoDb__ table. Add UI to view posts, create posts, and make replies. |
| P8 | As a developer | I want to create something requiring more logic | Create game logic for chess. Follow same implementation as checkers |
| P9 | As a player | I want to see my past matches | Store match and input history to new __MongoDb__ table. Assing a match id and extra data. Add a new __API__ endpoint to request match history. Add render logic for game on client end. |

## User Story

- User story: Bob - UW Sophomore
  - Bob just finished his 10:30 lecture and heads to the library to wait for the upcoming 3:30 lecture. After finishing up all of the pending assignments, Bob wants to kill time while waiting around. He starts up Husky Games Center and matchmakes for a couple games of checkers. Topping the current daily leaderboard, Bob logs out of Husky Games Center and heads to his 3:30 lecture.

## API Endpoints

### Authentication
- /signin
  - Handle user authentication through Azure
- /signout
  - Delete the users current session and sign them out
- /error
  - Handle login and general server errors that may occur
- /unauthorized
  - Deny access to matchmaking if not logged into a UW Mircosoft account

### Users : /users/
- GET
  - /
    - return current user of session
  - /identity
    - returns preferred display name and info of logged user
  - /add
    - add recently logged user to database and returns to home page
- POST
  - /displayname
    - updates logged users preferred displayname
  - /setdisplayname
    - sets preferred name into curren session
    - used to track in games without database calls

### Leaderboards : /leaderboard/
- GET
  - /:user/:game?topN=Integer
    - returns player stats of a given user for a given game
  - /:game
    - sends back top N users of the specified game by total wins
    - default topN = 10
- POST
  - /:game
    - reports game statistics for logged user

### Websocket
Commands to websockets are issued in the form of stringified JSON messages of style:
```
{
  action: "action",
  value: "value"
}
```
- On : __OPEN__
  - Initializes websocket
  - Adds websocket to matchmaking queue
  - Updates matchmaking queue
    - Relays update info to clients on pairing
- On : __MESSAGE__
  - _action_ : 'chat'
    - send a message to opponent which is displayed in the chatbox
  - _action_ : 'forfeit'
    - concede the current game, counting as a loss
    - both sockets are immediately closed and opponent issued a win
  - _action_ : 'token'
    - return the senders assigned token
  - _action_ : 'makeMove'
    - attempts a move from the user, rejected if invalid
    - see above __Workflow__ diagram for logical information
- On : __CLOSE__
  - removes current game from server memory
  - issues notifications to opponent of closure
  - removes and force closes opponents socket

## Implementation Strategy

- Our Technical Implementation strategy:
  - Mongodb for our database
    - Saves wins and losses to track leaderboard statistics
    - If time, we will use Mongodb to save states and restore sessions in the event that a user disconnects or closes their tab.
  - Javascript, HTML, CSS for our website and games
    - We will be using Javascript with HTML/CSS to handle interactions between the client end and server such as moves and API calls.
  - Azure
    - We will be using Azure to handle the general hosting and deployment of our app
    - Account authorization will be handled through Azure. This will allow us to keep the game within the UW organization as well.
  - Node.js for server and React.js for front end
    - API and server routing will be handled using Express in Node.js
    - Front-end will be handled using React.js

## Database Schema

### User Statistics - NoSQL MongoDb
- __UserId__: Key
- __Matches__: Integer
- __Wins__: Integer
- __Losses__: Integer
- __Disconnects__: Integer
- __History__: JSON
  - __MatchId__: MatchId (Foreign Key)
  - __Date__: Date
  - __Opponent__: UserId (Foreign Key)
  - __Winner__: UserId (Foreign Key)

  Github bot test
  