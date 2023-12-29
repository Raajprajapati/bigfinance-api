const Player = require('../models/playerSchema.js');

// get all the players
const getPlayers = async (req, res) => {
    try {
        const players = await Player.find().sort({ score: -1 });
        return res.send({
            success: true,
            message: "successful",
            data: players
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

// save the player into database
const saveplayerData = async (req, res) => {
    try {
        new Player(req.body).save();
        res.status(201).send({
            sucess: true,
            message: "Sucessfull",
        });
    } catch (error) {
        res.status(400).send({
            sucess: false,
            error: error.message
        });
    }
}

// update the player score and name
const updatePlayerData = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                score: req.body.score
            }
        },
            { new: true }
        );
        if (!player) {
            throw new Error('Player not found');
        }
        res.status(201).send({
            success: true,
            player
        });

    } catch (error) {
        res.status(404).send({
            sucess: false,
            error: error.message
        });
    }
}

// delete a player by given id
const deletePlayer = async (req, res) => {
    const { id } = req.params;
    try {
        const player = await Player.findByIdAndDelete(id);

        if (!player) {
            throw new Error('Player not found');
        }
        res.status(200).send({
            sucess: true,
            message: 'Player deleted successfully'
        });
    } catch (error) {
        res.status(404).send({
            sucess: false,
            error: error.message
        });
    }
}


// get a player by its rank
const getPlayerbyRank = async (req, res) => {
    const { val } = req.params;
    try {
        const player = await Player.findOne().sort({ score: -1 }).skip(val - 1);

        if (!player) {
            throw new Error('Player not found');
        }
        res.status(200).send({
            success: true,
            player
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            error: error.message
        });
    }
}

// get a random player 
const getRandomPlayer = async (req, res) => {
    try {
        const randomPlayer = await Player.aggregate([{ $sample: { size: 1 } }]);

        if (!randomPlayer) {
            throw new Error('Player not found');
        }

        res.status(200).send({
            success: true,
            randomPlayer
        });

    } catch (error) {
        res.status(404).send({
            success: false,
            error: error.message
        });
    }
}

module.exports = { saveplayerData, updatePlayerData, deletePlayer, getPlayers, getPlayerbyRank, getRandomPlayer }