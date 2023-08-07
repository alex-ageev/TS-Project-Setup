import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({ name: { type: String, required: true } });
const TypeSchema = new mongoose.Schema({ name: { type: String, required: true } });

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true, min: 0 },
  image_url: { type: String, default: 'no-image.png' },
  brand: { type: mongoose.Schema.ObjectId, required: true, ref: 'Brand' },
  type: { type: mongoose.Schema.ObjectId, required: true, ref: 'Type' },
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

export interface IBrand extends mongoose.Document { name: string; }
export interface IType extends mongoose.Document { name: string; }

export interface IDeviceMongoose extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand: string;
  type: string;
}

const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema);
const TypeModel = mongoose.model<IType>('Type', TypeSchema);
const DeviceModel = mongoose.model<IDeviceMongoose>('Device', DeviceSchema);


export { BrandModel, TypeModel, DeviceModel };