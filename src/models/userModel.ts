import Role from './roleModel.js'

export interface IUser {
  id: number
  name: string
  email: string
  password?: string
  roles: Role[]
}