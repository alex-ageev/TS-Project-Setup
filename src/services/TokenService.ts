import jwt, { Secret } from "jsonwebtoken";
import { IUser } from './../models/userModel.js'
import Role from './../models/roleModel.js'

export interface ITokenPayload {
  id: string,
  email: string,
  roles: Role[]
}

class TokenService {
  private readonly secretKey: Secret = 'SECRET_ACCESS_TOKEN_WORD'
  generateAccessToken(user: IUser): { accessToken: string } {
    const payload = {
      id: user.id,
      email: user.email,
      roles: user.roles
    }
    const accessToken = jwt.sign(payload, this.secretKey, {
      expiresIn: "15d"
    })
    return { accessToken: accessToken }
  }
  validateAccessToken(token: string): ITokenPayload | null {
    try {
      const userPayload = jwt.verify(token, this.secretKey) as ITokenPayload;
      return userPayload;
    } catch (err) {
      console.log(err)
      return null
    }
  }
}

export default new TokenService;