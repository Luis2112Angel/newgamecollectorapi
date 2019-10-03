'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Games} = require('../models');

// Module Name
const MODULE_NAME = '[Game Controller]';
// Error Messages
const G_CT_ERR_GAME_NOT_FOUND = 'Game not found';
// Success Messages
const G_CT_DELETED_SUCCESSFULLY = 'Game deleted successfully';

function getGames(req, res) {
    try {

        Games.findAll()
            .then(gameList => res.status(200).send(gameList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getGames.name, error, res);
    }
}

function createGame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Games.create({
            name: parameters.name,
            description: parameters.description,
            developer: parameters.developer,
            gamesystem: parameters.gamesystem,
            genre: parameters.genre,
            year: parameters.year
        }).then(game => res.status(201).send(game))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createGame.name, error, res);
    }

}

function getGameById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Games.findByPk(id)
            .then(game => res.status(200).send(game));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getGameById.name, error, res);
    }
}

function deleteGame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Games.findByPk(id).then(game => {
        if (!game) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return game.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updateGame(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Games.findByPk(id).then(game => {
            if (!game) {
                res.status(401).send(({}));
            }
            return game.update({
                name: parameters.name,
                description: parameters.description,
                developer: parameters.developer,
                gamesystem: parameters.gamesystem,
                genre: parameters.genre,
                year: parameters.year
            }).then(() => res.status(200).send(game))
                .catch(error => res.status(403).send(game));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updateGame.name, error, res);
    }
}

module.exports =
{
        getGames,
        getGameById,
        createGame,
        updateGame,
        deleteGame,
        G_CT_ERR_GAME_NOT_FOUND,
        G_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
