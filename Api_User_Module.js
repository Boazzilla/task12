const mongoose = require('mongoose');

const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const RoomType = mongoose.model('RoomType', roomTypeSchema);

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: 'RoomType', required: true },
  price: { type: Number, required: true },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = { RoomType, Room };
const express = require('express');
const router = express.Router();


const { RoomType, Room } = require('./models');

router.post('/api/v1/room-types', async (req, res) => {
  try {
    const roomType = await RoomType.create(req.body);
    res.status(201).json(roomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/api/v1/room-types', async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;
