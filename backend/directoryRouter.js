const express = require('express');
const router = express.Router();
const DirectoryController = require('./controllers/directoryController');

router.get(/(.*)/, DirectoryController.readDir);

module.exports = router;