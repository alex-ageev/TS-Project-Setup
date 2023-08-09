import { Request, Response } from "express";
import AuthService from "../services/AuthService.js";
import { IRole, RoleModel } from "../models/userModel.js";
import Role from "../models/roleModel.js";

class AuthController {
  async getAll(req: Request, res: Response) {
    try {
      const allUsers = await AuthService.getAll();

      res.json(allUsers);
    } catch (err) {
      console.log(err)
    }
  }
  async register(req: Request, res: Response) {
    try {
      const { name, email, password, roles } = req.body;
      const newUser = await AuthService.register(name, email, password, roles);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ errorMessage: 'Registration failed', error: err });
    }
  }

  async login(req: Request, res: Response) { }

  async createRole(req: Request, res: Response) {
    try {
      const { roleName } = req.body;
      const createdRole: IRole = await RoleModel.create({ name: roleName })
      return res.status(201).json(createdRole);
    } catch (err) {
      console.log(err)
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const roleID = req.params.id;

      const deletedRole: IRole | null =
        await RoleModel.findByIdAndDelete(roleID);

      if (!deletedRole) {
        res.status(404).json({ error: 'Role not found' });
      }

      res.json(deletedRole);
    } catch (err) {
      console.log(err);
      res.status(500)
        .send({ errorMessage: 'Failed to delete role', error: err });
    }
  }
}

export default new AuthController();