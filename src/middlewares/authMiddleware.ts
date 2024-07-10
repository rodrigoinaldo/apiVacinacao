import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import auth from '../config/auth';
import Idoso from '../database/model/createUser';

type JwtPayload = {
  id: string;
  iat: number;
  exp: number;
};

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401)//.send("cheguei");
    return;
  }

  

  try {
    const token = authorization.split(' ')[1];
   
    const { id } = jwt.verify(token, auth.jwt.secret) as JwtPayload


    const userE = await Idoso.findOne({ where: { id } });

    if (!userE) {
      res.sendStatus(401);
      return;
    }


    req.userId = id;  

    next();
  } catch (error) {
    console.error('Token verification failed:', error); // Log para depuração
    res.sendStatus(401);
  }
};
