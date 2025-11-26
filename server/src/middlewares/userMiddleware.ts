import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';


export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const Header = req.headers["authorization"];
      if (!Header) {
        res.status(401).json({ message: "Authorization header missing" });
        return;
      }
  
      const token = Header;
      //@ts-ignore
      const decoded = jwt.verify(token, JWT_SECRET);
  
      // @ts-ignore
      req.userId = decoded.id;
  
      next();
    } catch (error) {
      console.error("Authentication error:", error);
  
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: "Token expired" });
        return;
      }
  
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
  
      res.status(500).json({ message: "Authentication failed" });
    }
  };
