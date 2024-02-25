import { env } from '@/env'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function validateJWT(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const token = request.headers.authorization?.split(' ')[1]

  const privateKey = env.JWT_SECRET

  if (!token) {
    return response.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, privateKey, (error, decoded) => {
    if (error) {
      return response.status(401).json({ message: 'Unauthorized' })
    }

    if (decoded?.sub) {
      request.userId = decoded.sub.toString()
    }

    next()
  })
}
