import { IDevice } from "./../models/deviceModel.js";
import { devices } from "./../data/deviceData.js";
import { Request, Response } from "express";
import { v4 as generateId } from 'uuid';
import FileService from "../services/FileService.js";

class DeviceController {
  getAll(req: Request, res: Response) {
    // query -> http://localhost:5555/devices/?type=Laptop&brand=HP

    const { type, brand } = req.query;

    let filteredDevices = devices;

    if (type && type !== 'all') {
      filteredDevices = filteredDevices.filter((device) => device.type === type)
    }

    if (brand && brand !== 'all') {
      filteredDevices = filteredDevices.filter((device) => device.brand === brand)
    }

    console.log(type, brand)

    return res.status(200).json(filteredDevices)
  }
  getOne(req: Request, res: Response) {
    try {
      const deviceId = req.params.id;

      const foundDevice = devices.find((device) => device.id === deviceId);

      if (!foundDevice) {
        res.status(404).send({ errorMessage: 'Device not found' })
      }
      //                    http  ://  localhost:5555 /  f640d7f4-8be4-4cb1-b3dc-a9bf273f097c.jpeg
      const fullImageUrl = `${req.protocol}://${req.get('host')}/${foundDevice?.image_url}`;

      console.log(fullImageUrl);
      const deviceWithFullImageUrl = {
        ...foundDevice,
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

    console.log(image);

    try {
      const newDevice: IDevice = {
        id: generateId(),
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
        brand,
        type
      }
      devices.push(newDevice);
      res.status(201).json(newDevice);
    } catch (err) {
      console.error(err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deviceID = req.params.id;
      const deviceIndex = devices.findIndex((device) => device.id === deviceID);

      if (deviceIndex === -1) {
        res.status(404).json({ error: 'Device not found' });
      }

      const deletedDevice = devices.splice(deviceIndex, 1)[0];

      res.json(deletedDevice);
    } catch (err) {
      console.log(err);
      res.status(500).send({ errorMessage: 'Failed to delete device', error: err });
    }
  }

  getBrands(req: Request, res: Response) {
    const brands = devices.map((device) => device.brand);
    const uniqueBrands = [...new Set(brands)];
    res.json(uniqueBrands);
  }

  getTypes(req: Request, res: Response) {
    const types = devices.map((device) => device.type);
    const uniqueTypes = [...new Set(types)];
    res.json(uniqueTypes);
  }
}

export default new DeviceController;