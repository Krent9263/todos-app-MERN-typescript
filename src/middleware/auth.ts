import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    isAdmin: boolean;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try{
    const header = req.headers['authorization'];
    if(!header || !header.startsWith('Bearer ')){
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = header.slice('Bearer '.length);
    const secret = process.env.JWT_SECRET as string;

     if (!secret) return res.status(500).json({ message: "JWT secret missing" });
    const payload = jwt.verify(token, secret) as { userId: string; isAdmin?: boolean };
    req.user = { userId: payload.userId, isAdmin: payload.isAdmin ?? false };
    next();
  }catch(error){
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try{
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
  }catch(error){
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
}

export default { authenticateToken, authorizeAdmin };