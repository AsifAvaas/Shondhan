const express = require('express');
const router = express.Router();
const services = require('../services/emergencyServiceData'); 
console.log(services);
router.get('/services', (req, res) => {
    res.json(services);
});

module.exports = router;
