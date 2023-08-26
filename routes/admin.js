const express = require('express');
const router = express.Router();

const requestController = require('../controllers/admin')


router.get('/:userID', requestController.getUserDataFromServer);

router.get('/', requestController.getAllDataFromServer);


router.post('/', requestController.postDataFromClientToServer);

router.delete('/:userID',requestController.deleteDataFromServer);


module.exports = router;