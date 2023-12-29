const express = require('express');
const connectDB = require('./db/connection.js');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const {getPlayerbyRank, getPlayers, updatePlayerData, getRandomPlayer, deletePlayer, saveplayerData} = require('./controllers/playerController.js')

// environment variables configuration
dotenv.config({path: './.env'})

// middlewares
app.use(express.json());
app.use(cors()) //to avoid cross orgin errors

// database connection
connectDB();

// get players data:  GET /players
app.get('/players', getPlayers);

// add a new player:  POST /players
app.post('/players', saveplayerData);

// update players data: PUT /players/:id
app.put('/players/:id', updatePlayerData);

// delete a player: DELETE /players/:id
app.delete('/players/:id', deletePlayer);

// get player by rank:  GET /players/rank/:val
app.get('/players/rank/:val', getPlayerbyRank );

// get a rnadom player:  GET /players/random
app.get('/players/random', getRandomPlayer);

// Start the server
app.listen(process.env.PORT, () => {
  console.log("server is running on port 8000");
})