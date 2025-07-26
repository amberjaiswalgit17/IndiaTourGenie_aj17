const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const authenticate = require('../middleware/auth');

// Validate that these are actual functions
if (typeof tripController.saveTrip !== 'function') {
  throw new Error('tripController.saveTrip is not a function');
}
if (typeof authenticate !== 'function') {
  throw new Error('authenticate middleware is not a function');
}

// Routes
router.post('/save', authenticate, tripController.saveTrip);
router.get('/my-trips', authenticate, tripController.getMyTrips);

module.exports = router;
