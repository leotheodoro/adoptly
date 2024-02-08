import { Router } from 'express'
import { register } from './register'
import { authenticate } from './authenticate'

const userRoutes = Router()

userRoutes.post('/users', register)
userRoutes.post('/sessions', authenticate)

export default userRoutes
