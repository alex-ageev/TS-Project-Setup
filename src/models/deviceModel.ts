import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true, min: 0 },
  image_url: { type: String, default: 'no-image.png' },
  brand: { type: String, required: true },
  type: { type: String, required: true },
}, { timestamps: true });

export interface IDevice {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand: string;
  type: string;
}

export interface IDeviceMongoose extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand: string;
  type: string;
}

export default mongoose.model<IDeviceMongoose>('Device', DeviceSchema);