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
  async register(name: string, email: string,
    password: string, roles: string[]) {
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new Error(`User ${name} already exists`);
    }

    const newUser: IUser = new UserModel({
      name,
      email,
      password,
      roles
    });

    const savedUser = await newUser.save();

    return savedUser;
  }
  async login() { }
}

export default new AuthService();