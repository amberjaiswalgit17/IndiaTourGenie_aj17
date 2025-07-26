const router = require('express').Router();
const { generateItinerary } = require('../controllers/aiController');
const auth = require('../middleware/auth');
router.post('/generate', auth, generateItinerary);
module.exports = router;