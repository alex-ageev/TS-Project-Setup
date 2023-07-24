import { Response, Request, NextFunction } from "express";
import TokenService from "../services/TokenService.js";
export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers.authorization)
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: "Unauthorized"});
  }
  const token = authToken.split(' ')[1]; // Extract the token from Bearer

  const decodedPayload = TokenService.validateAccessToken(token);

  if (!decodedPayload) {
    return res.status(401).json({ error: "Invalid Bearer token"});
  }

  next();
}