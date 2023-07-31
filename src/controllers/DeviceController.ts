import { IDevice } from "./../models/deviceModel.js";
import { devices } from "./../data/deviceData.js";
import { Request, Response } from "express";
import { v4 as generateId } from 'uuid';

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

  async create(req: Request, res: Response) {
    const { name, description, price, brand, type } = req.body;
    try {
      const newDevice: IDevice = {
        id: generateId(),
        name,
        description,
        price: parseFloat(price),
        image_url: 'no-image.jpg',
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