const express = require('express');
const {
  getAllRooms,
  createRoom,
  getAvailableSlots,
} = require('../controllers/roomController');

const router = express.Router();

router.get('/', getAllRooms);
router.post('/', createRoom);
router.get('/:slug/available', getAvailableSlots); // Endpoint to get available slots

module.exports = router;
