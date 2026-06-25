const partyService = require('../services/party.service');

exports.getAllParties = async (req, res, next) => {
    try {
        const parties = await partyService.getAllParties();
        res.json(parties);
    } catch (error) {
        next(error);
    }
};

exports.getPartyById = async (req, res, next) => {
    try {
        const party = await partyService.getPartyById(req.params.id);
        res.json(party);
    } catch (error) {
        next(error);
    }
};

exports.createParty = async (req, res, next) => {
    try {
        const party = await partyService.createParty(req.body);
        res.status(201).json(party);
    } catch (error) {
        next(error);
    }
};