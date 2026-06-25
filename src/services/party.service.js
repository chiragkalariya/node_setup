const { Party } = require('../models');

exports.getAllParties = async () => {
    return await Party.findAll({
        attributes: ['id', ['name', "Party Name"], ['mobile_number', "phone"], 'address'],
    });
};

exports.getPartyById = async (id) => {
    return await Party.findByPk(id);
};

exports.createParty = async (party) => {
    const existingParty = await Party.findOne({
        where: { name: party.name },
    });
    if (existingParty) {
        const error = new Error('Party already exists');
        error.statusCode = 400;
        throw error;
    }
    return await Party.create(party);
};