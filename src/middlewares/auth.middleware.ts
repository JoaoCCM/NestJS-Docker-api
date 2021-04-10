import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { IAuthMiddleware } from './IAuthMiddleware';

export function auth(
  req: IAuthMiddleware,
  res: Response,
  next: NextFunction,
) {
  const header_token = req.headers['authorization'];

  const access_token = header_token && header_token.split(' ')[1];
  if (access_token === null) res.status(401).send();

  verify(access_token, process.env.JWT_SECRET, (err, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Access Denied.' });
    }

    req.user = user;
    next();
  });
}
