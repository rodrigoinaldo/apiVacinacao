// types/custom.d.ts
import { Request } from 'express';
import Idoso from '../database/model/createUser';

declare global {
  namespace Express {
    export interface  Request{
      userId: Idoso,
      idAgente: Int 
    }
  }
}
