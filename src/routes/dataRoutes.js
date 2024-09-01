const express = require('express');
const DataController = require('../controllers/dataController');

const router = express.Router();

router.post('/process', DataController.processData);

module.exports = router;
