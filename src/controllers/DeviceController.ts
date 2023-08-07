import DeviceModel, { IDevice, IDeviceMongoose } from "./../models/deviceModel.js";
import { devices } from "./../data/deviceData.js";
import { Request, Response } from "express";
import { v4 as generateId } from 'uuid';
import FileService from "../services/FileService.js";

class DeviceController {
  async getAll(req: Request, res: Response) {
    // query -> http://localhost:5555/devices/?type=Laptop&brand=HP
    try {
      const { type, brand } = req.query;

      let filter: any = {};

      if (type && type !== 'all') {
        filter.type = type;
      }

      if (brand && brand !== 'all') {
        filter.brand = brand;
      }

      console.log(filter);

      /* {type: 'Smartphone', brand: 'Samsung'} */

      const filteredDevices = await DeviceModel.find(filter);

      return res.status(200).json(filteredDevices)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  async update(req: Request, res: Response) {
    try {
      const deviceId = req.params.id;

      const { name, description, price, brand, type } = req.body;

      const image = req.files?.image;

      let imageUrl = 'no-image.jpg';

      let existingDevice: IDeviceMongoose | null = await DeviceModel.findById(deviceId);

      if (!existingDevice) {
        res.status(404).json({ message: "Device not found" });
      }

      if (existingDevice) {
        if (existingDevice.image_url && existingDevice.image_url !== 'no-image.jpg') {
          await FileService.delete(existingDevice.image_url);
        }

        if (image) {
          imageUrl = await FileService.save(image);
        }
        existingDevice.name = name || existingDevice.name;
        existingDevice.description = description || existingDevice.description;
        existingDevice.price = price || existingDevice.price;
        existingDevice.image_url = imageUrl || existingDevice.image_url;
        existingDevice.brand = brand || existingDevice.brand;
        existingDevice.type = type || existingDevice.type;
        const updatedDevice = await existingDevice.save();
        res.json(updatedDevice);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const deviceId = req.params.id;

      const foundDevice: IDeviceMongoose | null = await DeviceModel.findById(deviceId);

      if (!foundDevice) {
        res.status(404).send({ errorMessage: 'Device not found' })
      }

      const fullImageUrl = `${req.protocol}://${req.get('host')}/${foundDevice?.image_url}`;

      const deviceWithFullImageUrl = {
        ...foundDevice?.toJSON(),
        image_url: fullImageUrl,
      }

      res.json(deviceWithFullImageUrl)
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMessage: 'Something happened', error: err })
    }
  }
  async create(req: Request, res: Response) {
    const { name, description, price, brand, type } = req.body;
    const image = req.files?.image;

    let imageUrl = 'no-image.jpg';

    if (image) {
      imageUrl = await FileService.save(image);
    }

    try {
      const newDevice: IDeviceMongoose = new DeviceModel({
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        brand,
        type
      });

      const savedDevice = await newDevice.save();

      res.status(201).json(savedDevice);
    } catch (err) {
      console.error(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deviceID = req.params.id;

      const deletedDevice: IDeviceMongoose | null = await DeviceModel.findByIdAndDelete(deviceID);

      if (!deletedDevice) {
        res.status(404).json({ error: 'Device not found' });
      }

      res.json(deletedDevice);
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMessage: 'Failed to delete device', error: err });
    }
  }

  async getBrands(req: Request, res: Response) {
    try {
      const uniqueBrands: string[] = await DeviceModel.distinct('brands');
      console.log(uniqueBrands);
      res.json(uniqueBrands);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Failed to get brands', error: err });
    }
  }

  async getTypes(req: Request, res: Response) {
    try {
      const uniqueTypes: string[] = await DeviceModel.distinct('types');
      res.json(uniqueTypes);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Failed to get types', error: err });
    }
  }
}

export default new DeviceController;