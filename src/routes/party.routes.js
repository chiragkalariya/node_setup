const router = require('express').Router();
const partyController = require('../controllers/party.controller');
const { validateParty } = require('../validation/party.validation');

router.get('/', partyController.getAllParties);
router.get('/:id', partyController.getPartyById);
router.post('/', validateParty, partyController.createParty);

module.exports = router;