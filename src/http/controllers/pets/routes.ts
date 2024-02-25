import { Router } from 'express'
import { create } from './create'
import { validateJWT } from '@/http/middlewares/validate-jwt'

const petRoutes = Router()

petRoutes.post('/pets', validateJWT, create)

export default petRoutes
