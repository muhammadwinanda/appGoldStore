const express = require('express');
const router = express.Router();
const mitraController = require('../controllers/mitraController');

router.get('/dashboard', mitraController.viewDashboard);

module.exports = router;