import { IUser, UserModel } from "../models/userModel.js";

class AuthService {
  async getAll() {
    try {
      const allUsers: IUser[] = await UserModel.find()
        .populate('roles')
        .select('-password');

      console.log(allUsers)

      return allUsers;
    } catch (err) {
      console.log(err)
    }
  }
  async getOne(userId: string) {
    try {
      const user: IUser = await UserModel.findById(userId)
        .populate('roles')
        .select('-password');
      return user;
    } catch (err) {
      console.log(err)
    }
  }
  async register() { }
  async login() { }
}

export default new AuthService();