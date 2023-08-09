import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    uppercase: true,
    trim: true
  }
})

export interface IRole extends mongoose.Document {
  name: string
}

export interface IUser extends mongoose.Document {
  name: string,
  email: string,
  password: string,
  roles: string[]
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    set: function (this: IUser, plainPassword: string): string {
      // Hash password before storing it
      return bcrypt.hashSync(plainPassword, 7)
    },
    get: function (this: IUser, hashedPassword: string): string {
      // Return hashed password when accessed
      return hashedPassword;
    },
  },
  roles: { type: mongoose.Schema.ObjectId, required: true, ref: 'Role' },
});

const RoleModel = mongoose.model<IRole>("Role", RoleSchema);
const UserModel = mongoose.model<IUser>("User", UserSchema);

export { RoleModel, UserModel };