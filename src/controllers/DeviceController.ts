import {
  BrandModel,
  DeviceModel,
  IBrand,
  IDeviceMongoose,
  IType,
  TypeModel
} from "./../models/deviceModel.js";
import { devices } from "./../data/deviceData.js";
import { Request, Response } from "express";
import { v4 as generateId } from 'uuid';
import FileService from "../services/FileService.js";
import { IUser } from "../models/userModel.js";
import AuthService from "../services/AuthService.js";

class DeviceController {
  async getAll(req: Request, res: Response) {
    // query -> http://localhost:5555/devices/?type=Laptop&brand=HP

    if (!AuthService.isAdmin(req.user as IUser)) {
      return res.status(401).json({ error: "Not authorized" });
    }

    try {
      const { typeId, brandId } = req.query;

      let filter: any = {};

      if (typeId && typeId !== 'all') {
        filter.typeId = typeId;
      }

      if (brandId && brandId !== 'all') {
        filter.brandId = brandId;
      }

      console.log(filter);

      /* {type: 'Smartphone', brand: 'Samsung'} */

      const filteredDevices = await DeviceModel.find(filter)
      .populate('brandId', 'name')
      .populate('typeId', 'name').select('-updatedAt').select('-createdAt');

      return res.status(200).json(filteredDevices)
    } catch (err) {
      res.status(500).send(err)
    }
  }
  async update(req: Request, res: Response) {
    try {
      const deviceId = req.params.id;

      const { name, description, price, brandId, typeId } = req.body;

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

        if (brandId) {
          existingDevice.brandId = brandId;
        }
        if (typeId) {
          existingDevice.typeId = typeId;
        }

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

      const foundDevice = await DeviceModel.findById(deviceId).populate('brandId', 'name')
      .populate('typeId', 'name').select('-updatedAt').select('-createdAt');

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
    const { name, description, price, brandId, typeId } = req.body;
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
        brandId,
        typeId
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

      if (!AuthService.isAdmin(req.user as IUser)) {
        return res.status(401).json({ error: "Not authorized" });
      }

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
      const brands: IBrand[] = await BrandModel.find();
      res.json(brands);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Failed to get brands', error: err });
    }
  }
  async getTypes(req: Request, res: Response) {
    try {
      const types: IType[] = await TypeModel.find();
      res.json(types);
    } catch (err) {
      res.status(500).send({ errorMessage: 'Failed to get types', error: err });
    }
  }

  async createType(req: Request, res: Response) {
    const { name } = req.body;
    const newType = new TypeModel({ name });

    const savedType = await newType.save();

    return res.status(201).json(savedType)
  }

  async createBrand(req: Request, res: Response) {
    const { name } = req.body;
    const newBrand = new BrandModel({ name });

    const savedBrand = await newBrand.save();

    return res.status(201).json(savedBrand)
  }

  async deleteBrand(req: Request, res: Response) {
    try {
      const brandId = req.params.id;
      const deletedBrand = await BrandModel.findByIdAndDelete(brandId);
      if (!deletedBrand) {
        res.status(404).json({ error: 'Brand not found' });
      }
      res.json(deletedBrand);
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete brand', error: err });
    }
  }

  async deleteType(req: Request, res: Response) {
    try {
      const typeId = req.params.id;
      const deletedType = await TypeModel.findByIdAndDelete(typeId);
      if (!deletedType) {
        res.status(404).json({ error: 'Type not found' });
      }
      res.json(deletedType);
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete type', error: err });
    }
  }
}

export default new DeviceController;