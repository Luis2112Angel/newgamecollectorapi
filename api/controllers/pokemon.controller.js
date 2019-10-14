'use strict';

var controllerHelper = require('../helpers/controller.helper');
const {Pokemons} = require('../models');

// Module Name
const MODULE_NAME = '[Pokemon Controller]';
// Error Messages
const P_CT_ERR_POKEMON_NOT_FOUND = 'Pokemon not found';
// Success Messages
const P_CT_DELETED_SUCCESSFULLY = 'Pokemon deleted successfully';

function getPokemons(req, res) {
    try {

        Pokemons.findAll()
            .then(pokemonList => res.status(200).send(pokemonList))
            .catch(error => res.status(500).send(error));

    } catch (error) {
        console.log("Was an error");
        console.log(error);
        controllerHelper.handleErrorResponse(MODULE_NAME, getPokemons.name, error, res);
    }
}

function createPokemon(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var parameters = req.body;

        return Pokemons.create({
            name: parameters.name,
            des: parameters.des,
            imageLink: parameters.imageLink,
            power: parameters.power,
            locationLat: parameters.locationLat,
            locationLong: parameters.locationLong,
            isCatch: parameters.isCatch
        }).then(pokemon => res.status(201).send(pokemon))
            .catch(error => res.status(400).send(error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, createPokemon.name, error, res);
    }

}

function getPokemonById(req, res) {
    try {

        var id = req.swagger.params.id.value;

        Pokemons.findByPk(id)
            .then(pokemon => res.status(200).send(pokemon));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, getPokemonById.name, error, res);
    }
}

function deletePokemon(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    var id = req.swagger.params.id.value;

    Pokemons.findByPk(id).then(pokemon => {
        if (!pokemon) {
            res.status(200).send({"success": 0, "description": "not found !"});
        } else {
            return pokemon.destroy()
                .then(() => res.status(200).send({"success": 1, "description": "deleted!"}))
                .catch(() => res.status(403).send({"success": 0, "description": "error !"}));
        }
    }).catch(error => console.log("There was an error: " + error));
}

function updatePokemon(req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    try {

        var id = req.swagger.params.id.value;
        var parameters = req.body;

        Pokemons.findByPk(id).then(pokemon => {
            if (!pokemon) {
                res.status(401).send(({}));
            }
            return pokemon.update({
                name: parameters.name,
                des: parameters.des,
                imageLink: parameters.imageLink,
                power: parameters.power,
                locationLat: parameters.locationLat,
                locationLong: parameters.locationLong,
                isCatch: parameters.isCatch
            }).then(() => res.status(200).send(pokemon))
                .catch(error => res.status(403).send(pokemon));
        }).catch(error => console.log("There was an error: " + error));

    } catch (error) {
        console.log("Was an error");
        controllerHelper.handleErrorResponse(MODULE_NAME, updatePokemon.name, error, res);
    }
}

module.exports =
{
        getPokemons,
        getPokemonById,
        createPokemon,
        updatePokemon,
        deletePokemon,
        P_CT_ERR_POKEMON_NOT_FOUND,
        P_CT_DELETED_SUCCESSFULLY,
        MODULE_NAME
};
