import { IDevice } from "./../models/deviceModel.js";
import { devices } from "./../data/deviceData.js";
import { Request, Response } from "express";

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