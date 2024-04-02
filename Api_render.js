import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IRoomType extends Document {
  name: string;
}

export interface IRoom extends Document {
  name: string;
  roomType: IRoomType['_id'];
  price: number;
}

const roomTypeSchema = new Schema<IRoomType>({
  name: { type: String, required: true },
});

const RoomType: Model<IRoomType> = mongoose.model('RoomType', roomTypeSchema);

const roomSchema = new Schema<IRoom>({
  name: { type: String, required: true },
  roomType: { type: Schema.Types.ObjectId, ref: 'RoomType', required: true },
  price: { type: Number, required: true },
});

const Room: Model<IRoom> = mongoose.model('Room', roomSchema);

export { RoomType, Room };

import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();


import { RoomType, Room } from './models';


router.post('/api/v1/room-types', async (req: Request, res: Response) => {
  try {
    const roomType = await RoomType.create(req.body);
    res.status(201).json(roomType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get('/api/v1/room-types', async (req: Request, res: Response) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json(roomTypes);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



export default router;