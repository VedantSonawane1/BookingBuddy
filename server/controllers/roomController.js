const Room = require('../models/roomModel.js');
const calendar = require('../google/calender.js'); // Google Calendar integration

// Get all rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms' });
  }
};

// Create a new room
const createRoom = async (req, res) => {
  const { name, capacity } = req.body;
  const newRoom = new Room({ name, capacity });

  try {
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: 'Error creating room' });
  }
};

// Get available slots for a room
const getAvailableSlots = async (req, res) => {
  const { slug } = req.params;
  console.log("slug : ",slug)
  try {
    const events = await calendar.getEvents(slug);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots' });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  getAvailableSlots,
};
